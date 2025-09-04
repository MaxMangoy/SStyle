import axios from 'axios'; // Importa la librería axios
import router from './router'; // Importa tu instancia de Vue Router (asegúrate que la ruta sea correcta)

// --- Configuración de la URL base para Axios ---
// Esto es para que no tengas que escribir la URL completa en cada petición.
// Utiliza las variables de entorno definidas en tu .env
axios.defaults.baseURL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_APP_API_URL_LOCAL
  : import.meta.env.VITE_APP_API_URL_PRODUCTION;

// --- Interceptor de Solicitudes de Axios ---
// Este interceptor se ejecuta ANTES de que cada solicitud sea enviada.
// Añade el token JWT al encabezado Authorization si existe en localStorage.
axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    const tokenType = localStorage.getItem('tokenType') || 'Bearer'; // Asegura que el tipo de token sea 'Bearer' por defecto

    if (accessToken) {
      // Si existe un token, lo añade al encabezado de autorización
      config.headers.Authorization = `${tokenType} ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Manejo de errores antes de enviar la solicitud (ej. problemas de configuración)
    return Promise.reject(error);
  }
);

// --- Interceptor de Respuestas de Axios ---
// Esto se ejecuta DESPUÉS de que se recibe una respuesta.
// Maneja errores 401 (Unauthorized) o 403 (Forbidden) limpiando el token y redirigiendo al login.
axios.interceptors.response.use(
  (response) => response, // Si la respuesta es exitosa, simplemente la devuelve
  (error) => {
    // Si hay un error y el estado es 401 (Unauthorized) o 403 (Forbidden)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn('Authentication error (401/403). Clearing session and redirecting to login.');
      // Limpia todos los datos de sesión almacenados en localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('tokenType');
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_role');
      localStorage.removeItem('user_first_name');
      
      // Redirige al usuario a la página de login
      // router.push() es la forma programática de navegar con Vue Router
      router.push('/login'); 
      // Opcional: Puedes mostrar una alerta al usuario
      alert('Tu sesión ha expirado o es inválida. Por favor, inicia sesión de nuevo.');
    }
    // Para cualquier otro error, rechaza la promesa para que pueda ser capturada por el código que hizo la solicitud.
    return Promise.reject(error);
  }
);

// Exporta la instancia de Axios configurada para que pueda ser importada en main.js
export default axios;