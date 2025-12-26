#!/usr/bin/env python3
"""
Fix all translated URL parts in internal links across all language versions.
URLs should use English path segments, not translated ones.
"""

import os
import re
from pathlib import Path

# Mapping of translated URL segments to their English equivalents
URL_TRANSLATIONS = {
    # Swedish
    'utbildning': 'education',
    'tekniska': 'technical',
    'teknisk': 'technical',
    'teknik': 'technical',
    'zonen': 'the-zone',
    'mål': 'goals',
    'mental-styrka': 'mental-strength',
    'lagspelare': 'team-player',
    'taktik': 'tactics',
    'träning': 'training',
    'näring': 'nutrition',
    
    # Danish
    'uddannelse': 'education',
    'holdspiller': 'team-player',
    'ernæring': 'nutrition',
    
    # Norwegian
    'opplæring': 'training',
    'trening': 'training',
    'taktikk': 'tactics',
    
    # German
    'bildung': 'education',
    'ziele': 'goals',
    
    # Spanish
    'educación': 'education',
    'educacion': 'education',
    'técnico': 'technical',
    'tecnico': 'technical',
    'lanzamientos': 'throws',
    'objetivos': 'goals',
    'formación': 'training',
    'entrenamiento': 'training',
    'tácticas': 'tactics',
    'metas': 'goals',
    
    # French
    'éducation': 'education',
    'technique': 'technical',
    'lancers': 'throws',
    'objectifs': 'goals',
    'entraînement': 'training',
    'tactiques': 'tactics',
    
    # Italian
    'educazione': 'education',
    'istruzione': 'education',
    'tecnico': 'technical',
    'lanci': 'throws',
    'obiettivi': 'goals',
    'formazione': 'training',
    'allenamento': 'training',
    'tattiche': 'tactics',
    'nutrizione': 'nutrition',
    'forza-mentale': 'mental-strength',
    'la-zona': 'the-zone',
    'consapevolezza': 'mindfulness',
    
    # Dutch
    'onderwijs': 'education',
    'opleiding': 'education',
    'technisch': 'technical',
    'worpen': 'throws',
    'doelen': 'goals',
    'oefening': 'training',
    'tactieken': 'tactics',
    'voeding': 'nutrition',
    
    # Portuguese
    'educação': 'education',
    'técnico': 'technical',
    'arremessos': 'throws',
    'objetivos': 'goals',
    'treinamento': 'training',
    'táticas': 'tactics',
    'nutrição': 'nutrition',
}

# Additional specific translations for compound paths
SPECIFIC_TRANSLATIONS = {
    'atención plena': 'mindfulness',
    'atención': 'mindfulness',
    'jugador-de-equipo': 'team-player',
}

def fix_url(url):
    """Fix translated segments in a URL."""
    parts = url.split('/')
    fixed_parts = []
    
    for part in parts:
        # Remove anchors and query strings for checking
        clean_part = part.split('#')[0].split('?')[0]
        anchor = '#' + part.split('#')[1] if '#' in part else ''
        
        # Check if this part needs translation
        if clean_part.lower() in URL_TRANSLATIONS:
            fixed_parts.append(URL_TRANSLATIONS[clean_part.lower()] + anchor)
        elif clean_part in SPECIFIC_TRANSLATIONS:
            fixed_parts.append(SPECIFIC_TRANSLATIONS[clean_part] + anchor)
        else:
            fixed_parts.append(part)
    
    return '/'.join(fixed_parts)

def fix_file(file_path):
    """Fix all links in a markdown file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Pattern to match markdown links: [text](url)
    def replace_link(match):
        text = match.group(1)
        url = match.group(2)
        fixed_url = fix_url(url)
        return f'[{text}]({fixed_url})'
    
    pattern = r'\[([^\]]+)\]\((/[a-z]{2}/[^)]+)\)'
    content = re.sub(pattern, replace_link, content)
    
    # Only write if content changed
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    docs_dir = Path('docs')
    languages = ['sv', 'da', 'no', 'de', 'es', 'fr', 'it', 'nl', 'pt']
    
    fixed_count = 0
    
    for lang in languages:
        lang_dir = docs_dir / lang
        if not lang_dir.exists():
            continue
        
        # Find all markdown files
        for md_file in lang_dir.rglob('*.md'):
            if fix_file(md_file):
                fixed_count += 1
                print(f"Fixed: {md_file.relative_to(docs_dir)}")
    
    print(f"\nTotal files fixed: {fixed_count}")

if __name__ == '__main__':
    main()

