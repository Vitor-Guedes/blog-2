# Use a base PHP image
FROM php:8.3-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libonig-dev \
    libzip-dev \
    libgd-dev \
    libpq-dev \
    && docker-php-ext-install \
        pdo \
        pdo_mysql \
        pdo_pgsql \
        pgsql \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Instala o Composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

WORKDIR /var/www/backend

ARG BACKEND_DEBUG_MODE=false
ARG BACKEND_DEBUG_PORT=9003

# Install Xdebug using PECL
RUN if [ ${BACKEND_DEBUG_MODE} = true ]; then \
    pecl install xdebug \
    && docker-php-ext-enable xdebug \
    ;fi

# Copy a custom Xdebug configuration file (optional, but recommended for advanced settings)
COPY ./xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

# Expose port for Xdebug (default is 9003 for Xdebug 3+)
EXPOSE ${BACKEND_DEBUG_PORT} 9000

CMD ["php-fpm"]