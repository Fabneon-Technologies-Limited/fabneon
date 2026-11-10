#!/bin/bash
set -e

FILE="/etc/nginx/sites-available/fabneon.com"
if ! grep -q "no-cache, no-store" "$FILE"; then
    sed -i '/try_files \$uri \$uri\/ \/index.html;/a \        add_header Cache-Control "no-cache, no-store, must-revalidate";\n        add_header Pragma "no-cache";\n        add_header Expires "0";' "$FILE"
fi

nginx -t
systemctl reload nginx
echo "Nginx updated and reloaded successfully!"

