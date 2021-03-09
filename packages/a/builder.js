const { copyFileSync, existsSync, mkdirSync, rmdirSync } = require('fs');

const dir = 'dist/';

if (existsSync(dir)) {
    rmdirSync(dir, {recursive: true});
}
mkdirSync(dir);

copyFileSync('src/index.js', dir + 'index.js');