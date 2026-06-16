// 检查 Node.js 版本并写入文件
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'node_version_check.txt');

try {
  const nodeVer = execSync('node -v', { encoding: 'utf8' }).trim();
  const npmVer = execSync('npm -v', { encoding: 'utf8' }).trim();
  const nodePath = execSync('where node', { encoding: 'utf8' }).trim();
  
  const info = `Node.js 版本: ${nodeVer}\nnpm 版本: ${npmVer}\nNode.js 路径: ${nodePath}\n检查时间: ${new Date().toLocaleString()}`;
  fs.writeFileSync(logFile, info, 'utf8');
  console.log(info);
} catch(e) {
  const errInfo = `错误: ${e.message}`;
  fs.writeFileSync(logFile, errInfo, 'utf8');
  console.log(errInfo);
}
