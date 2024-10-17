const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'public');
const destDir = path.join(__dirname, 'dist');



if (!fs.existsSync(srcDir)) {
  console.error('Source directory does not exist:', srcDir);
  process.exit(1);
}

// The rest of your copy logic...


// Function to copy files and directories recursively
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    // Create the destination directory
    fs.mkdirSync(dest, { recursive: true });
    
    // Recursively copy the contents
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    // Copy file
    fs.copyFileSync(src, dest);
  }
}

console.log('Starting build...');
copyRecursiveSync(srcDir, destDir);
console.log('Build completed successfully.');
