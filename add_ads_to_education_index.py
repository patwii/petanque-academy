#!/usr/bin/env python3
import os
import shutil

# All languages
languages = ['da', 'de', 'es', 'fr', 'it', 'nl', 'no', 'pt', 'sv']

print("=" * 60)
print("Adding Ads to Education Index Pages")
print("=" * 60)

# Read the English version (which now has ads)
with open('docs/en/education/index.md', 'r', encoding='utf-8') as f:
    en_lines = f.readlines()

# Extract the ad positions from English version
ad_positions = []
for i, line in enumerate(en_lines):
    if '<AdBanner />' in line or '<AdInArticle />' in line:
        ad_positions.append((i, line.strip()))

print(f"\nFound {len(ad_positions)} ad placements in English version:")
for pos, ad in ad_positions:
    print(f"  Line {pos + 1}: {ad}")

total_updated = 0

for lang in languages:
    file_path = f'docs/{lang}/education/index.md'
    
    if not os.path.exists(file_path):
        print(f"\n{lang.upper()}: File not found, skipping")
        continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Check if already has ads
    content = ''.join(lines)
    if '<AdBanner />' in content or '<AdInArticle />' in content:
        print(f"\n{lang.upper()}: Already has ads, skipping")
        continue
    
    # Add ads at the same positions as English
    new_lines = []
    ads_added = 0
    
    for i, line in enumerate(lines):
        # Check if we should add an ad at this position
        for pos, ad_line in ad_positions:
            # Add AdBanner after first header (line 1 in English)
            if pos == 1 and i == 0 and line.startswith('#'):
                new_lines.append(line)
                new_lines.append(ad_line + '\n')
                new_lines.append('\n')
                ads_added += 1
                continue
            
            # Add AdInArticle before "The Journey from Technique to Flow" section
            # Look for the header that starts with "##" and contains journey/technique keywords
            if pos == 76 and i > 50 and line.startswith('##'):
                # Check if this looks like the right section
                if any(keyword in line.lower() for keyword in ['journey', 'technique', 'flow', 'ratio', 'inversion']):
                    new_lines.append(ad_line + '\n')
                    new_lines.append('\n')
                    ads_added += 1
            
            # Add AdBanner at the end
            if pos == 158 and i == len(lines) - 1:
                new_lines.append(line)
                new_lines.append('\n')
                new_lines.append(ad_line + '\n')
                ads_added += 1
                continue
        
        new_lines.append(line)
    
    # If we didn't add the final AdBanner, add it now
    if ads_added < 3:
        # Remove trailing empty lines
        while new_lines and new_lines[-1].strip() == '':
            new_lines.pop()
        new_lines.append('\n')
        new_lines.append('<AdBanner />\n')
        ads_added += 1
    
    # Write the updated file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    
    print(f"\n{lang.upper()}: Added {ads_added} ad placements")
    total_updated += 1

print("\n" + "=" * 60)
print(f"✓ Total files updated: {total_updated}")
print("=" * 60)

