const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// ルートエンドポイント
app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Dokku deployed API!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// サンプルAPIエンドポイント
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/users', (req, res) => {
  const sampleUsers = [
    { id: 1, name: '田中太郎', email: 'tanaka@example.com' },
    { id: 2, name: '佐藤花子', email: 'sato@example.com' },
    { id: 3, name: '山田次郎', email: 'yamada@example.com' }
  ];
  res.json(sampleUsers);
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  const newUser = {
    id: Date.now(),
    name,
    email,
    created_at: new Date().toISOString()
  };
  
  res.status(201).json(newUser);
});

// 404ハンドラー
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});