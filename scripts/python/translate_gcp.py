#!/usr/bin/env python3
"""
Translation using Google Cloud Translation API with authentication and caching
"""

from pathlib import Path
import re
import time
import os
import sys
import json
import hashlib

# Set up GCP credentials
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'private_keys/credentials.json'

# Install google-cloud-translate if needed
try:
    from google.cloud import translate_v2 as translate
except ImportError:
    print("Installing google-cloud-translate...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "google-cloud-translate", "-q"])
    from google.cloud import translate_v2 as translate

# Translation cache file
CACHE_FILE = Path('scripts/python/.translation_cache.json')

# Global cache
_translation_cache = {}
_cache_hits = 0
_cache_misses = 0

def load_cache():
    """Load translation cache from disk"""
    global _translation_cache
    if CACHE_FILE.exists():
        try:
            with open(CACHE_FILE, 'r', encoding='utf-8') as f:
                _translation_cache = json.load(f)
            print(f"📦 Loaded {len(_translation_cache)} cached translations", flush=True)
        except Exception as e:
            print(f"⚠️  Could not load cache: {e}", flush=True)
            _translation_cache = {}
    else:
        _translation_cache = {}

def save_cache():
    """Save translation cache to disk"""
    global _translation_cache
    try:
        CACHE_FILE.parent.mkdir(parents=True, exist_ok=True)
        with open(CACHE_FILE, 'w', encoding='utf-8') as f:
            json.dump(_translation_cache, f, ensure_ascii=False, indent=2)
        print(f"💾 Saved {len(_translation_cache)} translations to cache", flush=True)
    except Exception as e:
        print(f"⚠️  Could not save cache: {e}", flush=True)

def get_cache_key(text, target_language):
    """Generate a cache key for a translation"""
    # Use hash to handle long texts and special characters
    text_hash = hashlib.md5(text.encode('utf-8')).hexdigest()[:16]
    return f"{target_language}:{text_hash}:{text[:50]}"  # Include prefix for debugging

FILES = [
    # Main pages
    'index.md',
    'about.md',
    'ambition.md',
    'assessment/index.md',

    # Articles section
    'articles/index.md',
    'articles/competition-prep.md',
    'articles/elite-goal-setting.md',
    'articles/flow-state-science.md',
    'articles/inner-critic.md',
    'articles/mental-resilience.md',
    'articles/mental-training-mistakes.md',
    'articles/mental-vs-technical.md',
    'articles/mindfulness-competition.md',
    'articles/nutrition-competition.md',
    'articles/practice-structure.md',
    'articles/pre-shot-routines.md',
    'articles/pressure-management.md',
    'articles/self-awareness-development.md',
    'articles/sleep-performance.md',
    'articles/team-chemistry.md',
    'articles/team-communication.md',
    'articles/team-leadership.md',
    'articles/tension-precision.md',

    # Education main
    'education/index.md',

    # Mental Game section
    'education/mental-game/index.md',
    'education/mental-game/mental-strength/index.md',
    'education/mental-game/mental-strength/handling-pressure.md',
    'education/mental-game/mental-strength/pre-shot-routine.md',
    'education/mental-game/mindfulness/index.md',
    'education/mental-game/mindfulness/techniques.md',
    'education/mental-game/mindfulness/daily-practice.md',
    'education/mental-game/the-zone/index.md',
    'education/mental-game/the-zone/entering-the-zone.md',
    'education/mental-game/the-zone/technical-vs-flow.md',

    # Motivation section
    'education/motivation/index.md',
    'education/motivation/maintaining.md',
    'education/motivation/motivation.md',
    'education/motivation/planning.md',
    'education/motivation/smart-goals.md',

    # Sleep section
    'education/sleep/index.md',
    'education/sleep/competition.md',
    'education/sleep/habits.md',

    # Self-Awareness section
    'education/self-awareness/index.md',
    'education/self-awareness/feedback.md',
    'education/self-awareness/video.md',

    # Nutrition section
    'education/nutrition/index.md',

    # Team Dynamics section
    'education/team-dynamics/index.md',
    'education/team-dynamics/communication.md',

    # Tension section
    'education/tension/index.md',
    'education/tension/competition.md',
    'education/tension/techniques.md',

    # Technique section
    'education/technique/index.md',
    'education/technique/throws.md',
    'education/technique/tactics/index.md',
    'education/technique/tactics/probability.md',
    'education/technique/training/index.md',
    'education/technique/training/drills.md',

    # Guides section
    'guides/index.md',
    'guides/mental-journey/index.md',
    'guides/mental-journey/materials.md',
    'guides/mental-journey/session-guide.md',
    'guides/workshop/index.md',
    'guides/training-camp/index.md',
    'guides/training-session/index.md',

    # Templates section
    'guides/templates/index.md',
    'guides/templates/diary-template.md',
    'guides/templates/goal-template.md',
    'guides/templates/nutrition-planner.md',
    'guides/templates/peer-feedback.md',
    'guides/templates/pre-competition-checklist.md',
    'guides/templates/sleep-tracker.md',
    'guides/templates/team-agreement.md',
    'guides/templates/tension-quick-card.md',
]

LANGUAGES = {
    'da': 'da',
    'de': 'de',
    'es': 'es',
    'fr': 'fr',
    'it': 'it',
    'nl': 'nl',
    'no': 'no',
    'pt': 'pt',
    'sv': 'sv'
}

def translate_text_gcp(text, target_language, translate_client):
    """Translate text using GCP Translation API with caching"""
    global _translation_cache, _cache_hits, _cache_misses

    if not text or len(text) < 2:
        return text

    # Don't translate certain terms
    no_translate = ['Pétanque Academy', 'SMART', 'OK', 'Yes', 'No']
    if text in no_translate:
        return text

    # Check cache first
    cache_key = get_cache_key(text, target_language)
    if cache_key in _translation_cache:
        _cache_hits += 1
        return _translation_cache[cache_key]

    _cache_misses += 1

    try:
        # No delay needed with authenticated API (high rate limits)
        result = translate_client.translate(text, target_language=target_language, source_language='en')
        translated = result['translatedText']

        # Store in cache
        _translation_cache[cache_key] = translated

        return translated
    except Exception as e:
        print(f"\n    Error translating '{text[:50]}...': {e}", flush=True)
        # Retry once after longer delay
        try:
            time.sleep(2)
            result = translate_client.translate(text, target_language=target_language, source_language='en')
            translated = result['translatedText']
            _translation_cache[cache_key] = translated
            return translated
        except Exception as e2:
            print(f"\n    Retry failed: {e2}", flush=True)
            return text

def extract_text_only(line):
    """Extract only the translatable text from a line, preserving all syntax"""
    stripped = line.strip()
    
    # Empty lines
    if not stripped:
        return None
    
    # Code fence markers
    if stripped.startswith('```'):
        return None
    
    # Frontmatter
    if stripped == '---':
        return None
    
    # Mermaid syntax lines
    if any(stripped.startswith(x) for x in ['graph ', 'sequenceDiagram', 'flowchart ', 'style ', 'classDef ', 'participant ', 'activate ', 'deactivate ']):
        return None
    
    # Mermaid arrows and connections
    if '-->' in stripped or '->>' in stripped or '==>' in stripped:
        # Extract text from arrows like: A-->|text|B
        match = re.search(r'\|([^|]+)\|', stripped)
        if match:
            return match.group(1)
        return None
    
    # Table separator
    if re.match(r'^\|[\s\-:]+\|', stripped):
        return None
    
    # Headers - extract text only
    if stripped.startswith('#'):
        level = len(stripped) - len(stripped.lstrip('#'))
        return stripped[level:].strip()
    
    # Lists - extract text only
    if stripped.startswith('- ') or stripped.startswith('* '):
        text = stripped[2:]
        # Handle checkboxes
        if text.startswith('[ ] ') or text.startswith('[x] '):
            return text[4:]
        return text
    
    # Numbered lists
    if re.match(r'^\d+\.\s', stripped):
        return re.sub(r'^\d+\.\s', '', stripped)
    
    # Blockquotes
    if stripped.startswith('>'):
        return stripped[1:].strip()
    
    # Container syntax - extract title only, preserve container type
    if stripped.startswith(':::'):
        # Split into: ":::" + " " + "tip" + " " + "Our Vision"
        # or just ":::" + " " + "tip"
        match = re.match(r'^(:::)\s+(\w+)(?:\s+(.+))?$', stripped)
        if match:
            prefix = match.group(1)  # ":::"
            container_type = match.group(2)  # "tip", "warning", etc.
            title = match.group(3)  # "Our Vision" or None
            if title:
                # Return tuple: ('container', '::: tip', 'Our Vision')
                return ('container', f'{prefix} {container_type}', title)
        return None

    # Tables - extract cell content
    if '|' in stripped:
        cells = [c.strip() for c in stripped.split('|') if c.strip()]
        return cells if cells else None

    # Bold/italic markers - extract text between markers
    # Don't translate the markers themselves
    if '**' in stripped or '*' in stripped or '`' in stripped:
        # Extract text but we'll need to preserve formatting
        return stripped

    # Regular text
    return stripped

def reconstruct_line(original, translated_text, line_type=None):
    """Reconstruct line with translated text but original syntax"""
    stripped = original.strip()
    indent = len(original) - len(original.lstrip())

    # If line_type is provided (from extract_text_only tuple return)
    if line_type == 'container':
        # translated_text is a tuple: (container_keyword, title)
        container_keyword, title = translated_text
        return ' ' * indent + container_keyword + ' ' + title + '\n'

    # Headers
    if stripped.startswith('#'):
        level = len(stripped) - len(stripped.lstrip('#'))
        return ' ' * indent + '#' * level + ' ' + translated_text + '\n'

    # Lists
    if stripped.startswith('- '):
        if stripped[2:].startswith('[ ] '):
            return ' ' * indent + '- [ ] ' + translated_text + '\n'
        elif stripped[2:].startswith('[x] '):
            return ' ' * indent + '- [x] ' + translated_text + '\n'
        return ' ' * indent + '- ' + translated_text + '\n'

    if stripped.startswith('* '):
        return ' ' * indent + '* ' + translated_text + '\n'

    # Numbered lists
    match = re.match(r'^(\d+\.\s)', stripped)
    if match:
        return ' ' * indent + match.group(1) + translated_text + '\n'

    # Blockquotes
    if stripped.startswith('>'):
        return ' ' * indent + '> ' + translated_text + '\n'

    # Container syntax (fallback)
    if stripped.startswith(':::'):
        container_type = stripped.split(' ', 1)[0]
        return ' ' * indent + container_type + ' ' + translated_text + '\n'

    # Tables
    if '|' in stripped and isinstance(translated_text, list):
        return ' ' * indent + '| ' + ' | '.join(translated_text) + ' |\n'

    # Regular text with formatting
    return ' ' * indent + translated_text + '\n'

def translate_file(source_path, target_path, lang_code, translate_client):
    """Translate a file preserving all markdown syntax"""

    with open(source_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    translated_lines = []
    in_code_block = False
    in_frontmatter = False
    in_mermaid_block = False
    frontmatter_count = 0

    for line_num, line in enumerate(lines):
        stripped = line.strip()

        # Track frontmatter (only at the very beginning of the file)
        if stripped == '---':
            frontmatter_count += 1
            translated_lines.append(line)
            # Only treat as frontmatter if it's the first or second --- at the start of the file
            # First --- must be on line 0 (or after empty lines)
            if frontmatter_count == 1 and line_num == 0:
                in_frontmatter = True
            elif frontmatter_count == 2 and in_frontmatter:
                in_frontmatter = False
            # Otherwise, it's just a horizontal rule separator, not frontmatter
            continue

        # Don't translate frontmatter content
        if in_frontmatter:
            translated_lines.append(line)
            continue

        # Track code blocks and mermaid blocks
        if stripped.startswith('```'):
            translated_lines.append(line)
            if stripped == '```mermaid':
                in_mermaid_block = True
                in_code_block = True
            elif stripped == '```':
                in_code_block = not in_code_block
                if not in_code_block:
                    in_mermaid_block = False
            else:
                in_code_block = True
            continue

        # Don't translate code block content (except mermaid text)
        if in_code_block and not in_mermaid_block:
            translated_lines.append(line)
            continue

        # For mermaid blocks, only translate text in labels
        if in_mermaid_block:
            # Keep mermaid syntax lines as-is
            if any(stripped.startswith(x) for x in ['graph ', 'sequenceDiagram', 'flowchart ', 'style ', 'classDef ', 'participant ', 'activate ', 'deactivate ']):
                translated_lines.append(line)
                continue

            # Translate text in node labels like A[Text] or A[Text<br/>More]
            if '[' in line and ']' in line:
                # Extract and translate text between brackets
                def translate_bracket_text(match):
                    node_id = match.group(1)
                    text = match.group(2)
                    # Translate text parts separated by <br/>
                    parts = text.split('<br/>')
                    translated_parts = [translate_text_gcp(p.strip(), lang_code, translate_client) for p in parts]
                    return f'{node_id}[{" <br/> ".join(translated_parts)}]'

                translated_line = re.sub(r'([A-Z]\d?)\[([^\]]+)\]', translate_bracket_text, line)
                translated_lines.append(translated_line)
                continue

            # Translate text in arrow labels like -->|text|
            if '|' in line and ('-->' in line or '->>' in line or '==>' in line):
                def translate_arrow_text(match):
                    text = match.group(1)
                    return f'|{translate_text_gcp(text, lang_code, translate_client)}|'

                translated_line = re.sub(r'\|([^|]+)\|', translate_arrow_text, line)
                translated_lines.append(translated_line)
                continue

            # Keep other mermaid lines as-is
            translated_lines.append(line)
            continue

        # Extract translatable text
        text = extract_text_only(line)

        # If nothing to translate, keep original
        if text is None:
            translated_lines.append(line)
            continue

        # Translate
        if isinstance(text, tuple) and text[0] == 'container':
            # Container syntax: ('container', '::: tip', 'Title')
            _, container_keyword, title = text
            translated_title = translate_text_gcp(title, lang_code, translate_client)
            translated_line = reconstruct_line(line, (container_keyword, translated_title), 'container')
        elif isinstance(text, list):  # Table cells
            translated_cells = [translate_text_gcp(cell, lang_code, translate_client) for cell in text]
            translated_line = reconstruct_line(line, translated_cells)
        else:
            translated_text = translate_text_gcp(text, lang_code, translate_client)
            translated_line = reconstruct_line(line, translated_text)

        translated_lines.append(translated_line)

    # Write result
    target_path.parent.mkdir(parents=True, exist_ok=True)
    with open(target_path, 'w', encoding='utf-8') as f:
        f.writelines(translated_lines)

def main():
    global _cache_hits, _cache_misses

    # Load translation cache
    load_cache()

    # Initialize GCP Translation client
    print("Initializing Google Cloud Translation API...", flush=True)
    translate_client = translate.Client()

    docs_dir = Path('docs')
    total = len(FILES) * len(LANGUAGES)
    completed = 0

    print(f"\n🌍 GCP Translation: {len(FILES)} files × {len(LANGUAGES)} languages = {total} translations\n", flush=True)

    try:
        for idx, file_path in enumerate(FILES, 1):
            print(f"[{idx}/{len(FILES)}] {file_path}", flush=True)
            source_file = docs_dir / 'en' / file_path

            if not source_file.exists():
                print(f"  ⚠️  Not found", flush=True)
                continue

            for lang_code in LANGUAGES.keys():
                target_file = docs_dir / lang_code / file_path
                print(f"  {lang_code}...", end='', flush=True)

                try:
                    translate_file(source_file, target_file, lang_code, translate_client)
                    completed += 1
                    print(" ✓", flush=True)
                except Exception as e:
                    print(f" ✗ {e}", flush=True)
    finally:
        # Always save cache, even if interrupted
        save_cache()

        # Print cache statistics
        total_lookups = _cache_hits + _cache_misses
        if total_lookups > 0:
            hit_rate = (_cache_hits / total_lookups) * 100
            print(f"\n📊 Cache stats: {_cache_hits} hits, {_cache_misses} misses ({hit_rate:.1f}% hit rate)", flush=True)

    print(f"\n✅ Complete: {completed}/{total}\n", flush=True)

if __name__ == '__main__':
    main()

