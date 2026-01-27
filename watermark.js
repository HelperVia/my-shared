const fs = require("fs");
const path = require("path");

// Directory to add watermarks
const distDir = path.join(__dirname, "dist");

// Generate watermark
function generateWatermark() {
  return `/**
 * @copyright ${new Date().getFullYear()} HelperVia / Yaşar Demirtaş
 * @license UNLICENSED - Proprietary and Confidential
 * @build-id ${Date.now()}-${Math.random().toString(36).substring(7)}
 * Unauthorized copying, distribution, or use is strictly prohibited.
 */

`;
}

// Add watermark to all .js files
function addWatermarks(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Process subdirectories recursively
      addWatermarks(filePath);
    } else if (file.endsWith(".js")) {
      try {
        // Read file
        const code = fs.readFileSync(filePath, "utf8");

        // Check if watermark already exists
        if (code.includes("@copyright") || code.includes("@license")) {
          console.log(` Skipping (already has watermark): ${filePath}`);
          return;
        }

        // Add watermark at the beginning
        const watermarkedCode = generateWatermark() + code;

        // Write file
        fs.writeFileSync(filePath, watermarkedCode, "utf8");
      } catch (error) {
        console.error(` Error adding watermark to ${filePath}:`, error.message);
      }
    }
  });
}

// Start
console.log("Adding watermarks to all files...");
addWatermarks(distDir);
console.log("Watermarking complete!");
