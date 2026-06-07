import sys

with open('lib/main.dart', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'class AccountsPopup extends StatefulWidget {' in line:
        lines.insert(i, '}\n')
        break

with open('lib/main.dart', 'w', encoding='utf-8') as f:
    f.writelines(lines)
