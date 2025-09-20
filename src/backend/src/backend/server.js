// Simple server entry point for Render
console.log('🚀 Starting Haymanh API...');

try {
  // Load the actual server from backend directory
  require('../../../../backend/dist/index.js');
} catch (error) {
  console.error('❌ Server startup failed:', error.message);
  
  // If main server fails, try simple fallback
  const express = require('../../../../backend/node_modules/express');
  const app = express();
  const PORT = process.env.PORT || 10000;
  
  app.get('/', (req, res) => {
    res.json({ 
      message: 'Haymanh API - Simple Mode',
      status: 'running',
      timestamp: new Date().toISOString()
    });
  });
  
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'ok',
      message: 'Server is running in simple mode'
    });
  });
  
  app.listen(PORT, () => {
    console.log(`🚀 Simple server running on port ${PORT}`);
  });
}
