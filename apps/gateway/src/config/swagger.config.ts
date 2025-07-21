// src/config/swagger.config.ts
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Moje API',
      version: '1.0.0',
      description: 'Przykładowe API z dokumentacją Swagger',
    },
  },
  apis: ['./src/routes/*.ts'], // ścieżka do plików z komentarzami JSDoc (jeśli chcesz)
};

export default swaggerOptions;
