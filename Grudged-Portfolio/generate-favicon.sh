#!/bin/bash

echo "🎨 Generating favicon.ico from favicon.svg..."

# Convert SVG to ICO using ImageMagick
convert public/favicon.svg -define icon:auto-resize=16,32,48 public/favicon.ico

echo "✅ favicon.ico generated successfully!"

# Also create PNG versions for better compatibility
convert public/favicon.svg -resize 16x16 public/favicon-16.png
convert public/favicon.svg -resize 32x32 public/favicon-32.png

echo "✅ PNG versions created!"
echo "🔄 Files ready for deployment"
