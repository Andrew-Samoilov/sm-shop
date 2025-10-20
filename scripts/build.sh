#!/bin/bash
set -e

LOG_OUT="/root/.pm2/logs/shina-mix-shop-out.log"
LOG_ERR="/root/.pm2/logs/shina-mix-shop-error.log"

echo "[build] Початок білда після імпорту"
cd /var/www/shina-mix-shop

# keepalive повідомлення кожні 60 сек
( while true; do echo "[deploy] still working..."; sleep 60; done ) &
KEEPALIVE_PID=$!

echo "[build] generate prisma client..."
npx prisma generate

npm run build -- --verbose

kill $KEEPALIVE_PID

echo "[deploy] Перезапускаємо PM2..."
pm2 restart shina-mix-shop

echo "[build] Білд завершено "
