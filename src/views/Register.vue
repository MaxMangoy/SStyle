<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 font-sans">
    <header class="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <button
            @click="prevStep"
            class="flex items-center text-gray-600 hover:text-pink-700 transition-colors duration-200 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium"
            :class="{'opacity-50 cursor-not-allowed': currentStep === 1}"
            :disabled="currentStep === 1"
            aria-label="Volver al paso anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Atrás
          </button>

          <router-link
            to="/"
            class="flex items-center space-x-2 text-pink-600 hover:text-pink-800 transition-colors duration-200"
          >
            <img src="@/assets/imagenes/visteteya.jpeg" alt="Logo" class="h-9 w-auto rounded-full shadow-md" />
            <span class="text-2xl font-bold tracking-tight">VisteteYA</span>
          </router-link>

          <router-link
            to="/login"
            class="text-pink-600 hover:text-pink-800 transition-colors duration-200 px-3 py-2 rounded-lg text-sm font-medium"
          >
            Iniciar Sesión
          </router-link>
        </div>
      </div>
    </header>

    <main class="py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden p-8 sm:p-10">
        <h2 class="text-4xl font-extrabold text-gray-900 text-center mb-6 leading-tight">
          Crea tu Cuenta
        </h2>
        <p class="text-center text-gray-600 mb-8 max-w-md mx-auto">
          Regístrate como cliente para comprar o como vendedor para ofrecer tus productos.
        </p>

        <div v-if="currentStep === 1" class="animate-fade-in-down">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <button
              @click="selectUserType('customer')"
              class="flex flex-col items-center justify-center p-6 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-blue-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="text-xl font-semibold text-blue-800">Soy Cliente</span>
              <p class="text-sm text-blue-600 text-center mt-1">Busca y compra productos increíbles.</p>
            </button>
            <button
              @click="selectUserType('seller')"
              class="flex flex-col items-center justify-center p-6 bg-pink-50 hover:bg-pink-100 border-2 border-pink-200 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-pink-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m7 0V5a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6" />
              </svg>
              <span class="text-xl font-semibold text-pink-800">Soy Vendedor</span>
              <p class="text-sm text-pink-600 text-center mt-1">Crea tu tienda y vende tus productos.</p>
            </button>
          </div>
        </div>

        <form v-if="currentStep === 2 && userType === 'customer'" @submit.prevent="handleCustomerRegister" class="animate-fade-in-down space-y-6">
          <h3 class="text-2xl font-bold text-gray-800 mb-4 text-center">Registro de Cliente</h3>
          <div>
            <label for="customer-email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" id="customer-email" v-model="customerForm.email" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
          </div>
          <div>
            <label for="customer-password" class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input type="password" id="customer-password" v-model="customerForm.password" required minlength="6" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
          </div>
          <div>
            <label for="customer-confirm-password" class="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
            <input type="password" id="customer-confirm-password" v-model="customerForm.confirmPassword" required minlength="6" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
          </div>
          <div>
            <label for="customer-first-name" class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input type="text" id="customer-first-name" v-model="customerForm.firstName" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
          </div>
          <div>
            <label for="customer-last-name" class="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
            <input type="text" id="customer-last-name" v-model="customerForm.lastName" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
          </div>
          <div>
            <label for="customer-phone" class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input type="tel" id="customer-phone" v-model="customerForm.phoneNumber" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
          </div>
          <div>
            <label for="customer-address" class="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
            <input type="text" id="customer-address" v-model="customerForm.address" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
          </div>
          
          <p v-if="formError" class="text-red-600 text-sm mt-4 text-center">{{ formError }}</p>

          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200"
          >
            <span v-if="!loading">Registrarme como Cliente</span>
            <span v-else>Registrando...</span>
          </button>
        </form>

        <form v-if="currentStep === 2 && userType === 'seller'" @submit.prevent="handleSellerRegister" class="animate-fade-in-up space-y-6">
          <h3 class="text-2xl font-bold text-gray-800 mb-4 text-center">Registro de Vendedor</h3>
          <div>
            <label for="seller-email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" id="seller-email" v-model="sellerForm.email" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
          </div>
          <div>
            <label for="seller-password" class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input type="password" id="seller-password" v-model="sellerForm.password" required minlength="6" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
          </div>
          <div>
            <label for="seller-confirm-password" class="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
            <input type="password" id="seller-confirm-password" v-model="sellerForm.confirmPassword" required minlength="6" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
          </div>
          <div>
            <label for="seller-first-name" class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input type="text" id="seller-first-name" v-model="sellerForm.firstName" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
          </div>
          <div>
            <label for="seller-last-name" class="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
            <input type="text" id="seller-last-name" v-model="sellerForm.lastName" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
          </div>
          <div>
            <label for="seller-business-name" class="block text-sm font-medium text-gray-700 mb-1">Nombre de tu Negocio/Marca</label>
            <input type="text" id="seller-business-name" v-model="sellerForm.businessName" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
          </div>
          <div>
            <label for="seller-phone" class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input type="tel" id="seller-phone" v-model="sellerForm.phoneNumber" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
          </div>
          <div>
            <label for="seller-address" class="block text-sm font-medium text-gray-700 mb-1">Dirección (Opcional)</label>
            <input type="text" id="seller-address" v-model="sellerForm.address" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
          </div>
          <div>
            <label for="seller-bank-account" class="block text-sm font-medium text-gray-700 mb-1">Número de Cuenta Bancaria</label>
            <input type="text" id="seller-bank-account" v-model="sellerForm.bankAccount" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
          </div>
          <div class="flex items-center">
            <input id="accepts-terms" type="checkbox" v-model="sellerForm.acceptsTerms" required class="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded" />
            <label for="accepts-terms" class="ml-2 block text-sm text-gray-900">
              Acepto los <a href="#" class="font-medium text-pink-600 hover:text-pink-500">Términos y Condiciones</a>
            </label>
          </div>
          
          <p v-if="formError" class="text-red-600 text-sm mt-4 text-center">{{ formError }}</p>

          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200"
          >
            <span v-if="!loading">Registrarme como Vendedor</span>
            <span v-else>Registrando...</span>
          </button>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

// --- Configuración de la API ---
// --- CAMBIO CLAVE AQUÍ ---
// Determina la URL base del backend según el entorno
const API_BASE_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_APP_API_URL_LOCAL  // Usa tu URL local si estás en desarrollo
  : import.meta.env.VITE_APP_API_URL_PRODUCTION; // Usa tu URL de producción en otro caso (como al hacer build para desplegar)

// Opcional: Para verificar en consola qué URL se está usando
// console.log('API Base URL en uso:', API_BASE_URL);

// --- Estados del Formulario ---
const currentStep = ref(1);
const userType = ref(null); // 'customer' o 'seller'
const loading = ref(false);
const formError = ref('');

const customerForm = ref({
  email: '',
  password: '',
  confirmPassword: '', // Solo para validación frontend
  firstName: '',
  lastName: '',
  phoneNumber: '',
  address: ''
});

const sellerForm = ref({
  email: '',
  password: '',
  confirmPassword: '', // Solo para validación frontend
  firstName: '',
  lastName: '',
  businessName: '',
  phoneNumber: '',
  address: '',
  bankAccount: '',
  acceptsTerms: false // Campo para el checkbox de términos
});

// --- Métodos de Navegación del Formulario ---
const selectUserType = (type) => {
  userType.value = type;
  currentStep.value = 2;
  formError.value = ''; // Limpiar errores al cambiar de paso
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
    formError.value = ''; // Limpiar errores al volver un paso
  }
};

// --- Validación General de Formulario ---
const validateCurrentStep = () => {
  formError.value = ''; // Resetear el error antes de validar

  if (currentStep.value === 2) {
    if (userType.value === 'customer') {
      const form = customerForm.value;
      if (!form.email || !form.password || !form.confirmPassword || !form.firstName || !form.lastName || !form.phoneNumber || !form.address) {
        formError.value = 'Por favor, completa todos los campos obligatorios.';
        return false;
      }
      if (form.password !== form.confirmPassword) {
        formError.value = 'Las contraseñas no coinciden.';
        return false;
      }
      if (form.password.length < 6) {
        formError.value = 'La contraseña debe tener al menos 6 caracteres.';
        return false;
      }
    } else if (userType.value === 'seller') {
      const form = sellerForm.value;
      if (!form.email || !form.password || !form.confirmPassword || !form.firstName || !form.lastName || !form.businessName || !form.phoneNumber || !form.bankAccount) {
        formError.value = 'Por favor, completa todos los campos obligatorios.';
        return false;
      }
      if (form.password !== form.confirmPassword) {
        formError.value = 'Las contraseñas no coinciden.';
        return false;
      }
      if (form.password.length < 6) {
        formError.value = 'La contraseña debe tener al menos 6 caracteres.';
        return false;
      }
      if (!form.acceptsTerms) { // Validar que se hayan aceptado los términos
        formError.value = 'Debes aceptar los Términos y Condiciones.';
        return false;
      }
    }
  }
  return true;
};

// --- Manejo de Registro de Cliente ---
const handleCustomerRegister = async () => {
  if (!validateCurrentStep()) {
    return;
  }

  try {
    loading.value = true;
    formError.value = '';

    const response = await axios.post(`${API_BASE_URL}/register/customer`, { // Usando la variable dinámica
      email: customerForm.value.email,
      password: customerForm.value.password,
      first_name: customerForm.value.firstName,
      last_name: customerForm.value.lastName,
      phone_number: customerForm.value.phoneNumber,
      address: customerForm.value.address
    });

    alert('¡Registro de cliente exitoso!');
    // Reiniciar formulario y redirigir al login
    customerForm.value = {
      email: '', password: '', confirmPassword: '', firstName: '', lastName: '', phoneNumber: '', address: ''
    };
    currentStep.value = 1;
    userType.value = null;
    router.push({ name: 'Login' });

  } catch (error) {
    console.error('Error al registrar cliente:', error);
    if (error.response) {
      // El servidor respondió con un estado fuera de 2xx
      const errorData = error.response.data;
      if (errorData.detail) {
        if (Array.isArray(errorData.detail)) { // Errores de validación de Pydantic
          formError.value = errorData.detail.map(e => {
            const field = e.loc.length > 1 ? e.loc[1] : e.loc[0]; // Intenta obtener el nombre del campo
            return `Campo '${field}': ${e.msg}`;
          }).join('; ');
        } else { // Otros errores de detalle (e.g., email ya registrado)
          formError.value = errorData.detail;
        }
      } else {
        formError.value = 'Ocurrió un error al intentar registrarte como cliente.';
      }
    } else {
      formError.value = 'No se pudo conectar con el servidor. Por favor, inténtalo más tarde.';
    }
  } finally {
    loading.value = false;
  }
};

// --- Manejo de Registro de Vendedor (¡CON LA CORRECCIÓN DE JSON!) ---
const handleSellerRegister = async () => {
  if (!validateCurrentStep()) {
    return;
  }

  try {
    loading.value = true;
    formError.value = '';

    // ¡CAMBIO CLAVE AQUÍ! Construye un objeto JavaScript plano para JSON
    const sellerPayload = {
      email: sellerForm.value.email,
      password: sellerForm.value.password,
      first_name: sellerForm.value.firstName,
      last_name: sellerForm.value.lastName,
      business_name: sellerForm.value.businessName,
      phone_number: sellerForm.value.phoneNumber,
      address: sellerForm.value.address || null, // Envía null si el campo está vacío
      bank_account: sellerForm.value.bankAccount,
      accepts_terms: sellerForm.value.acceptsTerms, // Asegúrate de que esto sea un booleano (true/false)
    };

    const response = await axios.post(`${API_BASE_URL}/register/seller`, sellerPayload, { // Usando la variable dinámica
        headers: {
            'Content-Type': 'application/json' // <-- ¡ESTO ES CRÍTICO!
        }
    });

    alert('¡Registro de vendedor exitoso!');
    // Reiniciar formulario y redirigir al login
    sellerForm.value = {
      email: '', password: '', confirmPassword: '', firstName: '', lastName: '',
      businessName: '', phoneNumber: '', address: '', bankAccount: '', acceptsTerms: false
    };
    currentStep.value = 1;
    userType.value = null;
    router.push({ name: 'Login' });

  } catch (error) {
    console.error('Error al registrar vendedor:', error);
    if (error.response) {
      // El servidor respondió con un estado fuera de 2xx
      const errorData = error.response.data;
      if (errorData.detail) {
        if (Array.isArray(errorData.detail)) { // Errores de validación de Pydantic
          formError.value = errorData.detail.map(e => {
            const field = e.loc.length > 1 ? e.loc[1] : e.loc[0]; // Intenta obtener el nombre del campo
            return `Campo '${field}': ${e.msg}`;
          }).join('; ');
        } else { // Otros errores de detalle (e.g., email ya registrado)
          formError.value = errorData.detail;
        }
      } else {
        formError.value = 'Ocurrió un error al intentar registrarte como vendedor.';
      }
    } else {
      formError.value = 'No se pudo conectar con el servidor. Por favor, inténtalo más tarde.';
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Animaciones CSS (mantener las que ya tenías) */
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

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
}

/* Sombra más pronunciada para los botones de selección de tipo de usuario */
.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>