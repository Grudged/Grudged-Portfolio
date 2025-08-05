#!/bin/bash

echo "🎨 Choose your favicon style:"
echo "1. Simple 'G' with blue gradient (favicon.svg)"
echo "2. Developer theme with code brackets (favicon-dev.svg)" 
echo "3. Portfolio document theme (favicon-portfolio.svg)"
echo ""

read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo "✅ Using simple 'G' favicon"
        # Already set as default
        ;;
    2)
        echo "✅ Using developer theme favicon"
        cp public/favicon-dev.svg public/favicon.svg
        ;;
    3)
        echo "✅ Using portfolio theme favicon"
        cp public/favicon-portfolio.svg public/favicon.svg
        ;;
    *)
        echo "❌ Invalid choice. Keeping default."
        ;;
esac

echo "🔄 Rebuilding project to apply changes..."
npm run build:prod
