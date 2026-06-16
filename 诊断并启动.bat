@echo off
chcp 65001 >nul
title 诊断工具
echo ============================================
echo   康恒环境网站 - 启动诊断
echo ============================================
echo.

:: 1. 检查 Node.js
echo [1/6] 检查 Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo   [失败] Node.js 未安装！
    echo   请先安装 Node.js: https://nodejs.org
    pause
    exit /b 1
)
echo   [通过] Node.js 已安装
for /f "tokens=*" %%i in ('node -v') do echo   版本: %%i
echo.

:: 2. 检查 npm
echo [2/6] 检查 npm...
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo   [失败] npm 未找到
    pause
    exit /b 1
)
echo   [通过] npm 已安装
for /f "tokens=*" %%i in ('npm -v') do echo   版本: %%i
echo.

:: 3. 进入项目目录
cd /d "%~dp0app"
echo [3/6] 项目目录: %cd%
echo.

:: 4. 检查 node_modules
echo [4/6] 检查 node_modules...
if not exist "node_modules" (
    echo   [失败] node_modules 不存在！
    echo   正在执行 npm install...
    call npm install
    echo.
) else (
    echo   [通过] node_modules 存在
)
echo.

:: 5. 检查 vite
echo [5/6] 检查 Vite...
if not exist "node_modules\.bin\vite.cmd" (
    echo   [失败] Vite 未安装！
    echo   正在执行 npm install...
    call npm install
    echo.
) else (
    echo   [通过] Vite 已安装
)
echo.

:: 6. 检查端口占用
echo [6/6] 检查端口 3000 是否被占用...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000" ^| findstr "LISTENING" 2^>nul') do (
    echo   [警告] 端口 3000 已被进程 %%a 占用！
    echo   正在尝试结束该进程...
    taskkill /PID %%a /F >nul 2>&1
    if %errorlevel% equ 0 (
        echo   [成功] 已结束占用端口的进程
    ) else (
        echo   [失败] 无法结束进程，请手动在任务管理器中关闭
    )
)
echo   [通过] 端口 3000 可用
echo.

:: 启动服务器
echo ============================================
echo   诊断完毕，正在启动服务器...
echo ============================================
echo.
echo 请稍候，等待 Vite 启动...
echo.

:: 启动 Vite（自动打开浏览器）
call "node_modules\.bin\vite.cmd" --host 0.0.0.0 --port 3000 --open

echo.
echo ============================================
echo   服务器已停止，按任意键关闭
echo ============================================
pause
