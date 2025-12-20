#!/usr/bin/env python3
import os
import re

files_to_fix = [
    'docs/fr/education/the-zone/entering-the-zone.md',
    'docs/de/education/the-zone/entering-the-zone.md',
    'docs/es/education/the-zone/entering-the-zone.md',
    'docs/es/education/goals/index.md',
    'docs/sv/education/the-zone/entering-the-zone.md',
    'docs/sv/education/goals/index.md',
    'docs/da/education/the-zone/entering-the-zone.md',
    'docs/da/education/goals/index.md',
    'docs/no/education/the-zone/entering-the-zone.md',
    'docs/no/education/goals/index.md',
    'docs/it/education/the-zone/entering-the-zone.md',
    'docs/it/education/goals/index.md',
    'docs/nl/education/the-zone/entering-the-zone.md',
    'docs/pt/education/the-zone/entering-the-zone.md',
    'docs/pt/education/goals/index.md',
]

print("=" * 70)
print("Fixing Mermaid Quote Issues")
print("=" * 70)

total_fixed = 0

for file_path in files_to_fix:
    if not os.path.exists(file_path):
        print(f"\n{file_path}: File not found, skipping")
        continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Fix 1: Replace &quot; with regular quotes in mermaid blocks
    # This regex finds mermaid blocks and replaces &quot; with "
    def fix_mermaid_block(match):
        mermaid_content = match.group(1)
        # Replace HTML entities with regular quotes
        fixed_content = mermaid_content.replace('&quot;', '"')
        # Fix malformed br tags with quotes: " <br/> text" -> "<br/>text"
        fixed_content = re.sub(r'"\s*<br/>\s*([^"]+)"', r'<br/>\1"', fixed_content)
        # Fix: "text" <br/> more" -> "text<br/>more"
        fixed_content = re.sub(r'(["\]])\s*<br/>\s*([^"<\]]+)"', r'\1<br/>\2"', fixed_content)
        return f'```mermaid\n{fixed_content}```'
    
    content = re.sub(r'```mermaid\n(.*?)```', fix_mermaid_block, content, flags=re.DOTALL)
    
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✓ {file_path}")
        total_fixed += 1
    else:
        print(f"  {file_path}: No changes needed")

print("\n" + "=" * 70)
print(f"✓ Total files fixed: {total_fixed}")
print("=" * 70)

