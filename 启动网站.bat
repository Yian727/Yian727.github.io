@echo off
chcp 65001 >nul
title 康恒环境极简高端网站
echo ============================================
echo   康恒环境极简高端 - 网站启动中...
echo ============================================
echo.

:: 进入项目目录
cd /d "%~dp0app"

:: 检查 Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Node.js，请先安装 Node.js
    echo 下载地址: https://nodejs.org
    pause
    exit /b 1
)

echo [信息] Node.js 版本:
node -v
echo.

echo [信息] npm 版本:
call npm -v
echo.

:: 检查后端服务依赖
cd /d "%~dp0server"
if not exist "node_modules" (
    echo [信息] 安装后端依赖...
    call npm install
    echo.
)

:: 回到项目根目录
cd /d "%~dp0app"

echo [信息] 检查 node_modules...
if not exist "node_modules" (
    echo [警告] node_modules 不存在，正在安装依赖...
    call npm install
    echo.
)

echo [信息] 检查 vite 是否安装...
if not exist "node_modules\.bin\vite.cmd" (
    echo [错误] Vite 未安装，正在重新安装依赖...
    call npm install
    echo.
)

echo [信息] 正在启动开发服务器...
echo.
echo -----------------------------------------------
echo   网站展示页面:  http://localhost:3000
echo   后台管理页面:  http://localhost:3000/admin
echo   后端 API 服务: http://localhost:3001
echo -----------------------------------------------
echo.

:: 等待3秒后打开浏览器
start "" cmd /c "timeout /t 4 /nobreak >nul && start http://localhost:3000 && start http://localhost:3000/admin"

:: 启动后端服务器（在后台窗口中）
start "康恒环境 - 后端服务 (port:3001)" cmd /c "cd /d \"%~dp0server\" && node index.js"

:: 等待1秒让后端先启动
timeout /t 1 /nobreak >nul

:: 启动 Vite 前端开发服务器
call "node_modules\.bin\vite.cmd" --host 0.0.0.0 --port 3000

echo.
echo ============================================
echo   服务器已停止
echo ============================================
pause
