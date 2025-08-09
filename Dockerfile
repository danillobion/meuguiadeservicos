# Use uma imagem base com PHP 8.2 ou superior
FROM php:8.2-apache

# Habilite o módulo rewrite do Apache
RUN a2enmod rewrite

# Defina o diretório de trabalho
WORKDIR /var/www/html

# Instale dependências do sistema e extensões PHP necessárias
RUN apt-get update && apt-get install -y \
    libzip-dev \
    libonig-dev \
    libxml2-dev \
    git \
    zip \
    unzip \
    curl \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libpng-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath xml gd

# Instale o Node.js e npm (versão 18)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Instale o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copie os arquivos do projeto
COPY . .

# Copie configuração do Apache
COPY config/mgs.conf /etc/apache2/sites-available/mgs.conf

# Desabilite site padrão e habilite o novo
RUN a2dissite 000-default.conf && a2ensite mgs.conf

# Instale dependências do Node.js e construa o frontend
RUN npm install && npm install chart.js && npm run build

# Instale dependências do Composer
RUN composer install \
    && composer require league/flysystem-aws-s3-v3 laravel/socialite intervention/image --no-scripts

# Ajuste limites de upload e memória no PHP
RUN echo "upload_max_filesize=100M" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "post_max_size=100M" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "memory_limit=512M" >> /usr/local/etc/php/conf.d/memory-limit.ini

# Copia e aplica permissão ao entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Exponha porta 80
EXPOSE 80

# Usa entrypoint para corrigir permissões no start
ENTRYPOINT ["/entrypoint.sh"]
CMD ["apache2-foreground"]
