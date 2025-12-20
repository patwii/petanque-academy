#!/usr/bin/env python3
"""
Translate the nutrition file to all languages using Google Cloud Translation API
"""

import os
import re
from google.cloud import translate_v2 as translate

# Set up GCP credentials
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'private_keys/credentials.json'

# Initialize the Translation client
translate_client = translate.Client()

# Language mappings
LANGUAGES = {
    'da': 'Danish',
    'de': 'German',
    'es': 'Spanish',
    'fr': 'French',
    'it': 'Italian',
    'nl': 'Dutch',
    'no': 'Norwegian',
    'pt': 'Portuguese',
    'sv': 'Swedish'
}

def translate_file(source_file, target_lang):
    """Translate a single file to target language"""
    
    # Read source file
    with open(source_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split into lines for processing
    lines = content.split('\n')
    translated_lines = []
    
    in_code_block = False
    in_mermaid = False
    
    for line in lines:
        # Check for code blocks
        if line.strip().startswith('```'):
            in_code_block = not in_code_block
            if 'mermaid' in line:
                in_mermaid = True
            elif in_code_block == False:
                in_mermaid = False
            translated_lines.append(line)
            continue
        
        # Don't translate code blocks (except mermaid text)
        if in_code_block and not in_mermaid:
            translated_lines.append(line)
            continue
        
        # Don't translate empty lines
        if not line.strip():
            translated_lines.append(line)
            continue
        
        # Translate the line
        try:
            # Handle special markdown syntax
            if line.strip().startswith(':::'):
                # Container syntax
                match = re.match(r'^(:::)\s+(\w+)(?:\s+(.+))?$', line.strip())
                if match and match.group(3):
                    prefix = match.group(1)
                    container_type = match.group(2)
                    title = match.group(3)
                    translated_title = translate_client.translate(title, target_language=target_lang)['translatedText']
                    translated_lines.append(f"{prefix} {container_type} {translated_title}")
                else:
                    translated_lines.append(line)
            elif line.strip().startswith('#'):
                # Headers
                match = re.match(r'^(#+)\s+(.+)$', line.strip())
                if match:
                    hashes = match.group(1)
                    text = match.group(2)
                    translated_text = translate_client.translate(text, target_language=target_lang)['translatedText']
                    translated_lines.append(f"{hashes} {translated_text}")
                else:
                    translated_lines.append(line)
            elif line.strip().startswith('|') and '|' in line:
                # Table rows
                parts = line.split('|')
                translated_parts = []
                for part in parts:
                    if part.strip() and not re.match(r'^[\s\-:]+$', part):
                        translated_part = translate_client.translate(part.strip(), target_language=target_lang)['translatedText']
                        translated_parts.append(f" {translated_part} ")
                    else:
                        translated_parts.append(part)
                translated_lines.append('|'.join(translated_parts))
            elif line.strip().startswith('>'):
                # Blockquotes
                match = re.match(r'^(>\s*)(.+)$', line)
                if match:
                    prefix = match.group(1)
                    text = match.group(2)
                    translated_text = translate_client.translate(text, target_language=target_lang)['translatedText']
                    translated_lines.append(f"{prefix}{translated_text}")
                else:
                    translated_lines.append(line)
            elif line.strip().startswith('- [ ]') or line.strip().startswith('- [x]'):
                # Checkboxes
                match = re.match(r'^(\s*-\s+\[[x ]\]\s+)(.+)$', line)
                if match:
                    prefix = match.group(1)
                    text = match.group(2)
                    translated_text = translate_client.translate(text, target_language=target_lang)['translatedText']
                    translated_lines.append(f"{prefix}{translated_text}")
                else:
                    translated_lines.append(line)
            elif line.strip().startswith('-') or line.strip().startswith('*'):
                # List items
                match = re.match(r'^(\s*[-*]\s+)(.+)$', line)
                if match:
                    prefix = match.group(1)
                    text = match.group(2)
                    # Handle bold/italic
                    text_clean = re.sub(r'\*\*(.+?)\*\*', r'\1', text)
                    translated_text = translate_client.translate(text_clean, target_language=target_lang)['translatedText']
                    # Restore bold if it was there
                    if '**' in text:
                        translated_text = f"**{translated_text}**"
                    translated_lines.append(f"{prefix}{translated_text}")
                else:
                    translated_lines.append(line)
            elif in_mermaid:
                # Mermaid diagram - translate text but keep syntax
                # Simple approach: translate text in brackets and after arrows
                if '[' in line and ']' in line:
                    parts = re.split(r'(\[.+?\])', line)
                    translated_parts = []
                    for part in parts:
                        if part.startswith('[') and part.endswith(']'):
                            text = part[1:-1]
                            # Handle <br/> tags
                            if '<br/>' in text:
                                subparts = text.split('<br/>')
                                translated_subparts = [translate_client.translate(sp, target_language=target_lang)['translatedText'] for sp in subparts]
                                translated_text = '<br/>'.join(translated_subparts)
                            else:
                                translated_text = translate_client.translate(text, target_language=target_lang)['translatedText']
                            translated_parts.append(f"[{translated_text}]")
                        else:
                            translated_parts.append(part)
                    translated_lines.append(''.join(translated_parts))
                else:
                    translated_lines.append(line)
            else:
                # Regular text
                translated_text = translate_client.translate(line, target_language=target_lang)['translatedText']
                translated_lines.append(translated_text)
        
        except Exception as e:
            print(f"Error translating line: {line[:50]}... - {e}")
            translated_lines.append(line)
    
    return '\n'.join(translated_lines)

def main():
    source_file = 'docs/en/education/nutrition/index.md'
    
    print(f"Translating nutrition file to all languages...")
    print(f"Source: {source_file}\n")
    
    for lang_code, lang_name in LANGUAGES.items():
        target_file = f'docs/{lang_code}/education/nutrition/index.md'
        
        print(f"Translating to {lang_name} ({lang_code})...")
        
        try:
            translated_content = translate_file(source_file, lang_code)
            
            # Create directory if it doesn't exist
            os.makedirs(os.path.dirname(target_file), exist_ok=True)
            
            # Write translated file
            with open(target_file, 'w', encoding='utf-8') as f:
                f.write(translated_content)
            
            print(f"✓ {lang_name} complete\n")
        
        except Exception as e:
            print(f"✗ Error translating to {lang_name}: {e}\n")
    
    print("All translations complete!")

if __name__ == '__main__':
    main()

