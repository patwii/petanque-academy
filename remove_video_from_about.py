#!/usr/bin/env python3
import os
import re

# All languages except English (already fixed)
languages = ['da', 'de', 'es', 'fr', 'it', 'nl', 'no', 'pt', 'sv']

# Patterns to match "Video demonstrations?" in different languages
video_patterns = [
    r'^\s*-\s+Video.*\??\s*$',  # Generic pattern
    r'^\s*-\s+Videodemonstrat.*\??\s*$',  # Swedish, Danish, Norwegian
    r'^\s*-\s+Vidéo.*\??\s*$',  # French
    r'^\s*-\s+Demostraciones.*video.*\??\s*$',  # Spanish
    r'^\s*-\s+Demonstrações.*vídeo.*\??\s*$',  # Portuguese
    r'^\s*-\s+Dimostrazioni.*video.*\??\s*$',  # Italian
    r'^\s*-\s+Videodemonstraties.*\??\s*$',  # Dutch
]

print("=" * 60)
print("Removing Video Demonstrations from About Pages")
print("=" * 60)

total_updated = 0

for lang in languages:
    file_path = f'docs/{lang}/about.md'
    
    if not os.path.exists(file_path):
        print(f"\n{lang.upper()}: File not found, skipping")
        continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    new_lines = []
    removed = False
    
    for line in lines:
        # Check if this line matches any video pattern
        is_video_line = False
        for pattern in video_patterns:
            if re.match(pattern, line, re.IGNORECASE):
                is_video_line = True
                removed = True
                break
        
        # Keep the line if it's not a video line
        if not is_video_line:
            new_lines.append(line)
    
    if removed:
        # Write the updated file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        
        print(f"{lang.upper()}: Removed video demonstrations line")
        total_updated += 1
    else:
        print(f"{lang.upper()}: No video line found")

print("\n" + "=" * 60)
print(f"✓ Total files updated: {total_updated}")
print("=" * 60)

