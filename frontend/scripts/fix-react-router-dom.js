const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'node_modules', 'react-router-dom', 'dist');
const indexJsPath = path.join(distDir, 'index.js');
const indexMjsPath = path.join(distDir, 'index.mjs');

try {
  if (!fs.existsSync(distDir)) {
    process.exit(0);
  }

  if (!fs.existsSync(indexJsPath)) {
    process.exit(0);
  }

  if (!fs.existsSync(indexMjsPath)) {
    fs.copyFileSync(indexJsPath, indexMjsPath);
    console.log('Created react-router-dom/dist/index.mjs fallback for source-map-loader.');
  }
} catch (error) {
  console.warn('Unable to apply react-router-dom fallback patch:', error.message);
}
