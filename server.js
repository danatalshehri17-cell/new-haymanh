// Root server.js for Render
console.log('🚀 Starting Haymanh API from root...');

try {
  require('./backend/dist/index.js');
} catch (error) {
  console.error('❌ Main server failed:', error.message);
  console.log('🔄 Starting simple fallback server...');
  
  const express = require('./backend/node_modules/express');
  const app = express();
  const PORT = process.env.PORT || 10000;
  
  // Enable CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });
  
  app.use(express.json());
  
  app.get('/', (req, res) => {
    res.json({ 
      message: 'Haymanh Success Initiative API - Simple Mode',
      status: 'running',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  });
  
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'success',
      message: 'Haymanh API is running in simple mode',
      timestamp: new Date().toISOString()
    });
  });
  
  // Basic API endpoints
  app.get('/api', (req, res) => {
    res.json({
      message: 'Haymanh API endpoints',
      endpoints: [
        'GET /',
        'GET /health',
        'GET /api'
      ]
    });
  });
  
  app.listen(PORT, () => {
    console.log(`✅ Simple Haymanh server running on port ${PORT}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  });
}
