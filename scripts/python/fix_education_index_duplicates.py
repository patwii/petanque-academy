#!/usr/bin/env python3
import os

# All languages except English and Swedish (already fixed)
languages = ['da', 'de', 'es', 'fr', 'it', 'nl', 'no', 'pt']

print("=" * 60)
print("Fixing Duplicate Headers in Education Index Pages")
print("=" * 60)

total_fixed = 0

for lang in languages:
    file_path = f'docs/{lang}/education/index.md'
    
    if not os.path.exists(file_path):
        continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Check if there's a duplicate header pattern
    # Line 1: # Header
    # Line 2: <AdBanner />
    # Line 3: blank
    # Line 4: # Header (duplicate)
    if (len(lines) >= 4 and 
        lines[0].startswith('#') and 
        '<AdBanner />' in lines[1] and
        lines[3].startswith('#')):
        
        # Remove the duplicate header (line 4) and the blank line before it
        new_lines = lines[:2] + lines[4:]
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        
        print(f"{lang.upper()}: Fixed duplicate header")
        total_fixed += 1
    else:
        print(f"{lang.upper()}: No duplicate found")

print("\n" + "=" * 60)
print(f"✓ Total files fixed: {total_fixed}")
print("=" * 60)

