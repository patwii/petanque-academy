#!/usr/bin/env python3
import os
import re
import time
from google.cloud import translate_v2 as translate

# Set up Google Cloud credentials
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'private_keys/credentials.json'

# Initialize the translation client
translate_client = translate.Client()

# Language mapping
LANGUAGES = {
    'da': 'da',  # Danish
    'de': 'de',  # German
    'es': 'es',  # Spanish
    'fr': 'fr',  # French
    'it': 'it',  # Italian
    'nl': 'nl',  # Dutch
    'no': 'no',  # Norwegian
    'pt': 'pt',  # Portuguese
    'sv': 'sv'   # Swedish
}

def translate_text(text, target_language):
    """Translate text to target language using Google Cloud Translation API."""
    if not text.strip():
        return text

    try:
        result = translate_client.translate(text, target_language=target_language, source_language='en')
        translated = result['translatedText']
        # Fix HTML entities
        translated = translated.replace('&quot;', '"')
        translated = translated.replace('&amp;', '&')
        translated = translated.replace('&lt;', '<')
        translated = translated.replace('&gt;', '>')
        return translated
    except Exception as e:
        print(f"    Error translating: {e}")
        return text

def process_container_line(line, target_lang):
    """Process VitePress container lines - translate title but keep syntax."""
    match = re.match(r'^(\s*:::)\s+(tip|warning|danger|details|info)\s+(.+)$', line)
    if match:
        indent = match.group(1)
        container_type = match.group(2)
        title = match.group(3).strip()
        translated_title = translate_text(title, target_lang)
        return f"{indent} {container_type} {translated_title}\n"
    return None

def should_skip_translation(line):
    """Check if line should not be translated."""
    line_stripped = line.strip()

    # Skip empty lines
    if not line_stripped:
        return True

    # Skip markdown syntax
    if line_stripped in ['---', ':::']:
        return True

    # Skip component tags
    if line_stripped in ['<AdBanner />', '<AdInArticle />']:
        return True

    # Skip mermaid blocks
    if line_stripped.startswith('```'):
        return True

    # Skip links (will be handled specially)
    if line_stripped.startswith('[') and ']:' in line_stripped:
        return True

    return False

def translate_markdown_line(line, target_lang):
    """Translate a single markdown line while preserving formatting."""

    # Skip lines that shouldn't be translated
    if should_skip_translation(line):
        return line

    # Handle VitePress containers
    container_result = process_container_line(line, target_lang)
    if container_result:
        return container_result

    # Handle headers
    if line.startswith('#'):
        match = re.match(r'^(#+)\s+(.+)$', line)
        if match:
            hashes = match.group(1)
            text = match.group(2)
            translated = translate_text(text, target_lang)
            return f"{hashes} {translated}\n"

    # Handle list items
    if re.match(r'^\s*[-*]\s+', line):
        match = re.match(r'^(\s*[-*]\s+)(.+)$', line)
        if match:
            prefix = match.group(1)
            text = match.group(2)
            # Don't translate if it's mostly markdown links
            if text.count('[') > 2:
                return line
            translated = translate_text(text, target_lang)
            return f"{prefix}{translated}\n"

    # Handle table rows
    if '|' in line and not line.strip().startswith('|--'):
        parts = line.split('|')
        translated_parts = []
        for part in parts:
            if part.strip() and not part.strip().startswith('-'):
                # Check if part contains a link
                if '[' in part and '](' in part:
                    translated_parts.append(part)
                else:
                    translated_parts.append(translate_text(part, target_lang) if part.strip() else part)
            else:
                translated_parts.append(part)
        return '|'.join(translated_parts)

    # Regular paragraph
    if line.strip() and not line.startswith('  '):
        translated = translate_text(line.strip(), target_lang)
        return translated + '\n'

    return line

def translate_file(source_file, target_file, target_lang):
    """Translate entire markdown file."""
    with open(source_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    translated_lines = []
    in_mermaid = False
    in_code_block = False

    for line in lines:
        # Track code blocks
        if line.strip().startswith('```'):
            if 'mermaid' in line:
                in_mermaid = True
            elif in_mermaid or in_code_block:
                in_mermaid = False
                in_code_block = False
            else:
                in_code_block = True
            translated_lines.append(line)
            continue

        # Don't translate inside code blocks or mermaid
        if in_mermaid or in_code_block:
            translated_lines.append(line)
            continue

        # Translate the line
        translated_line = translate_markdown_line(line, target_lang)
        translated_lines.append(translated_line)

        # Small delay to avoid rate limiting
        time.sleep(0.05)

    # Write translated content
    os.makedirs(os.path.dirname(target_file), exist_ok=True)
    with open(target_file, 'w', encoding='utf-8') as f:
        f.writelines(translated_lines)

print("=" * 70)
print("Translating News Page to All Languages")
print("=" * 70)

source_file = 'docs/en/news/index.md'

for lang_code in LANGUAGES.keys():
    target_file = f'docs/{lang_code}/news/index.md'
    print(f"\n{lang_code.upper()}: Translating...")

    try:
        translate_file(source_file, target_file, lang_code)
        print(f"✓ {lang_code.upper()}: Complete")
    except Exception as e:
        print(f"✗ {lang_code.upper()}: Error - {e}")

print("\n" + "=" * 70)
print("✓ Translation complete for all languages")
print("=" * 70)

