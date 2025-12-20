#!/usr/bin/env python3
import os
import re
import glob

# Mapping of translated container types to English keywords
# These are VitePress syntax keywords and must remain in English
CONTAINER_FIXES = {
    # Warning variations
    'varning': 'warning',
    'warnung': 'warning',
    'advertencia': 'warning',
    'avertissement': 'warning',
    'avvertimento': 'warning',
    'waarschuwing': 'warning',
    'advarsel': 'warning',
    'aviso': 'warning',
    
    # Tip variations
    'tippa': 'tip',
    'tipp': 'tip',
    'consejo': 'tip',
    'conseil': 'tip',
    'suggerimento': 'tip',
    'råd': 'tip',
    'dica': 'tip',
    'tips': 'tip',
    
    # Details variations
    'detaljer': 'details',
    'einzelheiten': 'details',
    'detalles': 'details',
    'détails': 'details',
    'dettagli': 'details',
    'detalhes': 'details',
    
    # Danger variations
    'fara': 'danger',
    'gefahr': 'danger',
    'peligro': 'danger',
    'pericolo': 'danger',
    'gevaar': 'danger',
    'perigo': 'danger',
    
    # Info variations
    'information': 'info',
    'informatie': 'info',
    'informação': 'info',
}

def fix_container_line(line):
    """Fix translated container keywords back to English."""
    # Pattern: ::: translated_type Title
    match = re.match(r'^(\s*:::)\s+(\w+)(\s+.+)?$', line)
    if match:
        indent = match.group(1)
        container_type = match.group(2).lower()
        rest = match.group(3) if match.group(3) else ''
        
        # Check if this is a translated keyword that needs fixing
        if container_type in CONTAINER_FIXES:
            fixed_type = CONTAINER_FIXES[container_type]
            return f"{indent} {fixed_type}{rest}\n"
    
    return line

def fix_file(file_path):
    """Fix all container keywords in a file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    fixed_lines = []
    changes_made = 0
    
    for line in lines:
        original_line = line
        fixed_line = fix_container_line(line)
        
        if fixed_line != original_line:
            changes_made += 1
        
        fixed_lines.append(fixed_line)
    
    if changes_made > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(fixed_lines)
        return changes_made
    
    return 0

def main():
    # Get all markdown files in each language directory
    languages = ['da', 'de', 'es', 'fr', 'it', 'nl', 'no', 'pt', 'sv']
    
    print("=" * 60)
    print("Fixing VitePress Container Keywords in ALL Pages")
    print("=" * 60)
    
    total_changes = 0
    total_files = 0
    
    for lang in languages:
        print(f"\n{lang.upper()}:")
        lang_changes = 0
        lang_files = 0
        
        # Get all .md files in the language directory
        lang_dir = f'docs/{lang}'
        if os.path.exists(lang_dir):
            md_files = glob.glob(f'{lang_dir}/*.md')
            
            for file_path in sorted(md_files):
                filename = os.path.basename(file_path)
                changes = fix_file(file_path)
                
                if changes > 0:
                    print(f"  ✓ {filename}: {changes} containers fixed")
                    lang_changes += changes
                    lang_files += 1
                    total_changes += changes
                    total_files += 1
        
        if lang_changes == 0:
            print(f"  ✓ No fixes needed")
        else:
            print(f"  Total: {lang_files} files, {lang_changes} containers")
    
    print("\n" + "=" * 60)
    print(f"✓ Total: {total_files} files, {total_changes} containers fixed")
    print("=" * 60)

if __name__ == '__main__':
    main()

