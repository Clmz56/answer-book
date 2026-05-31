const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const CODES_FILE = path.join(__dirname, '..', 'codes.json');
const COUNT = parseInt(process.argv[2]) || 100;

// 读取现有码
let existing = {};
if (fs.existsSync(CODES_FILE)) {
  existing = JSON.parse(fs.readFileSync(CODES_FILE, 'utf-8'));
}

const newCodes = {};
for (let i = 0; i < COUNT; i++) {
  const code = crypto.randomBytes(3).toString('hex').toUpperCase();
  newCodes[code] = true;
}

Object.assign(existing, newCodes);
fs.writeFileSync(CODES_FILE, JSON.stringify(existing, null, 2), 'utf-8');

console.log(`✅ 已生成 ${COUNT} 个访问码，追加到 codes.json`);
console.log(`   总码数: ${Object.keys(existing).length}`);
console.log('');
console.log('新码列表:');
Object.keys(newCodes).forEach(c => console.log(`  ${c}`));
