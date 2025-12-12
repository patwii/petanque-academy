#!/usr/bin/env python3
import os
import re
import time
from google.cloud import translate_v2 as translate

# Set credentials
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'private_keys/credentials.json'

# Initialize the Google Cloud Translation client
translate_client = translate.Client()

# Target languages
TARGET_LANGUAGES = {
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

def translate_text(text, target_language):
    """Translate text to target language using Google Cloud Translation API."""
    try:
        result = translate_client.translate(text, target_language=target_language, source_language='en')
        return result['translatedText']
    except Exception as e:
        print(f"  ⚠ Translation error: {e}")
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
    
    # Don't translate container syntax (will be handled separately)
    if stripped.startswith(':::'):
        return False
    
    # Don't translate HTML/Vue components
    if stripped.startswith('<') and '>' in stripped and not stripped.startswith('<!--'):
        return False
    
    # Don't translate markdown image syntax
    if stripped.startswith('!['):
        return False
    
    # Don't translate URLs
    if stripped.startswith('http'):
        return False
    
    # Don't translate markdown links that are just URLs
    if stripped.startswith('[') and '](' in stripped and stripped.endswith(')'):
        # Check if it's an email or URL link
        if 'mailto:' in stripped or 'http' in stripped or 'facebook.com' in stripped:
            return False
    
    return True

def translate_file(source_path, target_path, target_lang):
    """Translate a markdown file line by line."""
    with open(source_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    translated_lines = []
    in_code_block = False
    total_lines = len(lines)
    
    for i, line in enumerate(lines):
        # Track code blocks
        if line.strip().startswith('```'):
            in_code_block = not in_code_block
            translated_lines.append(line)
            continue
        
        # Don't translate inside code blocks
        if in_code_block:
            translated_lines.append(line)
            continue
        
        # Show progress every 50 lines
        if i % 50 == 0:
            print(f"  Progress: {i}/{total_lines} lines")
        
        # Handle VitePress container lines specially
        if line.strip().startswith(':::'):
            container_result = process_container_line(line, target_lang)
            if container_result:
                translated_lines.append(container_result)
                continue
        
        # Translate if needed
        if should_translate_line(line):
            # Preserve leading/trailing whitespace
            leading_space = len(line) - len(line.lstrip())
            trailing_newline = line.endswith('\n')
            
            stripped = line.strip()
            translated = translate_text(stripped, target_lang)
            
            # Reconstruct with original spacing
            result = ' ' * leading_space + translated
            if trailing_newline:
                result += '\n'
            
            translated_lines.append(result)
            time.sleep(0.1)  # Rate limiting
        else:
            translated_lines.append(line)
    
    # Write translated content
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    with open(target_path, 'w', encoding='utf-8') as f:
        f.writelines(translated_lines)

def main():
    source_file = 'docs/en/about.md'
    
    print("=" * 60)
    print("Re-translating About page with proper container handling")
    print("=" * 60)
    
    for lang_code, lang_name in TARGET_LANGUAGES.items():
        target_file = f'docs/{lang_code}/about.md'
        print(f"\nTranslating to {lang_name} ({lang_code})...")
        translate_file(source_file, target_file, lang_code)
        print(f"  ✓ Completed: {target_file}")
    
    print("\n" + "=" * 60)
    print("✓ About page re-translated with proper container handling!")
    print("=" * 60)

if __name__ == '__main__':
    main()

