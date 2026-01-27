const JavaScriptObfuscator = require("javascript-obfuscator");
const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "dist");

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

function obfuscateDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      obfuscateDirectory(filePath);
    } else if (file.endsWith(".js")) {
      try {
        console.log(`Obfuscating: ${filePath}`);

        const code = fs.readFileSync(filePath, "utf8");

        const obfuscatedCode = JavaScriptObfuscator.obfuscate(
          code,
          obfuscationOptions,
        ).getObfuscatedCode();

        const watermark = `/**
 * @copyright ${new Date().getFullYear()} HelperVia / Yaşar Demirtaş
 * @license UNLICENSED - Proprietary and Confidential
 * @build-id ${Date.now()}-${Math.random().toString(36).substring(7)}
 * Unauthorized copying, distribution, or use is strictly prohibited.
 */
`;

        fs.writeFileSync(filePath, watermark + obfuscatedCode, "utf8");

        console.log(`✓ Obfuscated: ${filePath}`);
      } catch (error) {
        console.error(`✗ Error obfuscating ${filePath}:`, error.message);
      }
    }
  });
}

console.log("Starting obfuscation...");
obfuscateDirectory(distDir);
console.log("Obfuscation complete!");
