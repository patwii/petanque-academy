#!/usr/bin/env python3
"""
Fast bulk translation using googletrans (free Google Translate API)
"""

import os
import sys
from pathlib import Path
import time

# Install googletrans if needed
try:
    from googletrans import Translator
except ImportError:
    print("Installing googletrans...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "googletrans==4.0.0-rc1", "-q"])
    from googletrans import Translator

FILES = [
    'education/the-zone/entering-the-zone.md',
    'education/mindfulness/techniques.md',
    'education/mindfulness/daily-practice.md',
    'education/mental-strength/handling-pressure.md',
    'education/mental-strength/pre-shot-routine.md',
    'education/nutrition/index.md',
    'education/goals/smart-goals.md',
    'education/goals/planning.md',
    'education/team-player/index.md',
    'education/team-player/communication.md',
    'education/tactics/probability.md',
    'education/training/index.md',
    'education/training/drills.md',
    'ambition.md',
    'food.md',
    'news/index.md',
    'workshop.md',
    'technical/index.md',
    'technical/throws.md'
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

def should_translate(line):
    """Check if a line should be translated"""
    stripped = line.strip()
    
    # Don't translate empty lines
    if not stripped:
        return False
    
    # Don't translate code blocks
    if stripped.startswith('```'):
        return False
    
    # Don't translate mermaid syntax lines
    if stripped.startswith('graph ') or stripped.startswith('sequenceDiagram'):
        return False
    
    if stripped.startswith('style '):
        return False
    
    # Don't translate frontmatter
    if stripped == '---':
        return False
    
    # Don't translate table separators
    if stripped.startswith('|---') or stripped == '|':
        return False
    
    return True

def extract_translatable_text(line):
    """Extract text that needs translation from a line, preserving structure"""
    stripped = line.strip()
    
    # Headers
    if stripped.startswith('#'):
        level = len(stripped) - len(stripped.lstrip('#'))
        text = stripped[level:].strip()
        return ('header', level, text)
    
    # List items
    if stripped.startswith('- ') or stripped.startswith('* '):
        bullet = '- ' if stripped.startswith('- ') else '* '
        text = stripped[2:]
        if text.startswith('[ ] ') or text.startswith('[x] '):
            checkbox = text[:4]
            return ('list_checkbox', bullet, checkbox, text[4:])
        return ('list', bullet, text)
    
    # Blockquotes
    if stripped.startswith('>'):
        return ('quote', stripped[1:].strip())
    
    # Container titles
    if stripped.startswith(':::'):
        parts = stripped.split(' ', 1)
        if len(parts) == 2:
            return ('container', parts[0], parts[1])
        return None
    
    # Tables
    if '|' in line:
        parts = [p.strip() for p in line.split('|')]
        return ('table', parts)
    
    # Regular text
    return ('text', stripped)

def reconstruct_line(line_type, translated_text, *args):
    """Reconstruct a line with translated text"""
    if line_type == 'header':
        level = args[0]
        return '#' * level + ' ' + translated_text + '\n'
    
    elif line_type == 'list':
        bullet = args[0]
        return bullet + translated_text + '\n'
    
    elif line_type == 'list_checkbox':
        bullet, checkbox = args[0], args[1]
        return bullet + checkbox + translated_text + '\n'
    
    elif line_type == 'quote':
        return '> ' + translated_text + '\n'
    
    elif line_type == 'container':
        container_type = args[0]
        return container_type + ' ' + translated_text + '\n'
    
    elif line_type == 'table':
        parts = translated_text if isinstance(translated_text, list) else [translated_text]
        return '| ' + ' | '.join(parts) + ' |\n'
    
    else:  # text
        return translated_text + '\n'

def translate_file_simple(source_path, target_path, lang_code, translator):
    """Simple translation - translate entire file as chunks"""
    print(f"    {lang_code}...", end='', flush=True)
    
    with open(source_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    try:
        # Translate the entire content
        # Note: This is a simple approach - it will translate everything including some syntax
        # but it's much faster than line-by-line
        result = translator.translate(content, dest=lang_code, src='en')
        translated_content = result.text
        
        # Write result
        target_path.parent.mkdir(parents=True, exist_ok=True)
        with open(target_path, 'w', encoding='utf-8') as f:
            f.write(translated_content)
        
        print(" ✓", flush=True)
        return True
    except Exception as e:
        print(f" ✗ ({e})", flush=True)
        return False

def main():
    translator = Translator()
    docs_dir = Path('docs')
    total = len(FILES) * len(LANGUAGES)
    completed = 0
    
    print(f"\n🌍 Fast bulk translation: {len(FILES)} files × {len(LANGUAGES)} languages = {total} translations\n", flush=True)
    
    for idx, file_path in enumerate(FILES, 1):
        print(f"[{idx}/{len(FILES)}] {file_path}", flush=True)
        source_file = docs_dir / 'en' / file_path
        
        if not source_file.exists():
            print(f"  ⚠️  Not found", flush=True)
            continue
        
        for lang_code in LANGUAGES.keys():
            target_file = docs_dir / lang_code / file_path
            if translate_file_simple(source_file, target_file, lang_code, translator):
                completed += 1
            time.sleep(0.1)  # Small delay to avoid rate limiting
    
    print(f"\n✅ Complete: {completed}/{total} files translated\n", flush=True)

if __name__ == '__main__':
    main()

