require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { initializeDatabase } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'data')));

const startServer = async () => {
  try {
    await initializeDatabase();

    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/grades', require('./routes/grades'));

    app.get('/api/health', (req, res) => {
      res.json({ status: 'ok', message: 'Grade Calculator API is running' });
    });

    app.use((req, res) => {
      res.status(404).json({ error: 'Route not found' });
    });

    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: 'Something went wrong!' });
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📚 API endpoints:`);
      console.log(`   POST   /api/auth/register    - Register new user`);
      console.log(`   POST   /api/auth/login       - Login user`);
      console.log(`   GET    /api/auth/profile     - Get user profile`);
      console.log(`   POST   /api/grades           - Save grade history`);
      console.log(`   GET    /api/grades/history   - Get grade history`);
      console.log(`   GET    /api/grades/stats     - Get grade statistics`);
      console.log(`   DELETE /api/grades/:id       - Delete grade history`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
