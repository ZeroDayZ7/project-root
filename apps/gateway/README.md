# Gateway Service

## Opis

Gateway to mikroserwis pełniący rolę bramy API (API Gateway) dla całej aplikacji.  
Odpowiada za:

- Routing i proxy żądań do odpowiednich mikroserwisów  
- Centralizację middleware (np. bezpieczeństwo, CORS, rate limiting)  
- Dynamiczne ładowanie tras (route loader)  
- Eksponowanie endpointów publicznych (np. health check, metryki)  
- Obsługę dokumentacji API (Swagger)

## Technologie

- Node.js 22.x  
- Express.js  
- TypeScript  
- prom-client (metryki Prometheus)  
- Swagger (OpenAPI)  
- Middleware: helmet, rate-limit, CORS, logger

## Struktura katalogów

```

/src
/loaders         # loader tras, ładowanie middleware itd.
/middleware      # middleware bezpieczeństwa, logowania, CORS itd.
/routes          # pliki z trasami (np. health.route.ts)
/metrics         # konfiguracja metryk Prometheus
/proxies         # proxy do innych mikroserwisów (np. auth)
app.ts           # konfiguracja i uruchomienie Express
index.ts         # punkt wejścia aplikacji

````

## Jak uruchomić lokalnie

1. Sklonuj repozytorium  
2. Zainstaluj zależności:  
   ```bash
   pnpm install
````

3. Uruchom serwer w trybie developerskim:

   ```bash
   pnpm dev
   ```
4. Dostęp do API: `http://localhost:PORT/api`
5. Dokumentacja Swagger: `http://localhost:PORT/api-docs`

## Konfiguracja

* Zmienne środowiskowe (przykład w `.env.example`):

  * `PORT` — port serwera
  * `RATE_LIMIT_MAX` — maksymalna liczba zapytań na IP
  * `CORS_ORIGINS` — dozwolone domeny
  * inne specyficzne dla serwisu

## Jak dodawać nowe trasy?

* Dodaj plik w `src/routes` o nazwie `nazwa.route.ts` lub `.js`
* Eksportuj domyślnie `Router` z Express
* Trasy zostaną załadowane automatycznie przez `loadRoutes`

## Logging i monitoring

* Logi zapisywane przez `logger` (w `logs`)
* Metryki Prometheus dostępne na `/metrics`
* Health check pod `/health`

## Problemy i wsparcie

W razie problemów otwórz issue lub skontaktuj się z zespołem devops.
