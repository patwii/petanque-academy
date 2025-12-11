#!/usr/bin/env python3
"""
Translation using Google Cloud Translation API with authentication
"""

from pathlib import Path
import re
import time
import os
import sys

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

FILES = [
    # Main pages
    'ambition.md',
    'food.md',
    'news/index.md',
    'workshop.md',
    'technical/index.md',
    'technical/throws.md',
    # Education main
    'education/index.md',
    # Goals section
    'education/goals/index.md',
    'education/goals/smart-goals.md',
    'education/goals/planning.md',
    # Team player section
    'education/team-player/index.md',
    'education/team-player/communication.md',
    # Tactics section
    'education/tactics/index.md',
    'education/tactics/probability.md',
    # Training section
    'education/training/index.md',
    'education/training/drills.md',
    # Mindfulness section
    'education/mindfulness/index.md',
    'education/mindfulness/techniques.md',
    'education/mindfulness/daily-practice.md',
    # Mental strength section
    'education/mental-strength/index.md',
    'education/mental-strength/handling-pressure.md',
    'education/mental-strength/pre-shot-routine.md',
    # Nutrition section
    'education/nutrition/index.md',
    # The Zone section
    'education/the-zone/index.md',
    'education/the-zone/entering-the-zone.md',
    'education/the-zone/technical-vs-flow.md',
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
    """Translate text using GCP Translation API"""
    if not text or len(text) < 2:
        return text
    
    # Don't translate certain terms
    no_translate = ['Pétanque Academy', 'SMART', 'OK', 'Yes', 'No']
    if text in no_translate:
        return text
    
    try:
        result = translate_client.translate(text, target_language=target_language, source_language='en')
        return result['translatedText']
    except Exception as e:
        print(f"\n    Error: {e}", flush=True)
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

    for line in lines:
        stripped = line.strip()

        # Track frontmatter
        if stripped == '---':
            frontmatter_count += 1
            translated_lines.append(line)
            if frontmatter_count <= 2:
                in_frontmatter = not in_frontmatter
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
    # Initialize GCP Translation client
    print("Initializing Google Cloud Translation API...", flush=True)
    translate_client = translate.Client()

    docs_dir = Path('docs')
    total = len(FILES) * len(LANGUAGES)
    completed = 0

    print(f"\n🌍 GCP Translation: {len(FILES)} files × {len(LANGUAGES)} languages = {total} translations\n", flush=True)

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

    print(f"\n✅ Complete: {completed}/{total}\n", flush=True)

if __name__ == '__main__':
    main()

