const express = require('express');
const path = require('path');
const app = express();

// www付きのアクセスをwwwなしにリダイレクト
app.use((req, res, next) => {
  if (req.headers.host.slice(0, 4) === 'www.') {
    const newHost = req.headers.host.slice(4);
    return res.redirect(301, req.protocol + '://' + newHost + req.originalUrl);
  }
  next();
});

// 静的ファイルのホスティング
app.use(express.static(path.join(__dirname)));

// ルートパスへのアクセスのみ静的ファイルを提供
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// その他のパスはルートにリダイレクト
app.get('*', (req, res) => {
  res.redirect(301, '/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
