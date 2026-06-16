// 启动 Node.js 安装程序
const { exec } = require('child_process');
const path = 'C:\\Users\\THINK\\Downloads\\node-v26.2.0-x64.msi';

console.log('正在启动 Node.js 安装程序...');
exec(`start "" "${path}"`, (err) => {
  if (err) {
    console.error('启动失败:', err.message);
  } else {
    console.log('安装程序已启动，请在弹出的窗口中完成安装。');
  }
});
