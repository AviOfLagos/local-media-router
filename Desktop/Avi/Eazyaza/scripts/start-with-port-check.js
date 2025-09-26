#!/usr/bin/env node

const { exec, spawn } = require('child_process');
const net = require('net');

// Function to check if a port is available
function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.once('close', () => resolve(true));
      server.close();
    });
    server.on('error', () => resolve(false));
  });
}

// Function to find the next available port
async function findAvailablePort(startPort) {
  let port = startPort;
  while (port < startPort + 20) { // Check up to 20 ports ahead
    if (await isPortFree(port)) {
      return port;
    }
    port++;
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServers() {
  try {
    console.log('🔍 Checking port availability...');

    // Find available ports
    const backendPort = await findAvailablePort(9000);
    const frontendPort = await findAvailablePort(8000);

    console.log('🚀 EazyAza Platform Startup');
    console.log('');
    console.log(`🏪 Backend will start on: http://localhost:${backendPort}`);
    console.log(`🌐 Storefront will start on: http://localhost:${frontendPort}`);
    console.log(`📊 Admin Dashboard: http://localhost:${backendPort}/app`);
    console.log('');
    console.log('🏢 Demo Tenant Stores:');
    console.log(`   • ACME Store: http://acme-store.localhost:${frontendPort}`);
    console.log(`   • Fashion Hub: http://fashion-hub.localhost:${frontendPort}`);
    console.log(`   • Naija Market: http://naija-market.localhost:${frontendPort}`);
    console.log(`   • Tech World: http://tech-world.localhost:${frontendPort}`);
    console.log('');

    if (backendPort !== 9000 || frontendPort !== 8000) {
      console.log('⚠️  Default ports were occupied, using alternative ports');
      console.log('');
    }

    console.log('Press Ctrl+C to stop both servers');
    console.log('============================================');
    console.log('');

    // Start backend
    const backendEnv = { ...process.env, PORT: backendPort };
    const backend = spawn('npm', ['run', 'dev'], {
      cwd: './eazyaza-platform',
      stdio: ['inherit', 'pipe', 'pipe'],
      env: backendEnv
    });

    // Start frontend
    const frontendEnv = { ...process.env, PORT: frontendPort };
    const frontend = spawn('npm', ['run', 'dev', '--', '-p', frontendPort], {
      cwd: './eazyaza-platform-storefront',
      stdio: ['inherit', 'pipe', 'pipe'],
      env: frontendEnv
    });

    // Prefix output
    backend.stdout.on('data', (data) => {
      process.stdout.write(`[BACKEND] ${data}`);
    });

    backend.stderr.on('data', (data) => {
      process.stderr.write(`[BACKEND] ${data}`);
    });

    frontend.stdout.on('data', (data) => {
      process.stdout.write(`[FRONTEND] ${data}`);
    });

    frontend.stderr.on('data', (data) => {
      process.stderr.write(`[FRONTEND] ${data}`);
    });

    // Handle process termination
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down servers...');
      backend.kill('SIGTERM');
      frontend.kill('SIGTERM');
      process.exit(0);
    });

    // Handle child process exits
    backend.on('exit', (code) => {
      if (code !== 0) {
        console.log(`\n❌ Backend exited with code ${code}`);
        frontend.kill('SIGTERM');
        process.exit(code);
      }
    });

    frontend.on('exit', (code) => {
      if (code !== 0) {
        console.log(`\n❌ Frontend exited with code ${code}`);
        backend.kill('SIGTERM');
        process.exit(code);
      }
    });

  } catch (error) {
    console.error('❌ Error starting servers:', error.message);
    process.exit(1);
  }
}

startServers();