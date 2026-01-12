@echo off
echo 🚀 Deploying to AWS Amplify...

REM Check if amplify is configured
if not exist "amplify" (
    echo ⚠️  Amplify not initialized. Please run 'amplify init' first.
    echo Or use the AWS Amplify Console for easier deployment.
    pause
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
npm ci --legacy-peer-deps

REM Build the project
echo 🔨 Building the project...
npm run build

REM Deploy to Amplify
echo 🌐 Deploying to Amplify...
amplify publish

echo ✅ Deployment complete!
pause