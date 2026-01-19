/**
 * Axios client configurado para la API de Django.
 * 
 * Maneja:
 * - CSRF tokens automáticamente
 * - Cookies (credentials)
 * - Base URL desde .env
 * - Interceptors para errores
 */

import axios, { AxiosError } from 'axios';

// Base URL desde variables de entorno
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Crear instancia de Axios
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enviar cookies (sessionid, csrftoken)
});

// Función para obtener CSRF token de las cookies
const getCsrfToken = (): string | null => {
  const name = 'csrftoken';
  let cookieValue: string | null = null;
  
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  
  return cookieValue;
};

// Request interceptor: agregar CSRF token en requests que modifican datos
apiClient.interceptors.request.use(
  (config) => {
    // Agregar CSRF token en POST, PUT, PATCH, DELETE
    if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '')) {
      const csrfToken = getCsrfToken();
      if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: manejo de errores global
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Manejo de errores común
    if (error.response) {
      // El servidor respondió con un status fuera del rango 2xx
      const status = error.response.status;
      
      switch (status) {
        case 401:
          // No autenticado - redirigir a login
          console.error('No autenticado');
          // Acá podríamos disparar un evento o usar un store global
          window.location.href = '/login';
          break;
        
        case 403:
          // Prohibido
          console.error('Acceso prohibido');
          break;
        
        case 404:
          // No encontrado
          console.error('Recurso no encontrado');
          break;
        
        case 500:
          // Error del servidor
          console.error('Error del servidor');
          break;
        
        default:
          console.error('Error en la request:', error.response.data);
      }
    } else if (error.request) {
      // La request fue hecha pero no hubo respuesta
      console.error('Sin respuesta del servidor');
    } else {
      // Algo pasó al configurar la request
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;