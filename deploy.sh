#!/bin/bash

echo "🚀 Deploying to AWS Amplify..."

# Check if amplify is configured
if [ ! -d "amplify" ]; then
    echo "⚠️  Amplify not initialized. Please run 'amplify init' first."
    echo "Or use the AWS Amplify Console for easier deployment."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --legacy-peer-deps

# Build the project
echo "🔨 Building the project..."
npm run build

# Deploy to Amplify
echo "🌐 Deploying to Amplify..."
amplify publish

echo "✅ Deployment complete!"