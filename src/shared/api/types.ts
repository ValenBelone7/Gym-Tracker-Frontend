/**
 * Tipos compartidos para respuestas de la API.
 */

// Respuesta paginada estándar de Django REST Framework
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Error estándar de la API
export interface ApiError {
  detail?: string;
  [key: string]: any; // Otros campos de error
}

// Tipos de errores de validación
export interface ValidationError {
  [field: string]: string[];
}