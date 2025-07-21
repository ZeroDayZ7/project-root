# Pobierz oficjalny obraz nginx, wersja alpine (mały)
FROM nginx:stable-alpine

# Skopiuj własną konfigurację do obrazu
COPY conf.d/ /etc/nginx/conf.d/

# (opcjonalnie) skopiuj certyfikaty TLS jeśli masz
# COPY certs/ /etc/nginx/certs/

# expose porty (opcjonalne, ale dobrze mieć)
EXPOSE 80 443

# Komenda startowa już jest domyślna w obrazie nginx, nie musisz definiować CMD
