#!/usr/bin/env python3
import os
import re

# All languages except English (already fixed)
languages = ['da', 'de', 'es', 'fr', 'it', 'nl', 'no', 'pt', 'sv']

print("=" * 70)
print("Fixing Duplicate Progress Tracking Sheet Section")
print("=" * 70)

total_fixed = 0

for lang in languages:
    file_path = f'docs/{lang}/goal-template.md'
    
    if not os.path.exists(file_path):
        print(f"\n{lang.upper()}: File not found, skipping")
        continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the last occurrence of "Progress Tracking Sheet" header
    # and remove it along with the incomplete content after it
    lines = content.split('\n')
    
    # Find all occurrences of Progress Tracking Sheet headers
    progress_indices = []
    for i, line in enumerate(lines):
        # Match various translations of "Progress Tracking Sheet"
        if re.match(r'^##\s+(Progress Tracking|Framstegsuppföljning|Fortschritts|Seguimiento|Suivi|Monitoraggio|Voortgang|Fremgang|Acompanhamento)', line, re.IGNORECASE):
            progress_indices.append(i)
    
    if len(progress_indices) > 1:
        # Remove from the second occurrence to the end
        # But keep the final "---" if it exists
        second_index = progress_indices[1]
        
        # Find the previous "---" before the duplicate
        prev_separator = second_index - 1
        while prev_separator > 0 and lines[prev_separator].strip() != '---':
            prev_separator -= 1
        
        # Keep everything up to and including the separator before the duplicate
        new_lines = lines[:prev_separator + 1]
        
        new_content = '\n'.join(new_lines)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✓ {lang.upper()}: Removed duplicate section")
        total_fixed += 1
    else:
        print(f"  {lang.upper()}: No duplicate found")

print("\n" + "=" * 70)
print(f"✓ Total files fixed: {total_fixed}")
print("=" * 70)

