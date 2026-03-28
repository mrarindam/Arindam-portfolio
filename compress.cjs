const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directories = [
  path.join(__dirname, 'src', 'media'),
  path.join(__dirname, 'public')
];

async function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (/\.(png|jpg|jpeg)$/i.test(fullPath)) {
      const parsedPath = path.parse(fullPath);
      // Skip if filename exactly matches 'hero.png' or 'profile.png' and we don't want to break hardcoded path mappings instantly without updating, but actually we WILL update them all. 
      const webpPath = path.join(parsedPath.dir, `${parsedPath.name}.webp`);
      
      try {
        await sharp(fullPath)
          .webp({ quality: 80, effort: 6 })
          .toFile(webpPath);
        
        console.log(`Converted: ${file} -> ${parsedPath.name}.webp`);
        fs.unlinkSync(fullPath); // Delete the original file
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
}

async function main() {
  console.log('Starting image compression to WebP...');
  for (const dir of directories) {
    await processDirectory(dir);
  }
  console.log('Finished image compression.');
}

main();
