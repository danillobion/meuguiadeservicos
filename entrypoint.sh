#!/bin/bash
set -e

# Ajusta dono e permissões para as pastas de cache do Laravel
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Limpa caches para evitar problemas com arquivos antigos
php artisan cache:clear || true
php artisan config:clear || true
php artisan view:clear || true

# Executa migrations automaticamente (force para rodar sem prompt)
php artisan migrate --force || true

# Otimiza a aplicação Laravel
php artisan optimize || true

# Compila o frontend (vite, webpack ou npm run build)
npm run build || true

# Por fim, inicia o Apache em primeiro plano para manter o container rodando
exec apache2-foreground
