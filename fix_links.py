import os
import re

def fix_links(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.jsx') or file.endswith('.js'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                def replacer(match):
                    tag = match.group(0)
                    tag = re.sub(r'\s*target="_blank"\s*', ' ', tag)
                    tag = re.sub(r'\s*rel="noopener noreferrer"\s*', ' ', tag)
                    return tag

                new_content = re.sub(r'<Link[\s\S]*?>', replacer, content)
                
                if new_content != content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {path}")

fix_links('src')
