#!/usr/bin/env python3
"""
Fix cross-language links in markdown files.
Ensures all links within a language folder point to the same language.
"""

import os
import re
from pathlib import Path

# Language codes
LANGUAGES = ['da', 'de', 'en', 'es', 'fr', 'it', 'nl', 'no', 'pt', 'sv']

def fix_links_in_file(file_path: Path, target_lang: str) -> int:
    """
    Fix all /en/ links in a file to point to the target language.
    Returns the number of replacements made.
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    replacements = 0
    
    # Pattern to match markdown links: [text](/en/path)
    # We need to replace /en/ with /target_lang/ in all links
    for lang in LANGUAGES:
        if lang == target_lang:
            continue
        
        # Match links like [text](/lang/path)
        pattern = rf'\[([^\]]+)\]\(/{lang}/'
        replacement = rf'[\1](/{target_lang}/'
        
        content, count = re.subn(pattern, replacement, content)
        replacements += count
    
    # Only write if changes were made
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return replacements
    
    return 0

def process_language_folder(docs_path: Path, lang: str):
    """Process all markdown files in a language folder."""
    lang_path = docs_path / lang
    
    if not lang_path.exists():
        print(f"⚠️  Language folder not found: {lang_path}")
        return
    
    total_files = 0
    total_replacements = 0
    
    # Find all .md files recursively
    for md_file in lang_path.rglob('*.md'):
        replacements = fix_links_in_file(md_file, lang)
        if replacements > 0:
            total_files += 1
            total_replacements += replacements
            print(f"  ✓ {md_file.relative_to(docs_path)}: {replacements} links fixed")
    
    if total_files > 0:
        print(f"✅ {lang}: Fixed {total_replacements} links in {total_files} files")
    else:
        print(f"✓ {lang}: No fixes needed")

def main():
    """Main function to fix all language links."""
    # Get the project root (assuming script is in scripts/python/)
    script_path = Path(__file__).resolve()
    project_root = script_path.parent.parent.parent
    docs_path = project_root / 'docs'
    
    print("🔧 Fixing cross-language links in all markdown files...\n")
    
    # Process each language folder
    for lang in LANGUAGES:
        process_language_folder(docs_path, lang)
    
    print("\n✅ All language links have been fixed!")
    print("\n💡 Next steps:")
    print("   1. Review the changes with: git diff")
    print("   2. Test the site locally: npm run docs:dev")
    print("   3. Commit the changes: git add . && git commit -m 'Fix cross-language links'")

if __name__ == '__main__':
    main()

