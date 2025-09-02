#!/bin/bash
set -e

LOG_OUT="/root/.pm2/logs/shina-mix-shop-out.log"
LOG_ERR="/root/.pm2/logs/shina-mix-shop-error.log"

echo "=== Початок білда після імпорту ==="
cd /var/www/shina-mix-shop

npm run build
pm2 restart shina-mix-shop

echo "=== Білд завершено ==="
