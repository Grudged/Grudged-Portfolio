#!/bin/bash

echo "🎨 Generating new favicon.ico from SVG..."

# Use ImageMagick if available, otherwise provide instructions
if command -v convert &> /dev/null; then
    echo "✅ ImageMagick found, converting SVG to ICO..."
    convert public/favicon.svg -resize 16x16 -colors 256 public/favicon.ico
    echo "✅ New favicon.ico created!"
else
    echo "❌ ImageMagick not found."
    echo "📝 To create favicon.ico manually:"
    echo "   1. Open https://favicon.io/favicon-converter/"
    echo "   2. Upload public/favicon.svg"
    echo "   3. Download and replace public/favicon.ico"
fi

echo "🔄 Rebuilding project..."
npm run build:prod

echo "🚀 Done! Clear browser cache to see changes."
echo "   - Chrome: Ctrl+Shift+R or Ctrl+F5"
echo "   - Firefox: Ctrl+Shift+R"
echo "   - Safari: Cmd+Option+R"
