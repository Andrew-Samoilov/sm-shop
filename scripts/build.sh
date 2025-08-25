#!/bin/bash
set -e

echo "=== Початок білда після імпорту ==="
cd /var/www/shina-mix-shop

npm run build
pm2 restart shina-mix-shop

echo "=== Білд завершено ==="
