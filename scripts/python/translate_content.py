#!/usr/bin/env python3
"""
Translation helper script for Pétanque Academy documentation.
This script will help organize the translation work.
"""

import os
from pathlib import Path

# Files to translate
FILES = [
    'education/the-zone/entering-the-zone.md',
    'education/mindfulness/techniques.md',
    'education/mindfulness/daily-practice.md',
    'education/mental-strength/handling-pressure.md',
    'education/mental-strength/pre-shot-routine.md',
    'education/nutrition/index.md',
    'education/goals/smart-goals.md',
    'education/goals/planning.md',
    'education/team-player/index.md',
    'education/team-player/communication.md',
    'education/tactics/probability.md',
    'education/training/index.md',
    'education/training/drills.md',
    'ambition.md',
    'food.md',
    'news/index.md',
    'workshop.md',
    'technical/index.md',
    'technical/throws.md'
]

# Languages
LANGUAGES = {
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

def main():
    docs_dir = Path('docs')
    
    print("Translation Status:")
    print("=" * 60)
    
    for file_path in FILES:
        print(f"\n{file_path}:")
        en_file = docs_dir / 'en' / file_path
        
        if not en_file.exists():
            print(f"  ⚠️  English source missing!")
            continue
            
        for lang_code, lang_name in LANGUAGES.items():
            target_file = docs_dir / lang_code / file_path
            if target_file.exists():
                print(f"  ✓ {lang_code} ({lang_name})")
            else:
                print(f"  ✗ {lang_code} ({lang_name}) - MISSING")

if __name__ == '__main__':
    main()

