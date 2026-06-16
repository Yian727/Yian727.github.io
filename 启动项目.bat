@echo off
chcp 65001 >nul
echo ========================================
echo 康恒环境极简高端项目启动脚本
echo ========================================
echo.

REM 设置新Node.js路径
set PATH=C:\Program Files\nodejs;%PATH%

echo 当前Node.js版本:
node -v
echo.

echo 当前npm版本:
npm -v
echo.

cd /d "%~dp0app"

echo 安装依赖...
call npm install
if errorlevel 1 (
    echo.
    echo 依赖安装失败！
    pause
    exit /b 1
)

echo.
echo ========================================
echo 启动开发服务器...
echo ========================================
echo.
echo 前端地址: http://localhost:3000
echo 后台地址: http://localhost:3000/admin
echo.
echo 按 Ctrl+C 停止服务
echo ========================================
echo.

call npm run dev
