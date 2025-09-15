# syntax=docker/dockerfile:1.7

FROM php:8.3-fpm-alpine AS base

ARG UID=1000
ARG GID=1000

RUN apk add --no-cache \
    bash \
    shadow \
    icu-dev \
    libpq-dev \
    oniguruma-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    tzdata \
 && docker-php-ext-configure intl \
 && docker-php-ext-install -j"$(nproc)" intl mbstring zip pdo pdo_pgsql \
 && apk del --no-cache oniguruma-dev

# Opcional: opcache para prod
RUN docker-php-ext-install opcache

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Usuario no root
RUN addgroup -g ${GID} appgroup \
 && adduser -D -G appgroup -u ${UID} appuser \
 && mkdir -p /var/www/html \
 && chown -R appuser:appgroup /var/www/html

WORKDIR /var/www/html

# Copiamos composer files primero para cache de dependencias
COPY --chown=appuser:appgroup composer.json composer.lock ./

RUN set -eux; \
    COMPOSER_ALLOW_SUPERUSER=1 composer install --no-interaction --no-scripts --prefer-dist --no-dev; \
    rm -rf /root/.composer/cache

# Copiar resto del proyecto
COPY --chown=appuser:appgroup . .

# Ejecutar scripts de composer (descubrimiento de paquetes)
RUN COMPOSER_ALLOW_SUPERUSER=1 composer dump-autoload --optimize

# Config PHP
COPY ./.docker/php/php.ini /usr/local/etc/php/conf.d/zzz-laravel.ini

USER appuser

CMD ["php-fpm"]

FROM base AS dev
RUN COMPOSER_ALLOW_SUPERUSER=1 composer install --no-interaction --prefer-dist
CMD ["php-fpm"]


