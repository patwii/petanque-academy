#!/usr/bin/env python3
import os
import json
from google.cloud import translate_v2 as translate

# Set up credentials
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'private_keys/credentials.json'

# Initialize the client
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

# Files to translate
FILES_TO_TRANSLATE = [
    'workshop.md',
    'training-camp.md',
    'training-session.md'
]

def translate_text(text, target_language):
    """Translate text to target language."""
    if not text or text.isspace():
        return text
    
    try:
        result = translate_client.translate(
            text,
            target_language=target_language,
            source_language='en'
        )
        return result['translatedText']
    except Exception as e:
        print(f"Error translating: {e}")
        return text

def translate_markdown_file(source_path, target_path, target_lang):
    """Translate a markdown file while preserving structure."""
    print(f"Translating {source_path} to {target_lang}...")
    
    with open(source_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split into lines for processing
    lines = content.split('\n')
    translated_lines = []
    
    in_code_block = False
    in_mermaid = False
    in_frontmatter = False
    
    for i, line in enumerate(lines):
        # Track code blocks
        if line.strip().startswith('```'):
            in_code_block = not in_code_block
            if 'mermaid' in line:
                in_mermaid = True
            elif in_code_block == False:
                in_mermaid = False
            translated_lines.append(line)
            continue
        
        # Track frontmatter
        if line.strip() == '---':
            in_frontmatter = not in_frontmatter
            translated_lines.append(line)
            continue
        
        # Don't translate code blocks, mermaid diagrams, or frontmatter
        if in_code_block or in_mermaid or in_frontmatter:
            translated_lines.append(line)
            continue
        
        # Don't translate empty lines
        if not line.strip():
            translated_lines.append(line)
            continue
        
        # Don't translate HTML tags alone
        if line.strip().startswith('<') and line.strip().endswith('>'):
            translated_lines.append(line)
            continue
        
        # Don't translate links that are just URLs
        if line.strip().startswith('http'):
            translated_lines.append(line)
            continue
        
        # Translate the line
        translated_line = translate_text(line, target_lang)
        translated_lines.append(translated_line)
        
        # Progress indicator
        if i % 50 == 0:
            print(f"  Progress: {i}/{len(lines)} lines")
    
    # Write translated content
    translated_content = '\n'.join(translated_lines)
    
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(translated_content)
    
    print(f"  ✓ Completed: {target_path}")

def main():
    """Main translation function."""
    base_dir = 'docs'
    
    for filename in FILES_TO_TRANSLATE:
        source_file = os.path.join(base_dir, 'en', filename)
        
        if not os.path.exists(source_file):
            print(f"Warning: {source_file} not found, skipping...")
            continue
        
        print(f"\n{'='*60}")
        print(f"Processing: {filename}")
        print(f"{'='*60}")
        
        for lang_code, lang_name in LANGUAGES.items():
            target_file = os.path.join(base_dir, lang_code, filename)
            translate_markdown_file(source_file, target_file, lang_code)
        
        print(f"\n✓ {filename} translated to all languages!")
    
    print(f"\n{'='*60}")
    print("All translations complete!")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()

