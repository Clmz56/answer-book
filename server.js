const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const CODES_FILE = path.join(__dirname, 'codes.json');

// 读取访问码（服务器上只读，不写）
let codesCache = null;
function readCodes() {
  if (!codesCache) {
    const raw = fs.readFileSync(CODES_FILE, 'utf-8');
    codesCache = JSON.parse(raw);
  }
  return codesCache;
}

// 静态文件
app.use(express.static(path.join(__dirname, 'public')));

// API: 验证访问码
app.get('/api/verify', (req, res) => {
  const code = (req.query.code || '').trim().toUpperCase();
  if (!code) {
    return res.json({ valid: false, message: '请输入访问码' });
  }
  const codes = readCodes();
  if (codes[code]) {
    return res.json({ valid: true });
  }
  return res.json({ valid: false, message: '访问码无效' });
});

// 根路径 -> 主页面
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`答案之书服务器已启动: http://localhost:${PORT}`);
});
