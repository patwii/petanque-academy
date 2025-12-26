#!/usr/bin/env python3
"""
Find all translated URL parts in internal links across all language versions.
URLs should use English path segments, not translated ones.
"""

import os
import re
from pathlib import Path
from collections import defaultdict

# Valid English path segments that should be used in URLs
VALID_SEGMENTS = {
    'education', 'technical', 'blog', 'news', 'mental-journey',
    'the-zone', 'mindfulness', 'goals', 'mental-strength', 'team-player',
    'tactics', 'training', 'throws', 'materials', 'session-guide'
}

# Language codes (excluding English)
LANGUAGES = ['sv', 'da', 'no', 'de', 'es', 'fr', 'it', 'nl', 'pt']

def find_internal_links(file_path):
    """Extract all internal links from a markdown file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to match markdown links: [text](url)
    pattern = r'\[([^\]]+)\]\((/[a-z]{2}/[^)]+)\)'
    matches = re.findall(pattern, content)
    return matches

def check_link(link_url, file_path):
    """Check if a link contains translated URL segments."""
    # Extract path segments
    parts = link_url.split('/')
    
    # Skip language code (index 1) and check other segments
    issues = []
    for i, part in enumerate(parts):
        if i <= 1:  # Skip empty string and language code
            continue
        
        # Remove anchors and query strings
        clean_part = part.split('#')[0].split('?')[0]
        
        if not clean_part:
            continue
            
        # Check if this segment is NOT in valid English segments
        # and contains non-English characters or known translations
        if clean_part not in VALID_SEGMENTS:
            # Check for common translated words
            translated_words = [
                'utbildning', 'tekniska', 'teknisk', 'teknik', 'kast',
                'educación', 'técnico', 'lanzamientos', 'tiro',
                'éducation', 'technique', 'lancers',
                'bildung', 'technisch', 'würfe',
                'uddannelse', 'teknisk', 'kast',
                'opplæring', 'teknisk', 'kast',
                'educazione', 'tecnico', 'lanci',
                'opleiding', 'technisch', 'worpen',
                'educação', 'técnico', 'arremessos',
                'zonen', 'zona', 'zone', 'sone',
                'mentale', 'mental', 'mentaal',
                'styrke', 'styrka', 'forza', 'kracht', 'força',
                'mål', 'objetivos', 'objectifs', 'ziele', 'obiettivi', 'doelen', 'objetivos',
                'taktikk', 'taktik', 'táctica', 'tactique', 'tattica', 'tactiek', 'tática',
                'trening', 'träning', 'entrenamiento', 'entraînement', 'allenamento', 'oefening', 'treinamento'
            ]
            
            if clean_part.lower() in translated_words:
                issues.append(clean_part)
    
    return issues

def main():
    docs_dir = Path('docs')
    all_issues = defaultdict(list)
    
    for lang in LANGUAGES:
        lang_dir = docs_dir / lang
        if not lang_dir.exists():
            continue
        
        # Find all markdown files
        for md_file in lang_dir.rglob('*.md'):
            links = find_internal_links(md_file)
            
            for link_text, link_url in links:
                issues = check_link(link_url, md_file)
                if issues:
                    rel_path = md_file.relative_to(docs_dir)
                    all_issues[str(rel_path)].append({
                        'text': link_text,
                        'url': link_url,
                        'issues': issues
                    })
    
    # Print results
    if all_issues:
        print("Found translated URL segments in the following files:\n")
        for file_path, links in sorted(all_issues.items()):
            print(f"\n{file_path}:")
            for link in links:
                print(f"  [{link['text']}]({link['url']})")
                print(f"    Translated segments: {', '.join(link['issues'])}")
    else:
        print("No translated URL segments found!")

if __name__ == '__main__':
    main()

