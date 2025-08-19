import { ZodType, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { logger } from '@zerodayz7/common';

type RequestSource = 'body' | 'query' | 'params';

// Lista dozwolonych źródeł danych
const VALID_SOURCES: RequestSource[] = ['body', 'query', 'params'];

/**
 * Middleware do walidacji danych żądania przy użyciu schematu Zod.
 * @param schema - Schemat Zod do walidacji danych
 * @param source - Źródło danych do walidacji (body, query, params)
 * @returns Middleware Express
 */
export const validateRequest = <T>(schema: ZodType<T>, source: RequestSource = 'body') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Walidacja źródła danych
    if (!VALID_SOURCES.includes(source)) {
      logger.error(`[validateRequest] Nieprawidłowe źródło danych: ${source}`);
      res.status(500).json({
        success: false,
        message: 'Nieprawidłowe źródło danych w middleware walidacji',
      });
      return;
    }

    const data = req[source];
    logger.info(`[validateRequest] Metoda: ${req.method} \n Ścieżka: ${req.path} \n Źródło: ${source} \n Dane: ${JSON.stringify(data, null, 2)}`);

    try {
      const result = schema.parse(data);
      req._validatedData = result; // Bezpieczne przypisanie z typem T
      logger.info(`[validateRequest] Walidacja zakończona sukcesem: \n ${JSON.stringify(result, null, 2)}`);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = err.issues.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        }));
        logger.warn(`[validateRequest] Błędy walidacji: ${JSON.stringify(errors, null, 2)}`);
        res.status(400).json({
          success: false,
          message: 'Błąd walidacji danych',
          errors,
        });
        return;
      }
      logger.error(`[validateRequest] Nieoczekiwany błąd: ${err}`);
      next(err); // Przekazanie innych błędów do globalnego middleware
    }
  };
};

/**
 * Pobiera zwalidowane dane z żądania.
 * @param req - Obiekt żądania Express
 * @returns Zwalidowane dane
 * @throws Error jeśli brak zwalidowanych danych
 */
export const getValidatedData = <T>(req: Request): T => {
  if (!req._validatedData) {
    logger.error('[getValidatedData] Brak zwalidowanych danych w żądaniu');
    throw new Error('Brak zwalidowanych danych w żądaniu');
  }
  return req._validatedData as T;
};
