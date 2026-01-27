const JavaScriptObfuscator = require("javascript-obfuscator");
const fs = require("fs");
const path = require("path");

// Directory to obfuscate
const distDir = path.join(__dirname, "dist");

// Obfuscation configuration
const obfuscationOptions = {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.75,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.4,
  debugProtection: false,
  debugProtectionInterval: 0,
  disableConsoleOutput: false,
  identifierNamesGenerator: "hexadecimal",
  log: false,
  numbersToExpressions: true,
  renameGlobals: false,
  selfDefending: true,
  simplify: true,
  splitStrings: true,
  splitStringsChunkLength: 10,
  stringArray: true,
  stringArrayCallsTransform: true,
  stringArrayEncoding: ["base64"],
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 2,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 4,
  stringArrayWrappersType: "function",
  stringArrayThreshold: 0.75,
  transformObjectKeys: true,
  unicodeEscapeSequence: false,
};

// Files to exclude from obfuscation (server-side files with directives)
const SKIP_FILES = [
  "api.server.js", // Server-side API functions
  "logout.js", // Contains "use server" directive
  "auth.js", // May contain server directives
  "cookie.js", // Server-side cookie operations
  "loopDetector.js", // Middleware file
];

// Find and obfuscate all .js files
function obfuscateDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Process subdirectories recursively
      obfuscateDirectory(filePath);
    } else if (file.endsWith(".js")) {
      // Check if file should be skipped
      if (SKIP_FILES.includes(file)) {
        console.log(`⊘ Skipping (server file): ${filePath}`);
        return;
      }
      try {
        console.log(`Obfuscating: ${filePath}`);

        // Read file
        const code = fs.readFileSync(filePath, "utf8");

        // Obfuscate
        const obfuscatedCode = JavaScriptObfuscator.obfuscate(
          code,
          obfuscationOptions,
        ).getObfuscatedCode();

        // Add watermark
        const watermark = `/**
 * @copyright ${new Date().getFullYear()} HelperVia / Yaşar Demirtaş
 * @license UNLICENSED - Proprietary and Confidential
 * @build-id ${Date.now()}-${Math.random().toString(36).substring(7)}
 * Unauthorized copying, distribution, or use is strictly prohibited.
 */
`;

        // Write file
        fs.writeFileSync(filePath, watermark + obfuscatedCode, "utf8");

        console.log(`✓ Obfuscated: ${filePath}`);
      } catch (error) {
        console.error(`✗ Error obfuscating ${filePath}:`, error.message);
      }
    }
  });
}

// Start obfuscation
console.log("Starting obfuscation...");
obfuscateDirectory(distDir);
console.log("Obfuscation complete!");
