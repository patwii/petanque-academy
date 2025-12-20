#!/usr/bin/env python3
"""
Bulk translation script for Pétanque Academy documentation.
Uses deep-translator library for machine translation.
"""

import os
import sys
from pathlib import Path
import re

# Import translation library
from deep_translator import GoogleTranslator
print("✓ deep-translator library loaded", flush=True)

# Files to translate
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

# Language mappings (code -> Google Translate code)
LANGUAGES = {
    'da': 'da',      # Danish
    'de': 'de',      # German
    'es': 'es',      # Spanish
    'fr': 'fr',      # French
    'it': 'it',      # Italian
    'nl': 'nl',      # Dutch
    'no': 'no',      # Norwegian
    'pt': 'pt',      # Portuguese
    'sv': 'sv'       # Swedish
}

def is_mermaid_block(line):
    """Check if line is part of mermaid diagram"""
    return line.strip().startswith('```mermaid') or line.strip() == '```'

def is_code_or_special(line):
    """Check if line should not be translated"""
    stripped = line.strip()
    # Don't translate: mermaid syntax, style commands, empty lines, markdown syntax only
    if not stripped:
        return True
    if stripped.startswith('```'):
        return True
    if stripped.startswith('style '):
        return True
    if re.match(r'^[A-Z]\[.*\]$', stripped):  # Mermaid node definitions like A[Text]
        return False  # We want to translate the text inside
    if stripped.startswith('graph ') or stripped.startswith('sequenceDiagram'):
        return True
    if re.match(r'^[A-Z] -->|->|->>|---', stripped):  # Mermaid arrows
        return False  # We want to translate labels
    return False

def translate_mermaid_node(text, translator):
    """Translate text inside mermaid nodes like A[Text] or A[Text<br/>More]"""
    # Match patterns like A[Text] or A[Text<br/>More text]
    pattern = r'([A-Z])\[(.*?)\]'
    
    def replace_node(match):
        node_id = match.group(1)
        node_text = match.group(2)
        
        # Split by <br/> and translate each part
        parts = node_text.split('<br/>')
        translated_parts = []
        for part in parts:
            if part.strip():
                try:
                    translated = translator.translate(part.strip())
                    translated_parts.append(translated)
                except:
                    translated_parts.append(part.strip())
            else:
                translated_parts.append(part)
        
        translated_text = '<br/>'.join(translated_parts)
        return f'{node_id}[{translated_text}]'
    
    return re.sub(pattern, replace_node, text)

def translate_line(line, translator, in_mermaid=False):
    """Translate a single line while preserving markdown and mermaid syntax"""
    stripped = line.strip()
    
    # Preserve empty lines
    if not stripped:
        return line
    
    # Preserve code blocks
    if stripped.startswith('```'):
        return line
    
    # Handle mermaid content
    if in_mermaid:
        # Don't translate pure syntax lines
        if stripped.startswith('graph ') or stripped.startswith('sequenceDiagram'):
            return line
        if stripped.startswith('style '):
            return line
        
        # Translate mermaid nodes and arrows with labels
        if '[' in line and ']' in line:
            return translate_mermaid_node(line, translator)
        
        return line
    
    # Preserve frontmatter
    if stripped == '---':
        return line

    # Handle container syntax ::: tip, ::: info, etc.
    if stripped.startswith(':::'):
        parts = stripped.split(' ', 1)
        if len(parts) == 2:
            # Translate the title part
            try:
                translated_title = translator.translate(parts[1])
                return line.replace(parts[1], translated_title)
            except:
                return line
        return line

    # Handle markdown headers
    if stripped.startswith('#'):
        header_level = len(stripped) - len(stripped.lstrip('#'))
        header_text = stripped[header_level:].strip()
        try:
            translated = translator.translate(header_text)
            return '#' * header_level + ' ' + translated + '\n'
        except:
            return line

    # Handle list items
    if stripped.startswith('- ') or stripped.startswith('* '):
        bullet = '- ' if stripped.startswith('- ') else '* '
        list_text = stripped[2:]
        # Check for checkboxes
        if list_text.startswith('[ ] ') or list_text.startswith('[x] '):
            checkbox = list_text[:4]
            text_to_translate = list_text[4:]
            try:
                translated = translator.translate(text_to_translate)
                return bullet + checkbox + translated + '\n'
            except:
                return line
        else:
            try:
                translated = translator.translate(list_text)
                return bullet + translated + '\n'
            except:
                return line

    # Handle table rows
    if '|' in line and not line.strip().startswith('|---'):
        parts = [p.strip() for p in line.split('|')]
        translated_parts = []
        for part in parts:
            if part and not part.startswith('---'):
                # Check for markdown formatting
                if '**' in part or '*' in part or '`' in part:
                    # Preserve formatting
                    try:
                        translated = translator.translate(part)
                        translated_parts.append(translated)
                    except:
                        translated_parts.append(part)
                else:
                    try:
                        translated = translator.translate(part) if part else part
                        translated_parts.append(translated)
                    except:
                        translated_parts.append(part)
            else:
                translated_parts.append(part)
        return '| ' + ' | '.join(translated_parts) + ' |\n'

    # Handle blockquotes
    if stripped.startswith('>'):
        quote_text = stripped[1:].strip()
        try:
            translated = translator.translate(quote_text)
            return '> ' + translated + '\n'
        except:
            return line

    # Regular paragraph text
    try:
        # Preserve markdown formatting like **bold**, *italic*, `code`
        translated = translator.translate(stripped)
        return translated + '\n'
    except Exception as e:
        print(f"  Warning: Could not translate line: {stripped[:50]}... ({e})")
        return line

def translate_file(source_path, target_path, lang_code):
    """Translate a markdown file to target language"""
    print(f"    Translating to {lang_code}...", end='', flush=True)
    translator = GoogleTranslator(source='en', target=LANGUAGES[lang_code])

    with open(source_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    translated_lines = []
    in_mermaid = False
    in_code_block = False

    for line in lines:
        stripped = line.strip()

        # Track code blocks
        if stripped.startswith('```'):
            if stripped == '```mermaid':
                in_mermaid = True
                translated_lines.append(line)
            elif stripped == '```' and in_mermaid:
                in_mermaid = False
                translated_lines.append(line)
            elif stripped == '```':
                in_code_block = not in_code_block
                translated_lines.append(line)
            else:
                in_code_block = True
                translated_lines.append(line)
            continue

        # Don't translate code blocks
        if in_code_block:
            translated_lines.append(line)
            continue

        # Translate the line
        translated = translate_line(line, translator, in_mermaid)
        translated_lines.append(translated)

    # Write translated content
    target_path.parent.mkdir(parents=True, exist_ok=True)
    with open(target_path, 'w', encoding='utf-8') as f:
        f.writelines(translated_lines)
    print(" ✓", flush=True)

def main():
    docs_dir = Path('docs')
    total_files = len(FILES) * len(LANGUAGES)
    completed = 0

    print(f"\n🌍 Starting bulk translation of {len(FILES)} files to {len(LANGUAGES)} languages", flush=True)
    print(f"📊 Total translations: {total_files}\n", flush=True)

    for idx, file_path in enumerate(FILES, 1):
        print(f"\n📄 [{idx}/{len(FILES)}] {file_path}", flush=True)
        source_file = docs_dir / 'en' / file_path

        if not source_file.exists():
            print(f"  ⚠️  Source file not found: {source_file}", flush=True)
            continue

        for lang_code in LANGUAGES.keys():
            target_file = docs_dir / lang_code / file_path

            try:
                translate_file(source_file, target_file, lang_code)
                completed += 1
            except Exception as e:
                print(f"\n  ✗ {lang_code} - Error: {e}", flush=True)

    print(f"\n\n✅ Translation complete! {completed}/{total_files} files translated", flush=True)

if __name__ == '__main__':
    main()

