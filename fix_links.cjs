const fs = require('fs');
const path = require('path');

function fixLinks(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            fixLinks(fullPath);
        } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let newContent = content.replace(/<Link[\s\S]*?>/g, (match) => {
                let tag = match.replace(/\s*target="_blank"\s*/g, ' ');
                tag = tag.replace(/\s*rel="noopener noreferrer"\s*/g, ' ');
                return tag;
            });
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log('Updated ' + fullPath);
            }
        }
    }
}

fixLinks(path.join(__dirname, 'src'));
