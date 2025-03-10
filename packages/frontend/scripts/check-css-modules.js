const fs = require('fs');
const path = require('path');
const glob = require('glob');

function checkCSSModules() {
  const tsxFiles = glob.sync('src/**/*.tsx');
  let hasErrors = false;

  tsxFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const cssImports = content.match(/import\s+.*\s+from\s+['"](.+\.module\.css)['"]/g) || [];

    cssImports.forEach(importStatement => {
      const match = importStatement.match(/from\s+['"](.+\.module\.css)['"]/);
      if (match) {
        const cssPath = match[1];
        const absolutePath = path.resolve(path.dirname(file), cssPath);

        if (!fs.existsSync(absolutePath)) {
          console.error(`Error: CSS module file not found: ${cssPath} (imported in ${file})`);
          hasErrors = true;
        }
      }
    });
  });

  if (hasErrors) {
    process.exit(1);
  }
}

checkCSSModules(); 