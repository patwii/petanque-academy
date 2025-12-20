#!/usr/bin/env python3
"""
Batch translation using deep-translator with smart chunking
"""

from pathlib import Path
import re
import time
from deep_translator import GoogleTranslator

FILES = [
    'education/goals/smart-goals.md',
    'education/goals/planning.md',
    'education/team-player/index.md',
    'education/team-player/communication.md',
    'education/tactics/probability.md',
    'education/training/index.md',
    'education/training/drills.md',
    'education/mindfulness/techniques.md',
    'education/mindfulness/daily-practice.md',
    'education/mental-strength/handling-pressure.md',
    'education/mental-strength/pre-shot-routine.md',
    'education/nutrition/index.md',
    'ambition.md',
    'food.md',
    'news/index.md',
    'workshop.md',
    'technical/index.md',
    'technical/throws.md',
    'education/the-zone/entering-the-zone.md',  # Largest file last
]

LANGUAGES = {
    'fr': 'fr',
    'it': 'it',
    'nl': 'nl',
    'no': 'no',
    'pt': 'pt',
    'sv': 'sv'
}

def translate_preserving_markdown(content, lang_code):
    """Translate content while trying to preserve markdown structure"""
    translator = GoogleTranslator(source='en', target=lang_code)
    
    lines = content.split('\n')
    translated_lines = []
    in_code_block = False
    
    for line in lines:
        stripped = line.strip()
        
        # Track code blocks
        if stripped.startswith('```'):
            translated_lines.append(line)
            if stripped == '```':
                in_code_block = not in_code_block
            continue
        
        # Don't translate code blocks
        if in_code_block:
            translated_lines.append(line)
            continue
        
        # Don't translate empty lines
        if not stripped:
            translated_lines.append(line)
            continue
        
        # Don't translate mermaid syntax
        if stripped.startswith('style ') or stripped.startswith('graph ') or stripped.startswith('sequenceDiagram'):
            translated_lines.append(line)
            continue
        
        # Don't translate table separators
        if re.match(r'^\|[\s\-:]+\|', stripped):
            translated_lines.append(line)
            continue
        
        # Don't translate frontmatter
        if stripped == '---':
            translated_lines.append(line)
            continue
        
        # Translate the line
        try:
            # For very short lines or special syntax, skip
            if len(stripped) < 3:
                translated_lines.append(line)
                continue
            
            translated = translator.translate(stripped)
            # Preserve original indentation
            indent = len(line) - len(line.lstrip())
            translated_lines.append(' ' * indent + translated)
        except Exception as e:
            # If translation fails, keep original
            translated_lines.append(line)
    
    return '\n'.join(translated_lines)

def translate_file(source_path, target_path, lang_code):
    """Translate a file"""
    with open(source_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    translated = translate_preserving_markdown(content, lang_code)
    
    target_path.parent.mkdir(parents=True, exist_ok=True)
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(translated)

def main():
    docs_dir = Path('docs')
    total = len(FILES) * len(LANGUAGES)
    completed = 0
    
    print(f"\n🌍 Translating {len(FILES)} files to {len(LANGUAGES)} languages ({total} total)\n", flush=True)
    print("Note: da, de, es already completed manually\n", flush=True)
    
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
                translate_file(source_file, target_file, lang_code)
                completed += 1
                print(" ✓", flush=True)
                time.sleep(0.5)  # Rate limiting
            except Exception as e:
                print(f" ✗ {e}", flush=True)
    
    print(f"\n✅ Complete: {completed}/{total}\n", flush=True)

if __name__ == '__main__':
    main()

