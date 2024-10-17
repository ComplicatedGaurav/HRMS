const fs = require('fs');
const path = require('path');

// Define the source and destination directories
const srcDir = path.join(__dirname, 'public');
const destDir = path.join(__dirname, 'dist');

// Check if the source directory exists
if (!fs.existsSync(srcDir)) {
  console.error('Source directory does not exist:', srcDir);
  process.exit(1);  // Exit the process with an error code if the directory is missing
}

// Function to copy files and directories recursively
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    // Create the destination directory if it doesn't exist
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    // Recursively copy each file or directory within the source directory
    fs.readdirSync(src).forEach(childItemName => {
      const srcPath = path.join(src, childItemName);
      const destPath = path.join(dest, childItemName);
      copyRecursiveSync(srcPath, destPath);
    });
  } else {
    // Copy file
    try {
      fs.copyFileSync(src, dest);
    } catch (err) {
      console.error(`Failed to copy file from ${src} to ${dest}:`, err);
      process.exit(1);
    }
  }
}

console.log('Starting build...');

// Start copying from the source to the destination
copyRecursiveSync(srcDir, destDir);

console.log('Build completed successfully.');
