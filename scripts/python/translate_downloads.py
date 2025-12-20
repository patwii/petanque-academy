#!/usr/bin/env python3
"""
Translate download materials using Google Cloud Translation API
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

# Download files to translate
DOWNLOAD_FILES = [
    'participant-guide.md',
    'summary-sheet.md',
    'exercise-worksheets.md',
    'facilitator-slides.md',
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


def translate_line(line, target_lang, translate_client):
    """Translate a single line while preserving markdown syntax"""
    stripped = line.strip()
    
    # Empty lines
    if not stripped:
        return line
    
    # Code fence markers
    if stripped.startswith('```'):
        return line
    
    # Frontmatter
    if stripped == '---':
        return line
    
    # Headers - translate text only
    if stripped.startswith('#'):
        level = len(stripped) - len(stripped.lstrip('#'))
        text = stripped[level:].strip()
        translated = translate_text_gcp(text, target_lang, translate_client)
        return '#' * level + ' ' + translated + '\n'
    
    # Lists - translate text only
    if stripped.startswith('- ') or stripped.startswith('* '):
        prefix = stripped[:2]
        text = stripped[2:]
        translated = translate_text_gcp(text, target_lang, translate_client)
        return prefix + translated + '\n'
    
    # Numbered lists
    match = re.match(r'^(\d+\.\s)', stripped)
    if match:
        prefix = match.group(1)
        text = stripped[len(prefix):]
        translated = translate_text_gcp(text, target_lang, translate_client)
        return prefix + translated + '\n'
    
    # Regular text
    translated = translate_text_gcp(stripped, target_lang, translate_client)
    return translated + '\n'


def translate_file(source_path, target_path, target_lang, translate_client):
    """Translate a markdown file"""
    with open(source_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    translated_lines = []
    in_code_block = False
    
    for line in lines:
        stripped = line.strip()
        
        # Track code blocks
        if stripped.startswith('```'):
            in_code_block = not in_code_block
            translated_lines.append(line)
            continue
        
        # Don't translate code blocks
        if in_code_block:
            translated_lines.append(line)
            continue
        
        # Translate the line
        translated_lines.append(translate_line(line, target_lang, translate_client))
        time.sleep(0.1)  # Rate limiting
    
    # Ensure target directory exists
    target_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(target_path, 'w', encoding='utf-8') as f:
        f.writelines(translated_lines)


def main():
    print("Initializing Google Cloud Translation API...")
    translate_client = translate.Client()
    
    base_dir = Path('docs/public/downloads')
    source_dir = base_dir / 'en'
    
    total = len(DOWNLOAD_FILES) * len(LANGUAGES)
    print(f"\n🌍 Translating download materials: {len(DOWNLOAD_FILES)} files × {len(LANGUAGES)} languages = {total} translations\n")
    
    for i, filename in enumerate(DOWNLOAD_FILES, 1):
        source_path = source_dir / filename
        if not source_path.exists():
            print(f"[{i}/{len(DOWNLOAD_FILES)}] {filename} - NOT FOUND")
            continue
        
        print(f"[{i}/{len(DOWNLOAD_FILES)}] {filename}")
        
        for lang_code, target_lang in LANGUAGES.items():
            target_dir = base_dir / lang_code
            target_path = target_dir / filename
            
            print(f"  {lang_code}...", end=' ', flush=True)
            translate_file(source_path, target_path, target_lang, translate_client)
            print("✓", flush=True)
    
    print("\n✅ Download materials translated successfully!\n")


if __name__ == "__main__":
    main()

