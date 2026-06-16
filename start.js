const { spawn } = require('child_process');
const path = require('path');

const appDir = path.join(__dirname, 'app');
const viteBin = path.join(appDir, 'node_modules', '.bin', 'vite.cmd');

console.log('Starting Vite dev server...');
console.log('App dir:', appDir);
console.log('Vite bin:', viteBin);

const child = spawn(viteBin, ['--host', '0.0.0.0', '--port', '3000'], {
  cwd: appDir,
  stdio: 'inherit',
  shell: true
});

child.on('error', (err) => {
  console.error('Failed to start:', err.message);
});

child.on('close', (code) => {
  console.log('Vite exited with code:', code);
});
