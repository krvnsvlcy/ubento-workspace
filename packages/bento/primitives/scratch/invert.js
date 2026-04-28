const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/theme.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// The regex will look for blocks like:
// colorKey: {
//   100: "...",
//   200: "...",
//   300: "...",
//   400: "...",
//   500: "...",
//   contrast: "..."
// }

// A generic regex to match the pattern:
// We look for a block that has 100, 200, 300, 400, 500 lines in any order (but usually they are sequential).
// It's safer to parse it by matching the block inside `{ ... }` that contains `100:`, `200:`, `300:`, `400:`, `500:`
const blockRegex = /\{\s*100:\s*([^,\n]+),\s*200:\s*([^,\n]+),\s*300:\s*([^,\n]+),\s*400:\s*([^,\n]+),\s*500:\s*([^,\n]+),([^}]*)\}/g;

const invertedContent = content.replace(blockRegex, (match, val100, val200, val300, val400, val500, rest) => {
  return `{
      100: ${val500},
      200: ${val400},
      300: ${val300},
      400: ${val200},
      500: ${val100},${rest}}`;
});

fs.writeFileSync(filePath, invertedContent, 'utf-8');
console.log('Done replacing!');
