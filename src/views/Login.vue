<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 font-sans">
    <header class="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <button
            @click="goToHome"
            class="flex items-center text-gray-600 hover:text-pink-700 transition-colors duration-200 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium"
            aria-label="Volver a la página de inicio"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </button>

          <router-link
            to="/"
            class="flex items-center space-x-2 text-gray-800 hover:text-pink-600 transition-colors duration-200 group"
          >
            <img src="@/assets/imagenes/visteteya.jpeg" alt="VisteteYA Logo" class="h-8 w-8">
            <span class="text-2xl font-bold">Vistete<span class="text-pink-600">YA</span></span>
          </router-link>

          <nav class="flex space-x-6">
            <router-link
              to="/"
              class="inline-flex items-center text-sm font-medium text-gray-600 hover:text-pink-700 transition-colors duration-200 py-2 px-3 rounded-md hover:bg-pink-50"
              aria-label="Ir a la página de inicio"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Inicio
            </router-link>
          </nav>
        </div>
      </div>
    </header>

    <main class="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-10">
        <div class="bg-white rounded-3xl shadow-2xl overflow-hidden border border-pink-100 transform transition-all duration-300 hover:shadow-3xl hover:-translate-y-1">
          <div class="p-8 sm:p-10">
            <h2 class="text-3xl font-bold text-center text-gray-900 mb-8">
              Bienvenido de nuevo
            </h2>

            <form class="mt-6 space-y-6" @submit.prevent="handleLogin">
              <div class="space-y-5">
                <div>
                  <label for="email" class="sr-only">Correo electrónico</label>
                  <div class="relative rounded-lg shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      v-model="loginForm.email"
                      type="email"
                      autocomplete="email"
                      required
                      class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-base transition-all duration-200"
                      placeholder="Tu correo electrónico"
                      aria-label="Correo electrónico"
                    />
                  </div>
                </div>

                <div>
                  <label for="password" class="sr-only">Contraseña</label>
                  <div class="relative rounded-lg shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      v-model="loginForm.password"
                      type="password"
                      autocomplete="current-password"
                      required
                      class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-base transition-all duration-200"
                      placeholder="Tu contraseña"
                      aria-label="Contraseña"
                    />
                  </div>
                </div>

                <div v-if="errorMessage" class="text-sm text-red-600 text-center bg-red-50 p-3 rounded-lg border border-red-200 animate-fade-in-down" role="alert">
                  {{ errorMessage }}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full flex justify-center py-3.5 px-4 border border-transparent text-lg font-semibold rounded-lg text-white bg-pink-600
                         hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500
                         transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl
                         disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                  :aria-busy="loading ? 'true' : 'false'"
                  aria-live="polite"
                >
                  <span v-if="!loading">Iniciar sesión</span>
                  <span v-else class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Cargando...
                  </span>
                </button>
              </div>
            </form>

            <div class="mt-8 text-center text-sm">
              <p class="text-gray-600">
                ¿No tienes una cuenta?
                <router-link to="/register" class="font-medium text-pink-600 hover:text-pink-700 hover:underline transition-colors duration-200">
                  Regístrate aquí
                </router-link>
              </p>
            </div>
          </div>
        </div>

        <footer class="mt-12 text-center text-sm text-gray-500">
          &copy; 2025 VisteteYA. Todos los derechos reservados.
        </footer>
      </div>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const loading = ref(false)
const errorMessage = ref(null)

const loginForm = reactive({
  email: '',
  password: ''
})

// --- AJUSTE DE VARIABLES DE ENTORNO PARA LAS URLs del backend (coincidiendo con tu .env) ---
// Determina la URL base de la API según el entorno
const API_BASE_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_APP_API_URL_LOCAL  // Usa esta si estás en desarrollo
  : import.meta.env.VITE_APP_API_URL_PRODUCTION; // Usa esta si estás en producción

console.log('API Base URL en uso:', API_BASE_URL); // Puedes añadir esto para depurar y ver qué URL se está usando

const goToHome = () => {
  router.push('/');
};

// --- Función para decodificar JWT ---
const decodeJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Error decoding JWT:", e);
    return null;
  }
};

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = null

  try {
    const response = await axios.post(
      `${API_BASE_URL}/login`, // ¡Aquí es donde se usa la URL dinámica!
      {
        email: loginForm.email,
        password: loginForm.password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    // --- CAMBIO CLAVE AQUÍ: Almacenar el token JWT y el tipo de token ---
    if (response.data.access_token && response.data.token_type) {
      const accessToken = response.data.access_token;
      const tokenType = response.data.token_type; // Esto debería ser 'bearer'

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('tokenType', tokenType);

      // --- Decodificar el token para obtener la información del usuario ---
      const decodedToken = decodeJwt(accessToken);

      if (decodedToken) {
        localStorage.setItem('user_id', decodedToken.user_id);
        localStorage.setItem('user_email', decodedToken.sub); // 'sub' es el estándar para el email/identificador
        localStorage.setItem('user_role', decodedToken.role);
        if (decodedToken.first_name) {
          localStorage.setItem('user_first_name', decodedToken.first_name);
        }

        alert(`¡Bienvenido, ${decodedToken.first_name || decodedToken.sub}! Has iniciado sesión como ${decodedToken.role}.`);

        // --- Redirección basada en el rol del usuario ---
        if (decodedToken.role === 'admin') {
          router.push({ name: 'admin-dashboard' });
        } else if (decodedToken.role === 'cliente') {
          router.push('/'); // O a la ruta de dashboard de cliente si tienes una
        } else if (decodedToken.role === 'vendedor') {
          router.push('/dashboard-vendedor/mis-articulos');
        } else {
          router.push('/'); // Redirección por defecto
        }

      } else {
        errorMessage.value = 'El token de autenticación no pudo ser decodificado. Inténtalo de nuevo.';
      }

    } else {
      errorMessage.value = 'Respuesta inesperada del servidor: falta el token de autenticación. Inténtalo de nuevo.';
    }
  } catch (error) {
    if (error.response) {
      console.error('Error de respuesta de la API:', error.response.data);
      console.error('Código de estado:', error.response.status);

      switch (error.response.status) {
        case 400: // Bad Request, para errores de validación o credenciales incorrectas en algunos casos
        case 401: // Unauthorized
          errorMessage.value = error.response.data.detail || 'Credenciales incorrectas. Por favor, verifica tu correo y contraseña.';
          break;
        case 403: // Forbidden (si la cuenta está inactiva, etc.)
          errorMessage.value = error.response.data.detail || 'Tu cuenta está inactiva o no tienes permisos. Contacta al soporte.';
          break;
        case 422: // Unprocessable Entity (errores de validación de FastAPI)
          errorMessage.value = 'Datos de entrada inválidos. Por favor, verifica los campos.';
          break;
        case 500:
          errorMessage.value = 'Ocurrió un error en el servidor. Por favor, inténtalo más tarde.';
          break;
        default:
          errorMessage.value = `Un error inesperado ocurrió: ${error.response.status}.`;
      }
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor:', error.request);
      errorMessage.value = 'No se pudo conectar al servidor. Asegúrate de que el backend esté ejecutándose y los CORS estén configurados correctamente.';
    } else {
      console.error('Error al configurar la solicitud:', error.message);
      errorMessage.value = 'Error al procesar tu solicitud. Inténtalo de nuevo.';
    }
    console.error('Error completo durante el login:', error);
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/*
  He añadido algunas animaciones CSS personalizadas para un toque más profesional,
  ya que Tailwind no tiene todas las animaciones predefinidas.
*/

/* Fuente personalizada (asegúrate de que esté importada en tu CSS principal o HTML) */
.font-sans {
  font-family: 'Inter', sans-serif; /* Puedes usar 'Poppins', 'Lato', 'Roboto', etc. */
}

/* Animación para el mensaje de error */
@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fade-in-down 0.4s ease-out forwards;
}

/* Sombra más pronunciada para hover en la tarjeta del formulario */
.shadow-3xl {
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.06);
}

/* La mayoría de los estilos están ahora inline con las clases de Tailwind en el template. */
</style>