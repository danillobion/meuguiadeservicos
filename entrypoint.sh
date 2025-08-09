#!/bin/bash
set -e

# Corrige dono e permissões das pastas de cache do Laravel
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Limpa caches do Laravel (evita arquivos antigos com permissões erradas)
php artisan cache:clear || true
php artisan config:clear || true
php artisan view:clear || true

# Executa as migrations (silenciosamente para não travar o container)
php artisan migrate --force || true

# Otimiza a aplicação
php artisan optimize || true

# Recompila o frontend
npm run build || true

# Executa o comando original do container
exec "$@"
