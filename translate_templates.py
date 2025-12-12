#!/usr/bin/env python3
import os
import json
import re
import time
from google.cloud import translate_v2 as translate

# Set up Google Cloud credentials
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'private_keys/credentials.json'

# Initialize the translation client
translate_client = translate.Client()

# Language mappings
LANGUAGES = {
    'da': 'da',  # Danish
    'de': 'de',  # German
    'es': 'es',  # Spanish
    'fr': 'fr',  # French
    'it': 'it',  # Italian
    'nl': 'nl',  # Dutch
    'no': 'no',  # Norwegian
    'pt': 'pt',  # Portuguese
    'sv': 'sv',  # Swedish
}

FILES_TO_TRANSLATE = [
    'goal-template.md',
    'diary-template.md'
]

def translate_text(text, target_language):
    """Translate text to target language using Google Cloud Translation API."""
    if not text.strip():
        return text
    
    try:
        result = translate_client.translate(text, target_language=target_language, source_language='en')
        return result['translatedText']
    except Exception as e:
        print(f"    Error translating: {e}")
        return text

def process_container_line(line, target_lang):
    """Process VitePress container lines - translate title but keep syntax."""
    # Pattern: ::: type Title Text
    match = re.match(r'^(\s*:::)\s+(tip|warning|danger|details|info)\s+(.+)$', line)
    if match:
        indent = match.group(1)
        container_type = match.group(2)
        title = match.group(3).strip()

        # Translate the title
        translated_title = translate_text(title, target_lang)
        time.sleep(0.1)

        return f"{indent} {container_type} {translated_title}\n"

    # Just ::: (closing tag)
    if re.match(r'^\s*:::$', line):
        return line

    return None

def should_translate_line(line):
    """Determine if a line should be translated."""
    stripped = line.strip()

    # Don't translate empty lines
    if not stripped:
        return False

    # Don't translate frontmatter
    if stripped == '---':
        return False

    # Don't translate code blocks
    if stripped.startswith('```'):
        return False

    # Don't translate mermaid diagrams
    if 'mermaid' in stripped.lower():
        return False

    # Don't translate VitePress containers (will be handled separately)
    if stripped.startswith(':::'):
        return False

    # Don't translate HTML tags (but translate content inside)
    if stripped.startswith('<') and stripped.endswith('>') and not '>' in stripped[1:-1]:
        return False

    # Don't translate markdown image syntax
    if stripped.startswith('!['):
        return False

    # Don't translate URLs
    if stripped.startswith('http'):
        return False

    # Don't translate table separators
    if stripped.startswith('|') and all(c in '|-: ' for c in stripped):
        return False

    return True

def translate_file(source_file, target_lang):
    """Translate a markdown file to target language."""
    source_path = f'docs/en/{source_file}'
    target_path = f'docs/{target_lang}/{source_file}'
    
    print(f"Translating docs/en/{source_file} to {target_lang}...")
    
    with open(source_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    translated_lines = []
    in_code_block = False
    in_frontmatter = False
    in_mermaid = False
    total_lines = len(lines)
    
    for i, line in enumerate(lines):
        # Progress indicator
        if i % 50 == 0:
            print(f"  Progress: {i}/{total_lines} lines")
        
        stripped = line.strip()
        
        # Track code blocks
        if stripped.startswith('```'):
            in_code_block = not in_code_block
            if 'mermaid' in stripped:
                in_mermaid = True
            elif in_code_block == False:
                in_mermaid = False
            translated_lines.append(line)
            continue
        
        # Track frontmatter
        if stripped == '---':
            if not in_frontmatter:
                in_frontmatter = True
            else:
                in_frontmatter = False
            translated_lines.append(line)
            continue
        
        # Don't translate inside code blocks, frontmatter, or mermaid diagrams
        if in_code_block or in_frontmatter or in_mermaid:
            translated_lines.append(line)
            continue
        
        # Don't translate empty lines
        if not stripped:
            translated_lines.append(line)
            continue
        
        # Don't translate HTML tags alone
        if stripped.startswith('<') and stripped.endswith('>') and '>' not in stripped[1:-1]:
            translated_lines.append(line)
            continue

        # Handle VitePress container lines specially
        if stripped.startswith(':::'):
            container_result = process_container_line(line, target_lang)
            if container_result:
                translated_lines.append(container_result)
                continue

        # Translate the line
        if should_translate_line(line):
            # Preserve leading/trailing whitespace
            leading_space = line[:len(line) - len(line.lstrip())]
            trailing_space = line[len(line.rstrip()):]

            translated_text = translate_text(stripped, target_lang)
            translated_lines.append(leading_space + translated_text + trailing_space)
            time.sleep(0.1)  # Rate limiting
        else:
            translated_lines.append(line)
    
    # Write translated file
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    with open(target_path, 'w', encoding='utf-8') as f:
        f.writelines(translated_lines)
    
    print(f"  ✓ Completed: {target_path}")

def main():
    for file_name in FILES_TO_TRANSLATE:
        print(f"\n{'='*60}")
        print(f"Processing: {file_name}")
        print('='*60)
        
        for lang_code, lang_name in LANGUAGES.items():
            translate_file(file_name, lang_code)
        
        print(f"\n✓ {file_name} translated to all languages!")
    
    print(f"\n{'='*60}")
    print("All translations complete!")
    print('='*60)

if __name__ == '__main__':
    main()

