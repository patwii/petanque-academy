#!/usr/bin/env python3
import os

def add_ads_to_file(file_path):
    """Add AdBanner and AdInArticle to a markdown file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Skip if already has ads
    content = ''.join(lines)
    if 'AdBanner' in content or 'AdInArticle' in content:
        return False
    
    new_lines = []
    header_found = False
    ad_in_article_added = False
    line_count = 0
    
    for i, line in enumerate(lines):
        # Add AdBanner after first header
        if not header_found and line.startswith('#'):
            header_found = True
            new_lines.append(line)
            # Add blank line and AdBanner after the header
            if i + 1 < len(lines) and lines[i + 1].strip() != '':
                new_lines.append('\n')
            new_lines.append('<AdBanner />\n')
            new_lines.append('\n')
            continue
        
        # Add AdInArticle roughly in the middle of the content
        if header_found and not ad_in_article_added:
            line_count += 1
            # Add after about 40% of the content
            if line_count > len(lines) * 0.4 and line.strip() == '' and i + 1 < len(lines):
                new_lines.append(line)
                new_lines.append('<AdInArticle />\n')
                new_lines.append('\n')
                ad_in_article_added = True
                continue
        
        new_lines.append(line)
    
    # Add AdBanner at the end if we added AdInArticle
    if ad_in_article_added:
        # Remove trailing empty lines
        while new_lines and new_lines[-1].strip() == '':
            new_lines.pop()
        
        new_lines.append('\n')
        new_lines.append('<AdBanner />\n')
    
    # Write the modified content
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    
    return True

def main():
    # All languages
    languages = ['en', 'da', 'de', 'es', 'fr', 'it', 'nl', 'no', 'pt', 'sv']
    
    print("=" * 60)
    print("Adding Google Ads to Remaining Pages")
    print("=" * 60)
    
    total_files = 0
    
    for lang in languages:
        print(f"\n{lang.upper()}:")
        lang_files = 0
        
        # Check news/index.md
        news_file = f'docs/{lang}/news/index.md'
        if os.path.exists(news_file):
            if add_ads_to_file(news_file):
                print(f"  ✓ news/index.md")
                lang_files += 1
                total_files += 1
        
        if lang_files == 0:
            print(f"  ✓ No files needed ads")
    
    print("\n" + "=" * 60)
    print(f"✓ Total files updated: {total_files}")
    print("=" * 60)

if __name__ == '__main__':
    main()

