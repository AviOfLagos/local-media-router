#!/usr/bin/env node

const net = require('net');

// Create a server to occupy port 8000
const testServer = net.createServer();
testServer.listen(8000, () => {
  console.log('🔧 Test server occupying port 8000');
  console.log('Now run "npm run dev" in another terminal to test port auto-increment');
  console.log('Press Ctrl+C to stop this test server');
});

process.on('SIGINT', () => {
  console.log('\n🛑 Stopping test server...');
  testServer.close();
  process.exit(0);
});