<template>
    <header class="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <button
            @click="goBack"
            class="flex items-center text-gray-600 hover:text-pink-700 transition-colors duration-200 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium"
            aria-label="Volver a la página anterior"
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
  
    <div class="container mx-auto px-5 py-8 max-w-4xl bg-white rounded-3xl shadow-2xl mt-8">
      <h1 class="text-3xl font-extrabold text-gray-900 mb-8 text-center">Configuración de tu Perfil</h1>
      <p class="text-gray-700 text-center mb-6">Aquí podrás gestionar la información de tu perfil y tu seguridad.</p>
  
      <div v-if="isLoading" class="text-center py-10">
        <p class="text-gray-500">Cargando información...</p>
        <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-pink-500 mt-4" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
  
      <div v-else class="space-y-6">
        <div v-if="submissionStatus === 'success'" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md shadow-sm" role="alert">
          <p class="font-bold">¡Perfil Actualizado!</p>
          <p>Tu información de perfil ha sido guardada exitosamente.</p>
        </div>
        <div v-if="submissionStatus === 'error'" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow-sm" role="alert">
          <p class="font-bold">Error al Actualizar</p>
          <p>{{ errors.profile || 'Hubo un problema al intentar guardar tu perfil. Por favor, inténtalo de nuevo.' }}</p>
        </div>
  
        <div class="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Información del Perfil</h2>
          <form @submit.prevent="saveProfile" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700">Nombre(s):</label>
              <input type="text" id="firstName" v-model="profileForm.firstName" @input="clearError('firstName')" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500">
              <p v-if="errors.firstName" class="text-red-500 text-xs mt-1">{{ errors.firstName }}</p>
            </div>
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700">Apellido(s):</label>
              <input type="text" id="lastName" v-model="profileForm.lastName" @input="clearError('lastName')" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500">
              <p v-if="errors.lastName" class="text-red-500 text-xs mt-1">{{ errors.lastName }}</p>
            </div>
            <div>
              <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Número de Teléfono:</label>
              <input type="text" id="phoneNumber" v-model="profileForm.phoneNumber" @input="clearError('phoneNumber')" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500">
              <p v-if="errors.phoneNumber" class="text-red-500 text-xs mt-1">{{ errors.phoneNumber }}</p>
            </div>
            <div class="md:col-span-2">
              <label for="address" class="block text-sm font-medium text-gray-700">Dirección:</label>
              <input type="text" id="address" v-model="profileForm.address" @input="clearError('address')" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500">
              <p v-if="errors.address" class="text-red-500 text-xs mt-1">{{ errors.address }}</p>
            </div>
            <div class="md:col-span-2">
              <label for="contactEmail" class="block text-sm font-medium text-gray-700">Email de Contacto:</label>
              <input type="email" id="contactEmail" v-model="profileForm.email" @input="clearError('email')" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500">
              <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
            </div>
            
            <div class="md:col-span-2 flex justify-end">
              <button type="submit" :disabled="submissionStatus === 'submitting'" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                <svg v-if="submissionStatus === 'submitting'" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ submissionStatus === 'submitting' ? 'Guardando...' : 'Guardar Cambios' }}
              </button>
            </div>
          </form>
        </div>
  
        <div v-if="passwordChangeStatus === 'success'" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md shadow-sm" role="alert">
          <p class="font-bold">¡Contraseña Cambiada!</p>
          <p>Tu contraseña ha sido actualizada exitosamente.</p>
        </div>
        <div v-if="passwordChangeStatus === 'error'" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow-sm" role="alert">
          <p class="font-bold">Error al Cambiar Contraseña</p>
          <p>{{ errors.password || 'Hubo un problema al intentar cambiar tu contraseña. Por favor, inténtalo de nuevo.' }}</p>
        </div>
  
        <div class="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Seguridad</h2>
          <form @submit.prevent="changePassword" class="space-y-4">
            <div>
              <label for="currentPassword" class="block text-sm font-medium text-gray-700">Contraseña Actual:</label>
              <input type="password" id="currentPassword" v-model="passwordForm.currentPassword" @input="clearError('currentPassword')" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500">
              <p v-if="errors.currentPassword" class="text-red-500 text-xs mt-1">{{ errors.currentPassword }}</p>
            </div>
            <div>
              <label for="newPassword" class="block text-sm font-medium text-gray-700">Nueva Contraseña:</label>
              <input type="password" id="newPassword" v-model="passwordForm.newPassword" @input="clearError('newPassword')" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500">
              <p v-if="errors.newPassword" class="text-red-500 text-xs mt-1">{{ errors.newPassword }}</p>
            </div>
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmar Nueva Contraseña:</label>
              <input type="password" id="confirmPassword" v-model="passwordForm.confirmPassword" @input="clearError('confirmPassword')" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500">
              <p v-if="errors.confirmPassword" class="text-red-500 text-xs mt-1">{{ errors.confirmPassword }}</p>
            </div>
            <div class="flex justify-end">
              <button type="submit" :disabled="passwordChangeStatus === 'submitting'" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                <svg v-if="passwordChangeStatus === 'submitting'" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ passwordChangeStatus === 'submitting' ? 'Cambiando...' : 'Cambiar Contraseña' }}
              </button>
            </div>
          </form>
        </div>
  
      </div>
    </div>
  </template>
  <script setup>
  import { ref, onMounted, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  // Función para volver a la página anterior
  const goBack = () => {
    router.go(-1);
  };
  
  // --- CAMBIO CLAVE AQUÍ ---
  // Determina la URL base de la API según el entorno
  const API_BASE_URL = import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_APP_API_URL_LOCAL  // Usa esta si estás en desarrollo
    : import.meta.env.VITE_APP_API_URL_PRODUCTION; // Usa esta si estás en producción
  
  // Opcional: Para verificar en consola qué URL se está usando
  // console.log('API Base URL en uso:', API_BASE_URL);
  
  const isLoading = ref(true);
  const userId = ref(null);
  
  const profileForm = reactive({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    email: '',
  });
  
  const passwordForm = reactive({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const errors = ref({});
  const submissionStatus = ref(null);
  const passwordChangeStatus = ref(null);
  
  const clearError = (field) => {
    if (errors.value[field]) {
      delete errors.value[field];
    }
    if (errors.value.profile && ['firstName', 'lastName', 'phoneNumber', 'address', 'email'].includes(field)) {
      delete errors.value.profile;
    }
    if (errors.value.password && ['currentPassword', 'newPassword', 'confirmPassword'].includes(field)) {
      delete errors.value.password;
    }
  };
  
  const validateProfileForm = () => {
    let isValid = true;
    errors.value = {};
  
    if (!profileForm.firstName.trim()) {
      errors.value.firstName = 'El nombre es obligatorio.';
      isValid = false;
    }
    if (!profileForm.lastName.trim()) {
      errors.value.lastName = 'El apellido es obligatorio.';
      isValid = false;
    }
    if (!profileForm.phoneNumber.trim()) {
      errors.value.phoneNumber = 'El número de teléfono es obligatorio.';
      isValid = false;
    } else if (!/^\d{9}$/.test(profileForm.phoneNumber.trim())) {
      errors.value.phoneNumber = 'El número de teléfono debe tener 9 dígitos.';
      isValid = false;
    }
    if (!profileForm.address.trim()) {
      errors.value.address = 'La dirección es obligatoria.';
      isValid = false;
    }
    if (!profileForm.email.trim()) {
      errors.value.email = 'El email es obligatorio.';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileForm.email.trim())) {
      errors.value.email = 'Introduce un email válido.';
      isValid = false;
    }
  
    return isValid;
  };
  
  const validatePasswordForm = () => {
    let isValid = true;
    errors.value = {};
  
    if (!passwordForm.currentPassword.trim()) {
      errors.value.currentPassword = 'La contraseña actual es obligatoria.';
      isValid = false;
    }
    if (!passwordForm.newPassword.trim()) {
      errors.value.newPassword = 'La nueva contraseña es obligatoria.';
      isValid = false;
    } else if (passwordForm.newPassword.length < 6) {
      errors.value.newPassword = 'La nueva contraseña debe tener al menos 6 caracteres.';
      isValid = false;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.value.confirmPassword = 'Las nuevas contraseñas no coinciden.';
      isValid = false;
    }
  
    return isValid;
  };
  
  const fetchCustomerProfile = async () => {
    isLoading.value = true;
    userId.value = localStorage.getItem('user_id');
    profileForm.email = localStorage.getItem('user_email');
  
    if (!userId.value) {
      console.error("User ID no encontrado en localStorage.");
      isLoading.value = false;
      errors.value.profile = 'No se pudo cargar el perfil: ID de usuario no encontrado.';
      return;
    }
  
    try {
      const customerResponse = await fetch(`${API_BASE_URL}/profile/customer/${userId.value}`);
      if (!customerResponse.ok) {
        const errorData = await customerResponse.json();
        throw new Error(errorData.detail || `Error al cargar datos del cliente: ${customerResponse.statusText}`);
      }
      const customerData = await customerResponse.json();
      profileForm.firstName = customerData.first_name || '';
      profileForm.lastName = customerData.last_name || '';
      profileForm.phoneNumber = customerData.phone_number || '';
      profileForm.address = customerData.address || '';
  
    } catch (error) {
      console.error('Error al cargar la configuración del cliente:', error);
      submissionStatus.value = 'error';
      errors.value.profile = error.message || 'No se pudieron cargar los datos del perfil.';
    } finally {
      isLoading.value = false;
    }
  };
  
  const saveProfile = async () => {
    submissionStatus.value = null;
    if (!validateProfileForm()) {
      submissionStatus.value = 'error';
      errors.value.profile = 'Por favor, corrige los errores en el formulario.';
      return;
    }
  
    submissionStatus.value = 'submitting';
    try {
      const customerUpdateResponse = await fetch(`${API_BASE_URL}/profile/customer/${userId.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: profileForm.firstName,
          last_name: profileForm.lastName,
          phone_number: profileForm.phoneNumber,
          address: profileForm.address,
        }),
      });
  
      if (!customerUpdateResponse.ok) {
        const errorData = await customerUpdateResponse.json();
        throw new Error(errorData.detail || 'Error al actualizar los datos del cliente.');
      }
  
      const emailUpdateResponse = await fetch(`${API_BASE_URL}/users/${userId.value}/change-email`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: profileForm.email }),
      });
  
      if (!emailUpdateResponse.ok) {
        const errorData = await emailUpdateResponse.json();
        throw new Error(errorData.detail || 'Error al actualizar el email.');
      }
  
      submissionStatus.value = 'success';
      localStorage.setItem('user_email', profileForm.email);
      setTimeout(() => { submissionStatus.value = null; }, 3000);
  
    } catch (error) {
      console.error('Error al guardar el perfil:', error);
      submissionStatus.value = 'error';
      errors.value.profile = error.message || 'Error de conexión o servidor al guardar el perfil.';
    }
  };
  
  const changePassword = async () => {
    passwordChangeStatus.value = null;
    if (!validatePasswordForm()) {
      passwordChangeStatus.value = 'error';
      errors.value.password = 'Por favor, corrige los errores en el formulario de contraseña.';
      return;
    }
  
    passwordChangeStatus.value = 'submitting';
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId.value}/change-password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          current_password: passwordForm.currentPassword,
          new_password: passwordForm.newPassword,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error al cambiar la contraseña.');
      }
  
      passwordChangeStatus.value = 'success';
      passwordForm.currentPassword = '';
      passwordForm.newPassword = '';
      passwordForm.confirmPassword = '';
      setTimeout(() => { passwordChangeStatus.value = null; }, 3000);
  
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      passwordChangeStatus.value = 'error';
      errors.value.password = error.message || 'Error de conexión o servidor al cambiar la contraseña.';
    }
  };
  
  onMounted(() => {
    fetchCustomerProfile();
  });
</script>
  <style scoped>
  /* Spinner styling for animate-spin */
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  .spinner-border {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    vertical-align: -0.125em;
    border: 0.25em solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
  }
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  </style>q