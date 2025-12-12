#!/usr/bin/env python3
import os
import re

def extract_mermaid_blocks(file_path):
    """Extract all mermaid code blocks from a markdown file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all mermaid blocks
    pattern = r'```mermaid\n(.*?)```'
    blocks = re.findall(pattern, content, re.DOTALL)
    return blocks

def check_mermaid_syntax(mermaid_code, file_path):
    """Check for common Mermaid syntax issues."""
    issues = []
    lines = mermaid_code.strip().split('\n')
    
    # Check for empty blocks
    if not lines or all(line.strip() == '' for line in lines):
        issues.append("Empty mermaid block")
        return issues
    
    # Check first line for diagram type
    first_line = lines[0].strip()
    valid_types = ['graph', 'flowchart', 'sequenceDiagram', 'classDiagram', 'stateDiagram', 
                   'erDiagram', 'journey', 'gantt', 'pie', 'gitGraph', 'mindmap', 'timeline']
    
    if not any(first_line.startswith(t) for t in valid_types):
        issues.append(f"Invalid diagram type: '{first_line}'")
    
    # Check for common syntax errors
    for i, line in enumerate(lines, 1):
        line = line.strip()
        if not line or line.startswith('%%'):  # Skip empty lines and comments
            continue
        
        # Check for unmatched brackets
        if line.count('[') != line.count(']'):
            issues.append(f"Line {i}: Unmatched square brackets")
        if line.count('(') != line.count(')'):
            issues.append(f"Line {i}: Unmatched parentheses")
        if line.count('{') != line.count('}'):
            issues.append(f"Line {i}: Unmatched curly braces")
        
        # Check for invalid characters in node IDs (first word)
        if '-->' in line or '---' in line:
            parts = line.split()
            if parts and not parts[0].replace('_', '').replace('-', '').isalnum():
                if parts[0] not in ['style', 'class', 'click', 'linkStyle']:
                    issues.append(f"Line {i}: Invalid node ID '{parts[0]}'")
    
    return issues

def main():
    print("=" * 70)
    print("Checking Mermaid Diagram Syntax")
    print("=" * 70)
    
    files_with_mermaid = [
        'docs/en/ambition.md',
        'docs/en/food.md',
        'docs/en/workshop.md',
        'docs/en/education/index.md',
        'docs/en/education/the-zone/index.md',
        'docs/en/education/the-zone/technical-vs-flow.md',
        'docs/en/education/the-zone/entering-the-zone.md',
        'docs/en/education/mindfulness/index.md',
        'docs/en/education/mindfulness/techniques.md',
        'docs/en/education/mindfulness/daily-practice.md',
        'docs/en/education/goals/index.md',
        'docs/en/education/goals/smart-goals.md',
        'docs/en/education/goals/planning.md',
        'docs/en/education/mental-strength/index.md',
        'docs/en/education/mental-strength/handling-pressure.md',
        'docs/en/education/mental-strength/pre-shot-routine.md',
        'docs/en/education/team-player/index.md',
        'docs/en/education/team-player/communication.md',
        'docs/en/education/tactics/index.md',
        'docs/en/education/tactics/probability.md',
        'docs/en/education/training/index.md',
        'docs/en/education/training/drills.md',
        'docs/en/education/nutrition/index.md',
        'docs/en/technical/index.md',
        'docs/en/technical/throws.md',
        'docs/en/news/index.md',
        'docs/en/training-camp.md',
        'docs/en/training-session.md',
    ]
    
    total_blocks = 0
    total_issues = 0
    
    for file_path in files_with_mermaid:
        if not os.path.exists(file_path):
            continue
        
        blocks = extract_mermaid_blocks(file_path)
        if not blocks:
            continue
        
        print(f"\n📄 {file_path}")
        print(f"   Found {len(blocks)} mermaid block(s)")
        
        for i, block in enumerate(blocks, 1):
            total_blocks += 1
            issues = check_mermaid_syntax(block, file_path)
            
            if issues:
                print(f"\n   ⚠️  Block #{i} has issues:")
                for issue in issues:
                    print(f"      - {issue}")
                    total_issues += 1
                
                # Show first few lines of the problematic block
                lines = block.strip().split('\n')[:3]
                print(f"      Preview:")
                for line in lines:
                    print(f"        {line}")
            else:
                print(f"   ✓ Block #{i} looks OK")
    
    print("\n" + "=" * 70)
    print(f"Summary: Checked {total_blocks} mermaid blocks")
    if total_issues > 0:
        print(f"⚠️  Found {total_issues} potential issues")
    else:
        print("✓ No obvious syntax issues found")
    print("=" * 70)

if __name__ == '__main__':
    main()

