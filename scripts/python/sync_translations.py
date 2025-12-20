#!/usr/bin/env python3
"""
Script to sync enhanced English content to all other language folders.
Translates key phrases while preserving Mermaid diagrams and structure.
"""

import os
import re
from pathlib import Path

# Language codes
LANGUAGES = ['da', 'de', 'es', 'fr', 'it', 'nl', 'no', 'pt', 'sv']

# Translation dictionary for common phrases
TRANSLATIONS = {
    'The Big Idea': {
        'da': 'Den Store Idé',
        'de': 'Die Große Idee',
        'es': 'La Gran Idea',
        'fr': 'La Grande Idée',
        'it': 'La Grande Idea',
        'nl': 'Het Grote Idee',
        'no': 'Den Store Ideen',
        'pt': 'A Grande Ideia',
        'sv': 'Den Stora Idén'
    },
    'Key Insight': {
        'da': 'Nøgleindsigt',
        'de': 'Wichtige Erkenntnis',
        'es': 'Perspectiva Clave',
        'fr': 'Idée Clé',
        'it': 'Intuizione Chiave',
        'nl': 'Belangrijk Inzicht',
        'no': 'Nøkkelinnsikt',
        'pt': 'Insight Chave',
        'sv': 'Nyckelinsikt'
    },
    'Common Mistake': {
        'da': 'Almindelig Fejl',
        'de': 'Häufiger Fehler',
        'es': 'Error Común',
        'fr': 'Erreur Courante',
        'it': 'Errore Comune',
        'nl': 'Veelgemaakte Fout',
        'no': 'Vanlig Feil',
        'pt': 'Erro Comum',
        'sv': 'Vanligt Misstag'
    },
    'Remember': {
        'da': 'Husk',
        'de': 'Denken Sie daran',
        'es': 'Recuerda',
        'fr': 'Rappel',
        'it': 'Ricorda',
        'nl': 'Onthoud',
        'no': 'Husk',
        'pt': 'Lembre-se',
        'sv': 'Kom ihåg'
    }
}

# Files that were enhanced
ENHANCED_FILES = [
    'education/the-zone/entering-the-zone.md',
    'education/mindfulness/techniques.md',
    'education/mental-strength/handling-pressure.md',
    'education/nutrition/index.md',
    'ambition.md',
    'food.md',
    'news/index.md',
    'technical/index.md',
    'technical/throws.md',
    'workshop.md',
    'education/mindfulness/daily-practice.md',
    'education/goals/smart-goals.md',
    'education/goals/planning.md',
    'education/mental-strength/pre-shot-routine.md',
    'education/team-player/index.md',
    'education/team-player/communication.md',
    'education/tactics/probability.md',
    'education/training/index.md',
    'education/training/drills.md'
]

def read_file(filepath):
    """Read file content."""
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filepath, content):
    """Write content to file."""
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    """Main sync function."""
    docs_dir = Path('docs')
    
    for file_path in ENHANCED_FILES:
        en_file = docs_dir / 'en' / file_path
        if not en_file.exists():
            print(f"Warning: {en_file} does not exist")
            continue
            
        print(f"\nProcessing: {file_path}")
        en_content = read_file(en_file)
        
        for lang in LANGUAGES:
            target_file = docs_dir / lang / file_path
            print(f"  -> {lang}")
            
            # For now, just copy the English content
            # Manual translation will be needed for text content
            # but Mermaid diagrams can stay the same
            write_file(target_file, en_content)

if __name__ == '__main__':
    main()

