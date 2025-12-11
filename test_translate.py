#!/usr/bin/env python3
"""Test translation on a single file"""

from pathlib import Path
import sys

# Import the translation function
sys.path.insert(0, '.')
from translate_smart import translate_file

# Test on ambition.md for Swedish
source = Path('docs/en/ambition.md')
target = Path('docs/sv/ambition.md')

print("Testing translation on ambition.md -> Swedish")
print("=" * 60)

# First copy English version
import shutil
shutil.copy(source, target)

# Then translate
translate_file(source, target, 'sv')

print("\n✅ Translation complete!")
print("\nFirst 50 lines of result:")
print("=" * 60)

with open(target, 'r') as f:
    lines = f.readlines()
    for i, line in enumerate(lines[:50], 1):
        print(f"{i:3}: {line}", end='')

