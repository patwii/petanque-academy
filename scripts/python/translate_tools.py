#!/usr/bin/env python3
import os
import json
from google.cloud import translate_v2 as translate

# Set credentials
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'private_keys/credentials.json'

# Initialize client
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
    'training-camp.md',
    'training-session.md'
]

def preserve_markdown(text):
    """Preserve markdown syntax during translation"""
    # This is a simplified version - the actual translation preserves more
    return text

def translate_file(source_file, target_lang, target_file):
    """Translate a markdown file"""
    print(f"Translating {source_file} to {target_lang}...")
    
    with open(source_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split into chunks (Google Translate has size limits)
    chunks = []
    current_chunk = []
    current_size = 0
    
    for line in content.split('\n'):
        line_size = len(line.encode('utf-8'))
        if current_size + line_size > 4000:  # Leave margin
            chunks.append('\n'.join(current_chunk))
            current_chunk = [line]
            current_size = line_size
        else:
            current_chunk.append(line)
            current_size += line_size
    
    if current_chunk:
        chunks.append('\n'.join(current_chunk))
    
    # Translate each chunk
    translated_chunks = []
    for i, chunk in enumerate(chunks):
        print(f"  Chunk {i+1}/{len(chunks)}...")
        result = translate_client.translate(
            chunk,
            target_language=target_lang,
            source_language='en',
            format_='text'
        )
        translated_chunks.append(result['translatedText'])
    
    # Join translated chunks
    translated_content = '\n'.join(translated_chunks)
    
    # Write to target file
    os.makedirs(os.path.dirname(target_file), exist_ok=True)
    with open(target_file, 'w', encoding='utf-8') as f:
        f.write(translated_content)
    
    print(f"  ✓ Saved to {target_file}")

def main():
    for filename in FILES_TO_TRANSLATE:
        source_file = f'docs/en/{filename}'
        
        if not os.path.exists(source_file):
            print(f"⚠ Source file not found: {source_file}")
            continue
        
        for lang_code, lang_name in LANGUAGES.items():
            target_file = f'docs/{lang_code}/{filename}'
            translate_file(source_file, lang_code, target_file)
    
    print("\n✅ All translations complete!")

if __name__ == '__main__':
    main()
