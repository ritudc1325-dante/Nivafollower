import sys

with open('lib/main.dart', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = lines[:5212] + lines[5721:]

with open('lib/main.dart', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
