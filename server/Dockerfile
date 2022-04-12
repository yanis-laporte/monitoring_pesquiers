FROM php:8.0-apache
WORKDIR /var/www/html

COPY site-mp.conf /etc/apache2/sites-available/site-mp.conf

RUN docker-php-ext-install pdo pdo_mysql

RUN a2dissite 000-default
RUN a2ensite site-mp
RUN service apache2 restart

EXPOSE 80