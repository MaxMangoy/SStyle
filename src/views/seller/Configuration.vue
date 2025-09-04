<template>
  <SellerDashboardLayout>
    <div class="container mx-auto px-5 py-8 max-w-4xl bg-white rounded-3xl shadow-2xl mt-8">
      <h1 class="text-3xl font-extrabold text-gray-900 mb-8 text-center">Configuración del Vendedor</h1>
      <p class="text-gray-700 text-center mb-6">Aquí podrás gestionar la configuración de tu tienda y perfil de vendedor.</p>

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
            <div>
              <label for="storeName" class="block text-sm font-medium text-gray-700">Nombre de la Tienda (Razón Social):</label>
              <input type="text" id="storeName" v-model="profileForm.storeName" @input="clearError('storeName')" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500">
              <p v-if="errors.storeName" class="text-red-500 text-xs mt-1">{{ errors.storeName }}</p>
            </div>
            <div class="md:col-span-2">
              <label for="address" class="block text-sm font-medium text-gray-700">Dirección:</label>
              <input type="text" id="address" v-model="profileForm.address" @input="clearError('address')" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500">
              <p v-if="errors.address" class="text-red-500 text-xs mt-1">{{ errors.address }}</p>
            </div>
            <div class="md:col-span-2">
              <label for="bankAccount" class="block text-sm font-medium text-gray-700">Número de Cuenta Bancaria:</label>
              <input type="text" id="bankAccount" v-model="profileForm.bankAccount" @input="clearError('bankAccount')" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500">
              <p v-if="errors.bankAccount" class="text-red-500 text-xs mt-1">{{ errors.bankAccount }}</p>
            </div>
            <div class="md:col-span-2">
              <label for="contactEmail" class="block text-sm font-medium text-gray-700">Email de Contacto:</label>
              <input type="email" id="contactEmail" v-model="profileForm.email" @input="clearError('email')" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500">
              <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
            </div>

            <div class="md:col-span-2">
              <label for="qrImage" class="block text-sm font-medium text-gray-700 mb-2">QR de Yape/Plin (Opcional):</label>
              <div class="flex items-center space-x-4">
                <div v-if="profileForm.qrImageUrl" class="flex-shrink-0">
                  <img :src="getFullImageUrl(profileForm.qrImageUrl)" alt="QR Actual" class="w-24 h-24 object-contain border border-gray-300 rounded-lg shadow-sm p-1">
                  <p class="text-xs text-gray-500 mt-1 text-center">QR Actual</p>
                </div>
                <input
                  type="file"
                  id="qrImage"
                  @change="handleQrImageUpload"
                  accept="image/png, image/jpeg"
                  class="block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-pink-50 file:text-pink-700
                         hover:file:bg-pink-100"
                >
              </div>
              <p class="text-xs text-gray-500 mt-2">Sube una imagen PNG o JPG para tu QR de pago (Max. 2MB).</p>
              <p v-if="errors.qrImage" class="text-red-500 text-xs mt-1">{{ errors.qrImage }}</p>
              <p v-if="qrImageFile" class="text-sm text-gray-600 mt-2">Archivo seleccionado: <span class="font-medium">{{ qrImageFile.name }}</span></p>
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
  </SellerDashboardLayout>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import SellerDashboardLayout from './SellerDashboardLayout.vue';

// --- CAMBIO CLAVE AQUÍ ---
// Determina la URL base del backend según el entorno
const API_BASE_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_APP_API_URL_LOCAL  // Usa tu URL local si estás en desarrollo
  : import.meta.env.VITE_APP_API_URL_PRODUCTION; // Usa tu URL de producción en otro caso (como al hacer build para desplegar)

// Opcional: Para verificar en consola qué URL se está usando
// console.log('API Base URL en uso:', API_BASE_URL);

const isLoading = ref(true);
const userId = ref(null);

const profileForm = reactive({
  firstName: '',
  lastName: '',
  phoneNumber: '',
  storeName: '', // Mapeado a business_name en la DB
  bankAccount: '',
  email: '',
  address: '',
  qrImageUrl: '', // Nuevo campo para la URL de la imagen QR existente
});

const qrImageFile = ref(null); // Para el archivo de imagen QR que se va a subir

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const errors = ref({});
const submissionStatus = ref(null); // null, 'submitting', 'success', 'error' for profile updates
const passwordChangeStatus = ref(null); // null, 'submitting', 'success', 'error' for password changes

const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field];
  }
  // Clear overall submission error if a specific field error is cleared
  if (errors.value.profile && ['firstName', 'lastName', 'phoneNumber', 'storeName', 'bankAccount', 'email', 'address', 'qrImage'].includes(field)) {
    delete errors.value.profile;
  }
  if (errors.value.password && ['currentPassword', 'newPassword', 'confirmPassword'].includes(field)) {
    delete errors.value.password;
  }
};

const validateProfileForm = () => {
  let isValid = true;
  errors.value = {}; // Reset errors for profile form

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
  } else if (!/^\d{9}$/.test(profileForm.phoneNumber.trim())) { // Simple 9-digit phone number validation
    errors.value.phoneNumber = 'El número de teléfono debe tener 9 dígitos.';
    isValid = false;
  }
  if (!profileForm.storeName.trim()) {
    errors.value.storeName = 'El nombre de la tienda es obligatorio.';
    isValid = false;
  }
  if (!profileForm.bankAccount.trim()) {
    errors.value.bankAccount = 'La cuenta bancaria es obligatoria.';
    isValid = false;
  }
  if (!profileForm.address.trim()) {
    errors.value.address = 'La dirección es obligatoria.';
    isValid = false;
  }
  if (!profileForm.email.trim()) {
    errors.value.email = 'El email es obligatorio.';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileForm.email.trim())) { // Basic email validation
    errors.value.email = 'Introduce un email válido.';
    isValid = false;
  }

  // Validación para la imagen QR (opcional pero con validación de tipo/tamaño si se sube)
  if (qrImageFile.value) {
    const allowedTypes = ['image/png', 'image/jpeg'];
    if (!allowedTypes.includes(qrImageFile.value.type)) {
      errors.value.qrImage = 'Solo se permiten imágenes PNG o JPG.';
      isValid = false;
    }
    const maxSize = 2 * 1024 * 1024; // 2 MB
    if (qrImageFile.value.size > maxSize) {
      errors.value.qrImage = 'La imagen es demasiado grande (Máx. 2MB).';
      isValid = false;
    }
  }


  return isValid;
};

const validatePasswordForm = () => {
  let isValid = true;
  errors.value = {}; // Reset errors for password form

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

const getFullImageUrl = (relativePath) => {
  if (!relativePath) return '';
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }
  return `${API_BASE_URL}${relativePath}`; // Asume que las URLs relativas se basan en la URL base del backend
};

const fetchSellerProfile = async () => {
  isLoading.value = true;
  userId.value = localStorage.getItem('user_id'); // Asegúrate de que 'user_id' esté guardado en localStorage al iniciar sesión

  if (!userId.value) {
    console.error("User ID no encontrado en localStorage.");
    isLoading.value = false;
    errors.value.profile = 'No se pudo cargar el perfil: ID de usuario no encontrado.';
    return;
  }

  try {
    const sellerResponse = await fetch(`${API_BASE_URL}/profile/seller/${userId.value}`); // Usando la variable dinámica
    if (!sellerResponse.ok) {
      const errorData = await sellerResponse.json();
      throw new Error(errorData.detail || `Error al cargar datos del vendedor: ${sellerResponse.statusText}`);
    }
    const sellerData = await sellerResponse.json();
    profileForm.firstName = sellerData.first_name || '';
    profileForm.lastName = sellerData.last_name || '';
    profileForm.phoneNumber = sellerData.phone_number || '';
    profileForm.storeName = sellerData.business_name || ''; // Mapeado de business_name
    profileForm.bankAccount = sellerData.bank_account || '';
    profileForm.address = sellerData.address || '';
    profileForm.qrImageUrl = sellerData.qr_image_url || ''; // Asume que el backend envía esta URL

    profileForm.email = localStorage.getItem('user_email') || ''; // Asumiendo que el email se guarda como 'user_email'

  } catch (error) {
    console.error('Error al cargar la configuración del vendedor:', error);
    submissionStatus.value = 'error';
    errors.value.profile = error.message || 'No se pudieron cargar los datos del perfil.';
  } finally {
    isLoading.value = false;
  }
};

const handleQrImageUpload = (event) => {
  qrImageFile.value = event.target.files[0];
  clearError('qrImage'); // Clear any previous error on file change
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
    const formData = new FormData();
    formData.append('first_name', profileForm.firstName);
    formData.append('last_name', profileForm.lastName);
    formData.append('phone_number', profileForm.phoneNumber);
    formData.append('business_name', profileForm.storeName);
    formData.append('bank_account', profileForm.bankAccount);
    formData.append('address', profileForm.address);
    // No incluyas el email en este FormData si el backend lo maneja por separado
    // El email se actualiza con otro endpoint en tu código actual

    if (qrImageFile.value) {
      formData.append('qr_image', qrImageFile.value); // 'qr_image' debe coincidir con el nombre de campo esperado por tu backend
    }

    const sellerUpdateResponse = await fetch(`${API_BASE_URL}/profile/seller/${userId.value}`, {
      method: 'PUT',
      // No establecer 'Content-Type' para FormData; el navegador lo hace automáticamente con el boundary correcto
      body: formData,
    });

    if (!sellerUpdateResponse.ok) {
      const errorData = await sellerUpdateResponse.json();
      throw new Error(errorData.detail || 'Error al actualizar los datos del vendedor.');
    }

    // Actualización del email (separado como en tu código original)
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
    qrImageFile.value = null; // Clear the selected file after successful upload
    fetchSellerProfile(); // Re-fetch profile to display the new QR image URL if updated
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
    const response = await fetch(`${API_BASE_URL}/users/${userId.value}/change-password`, { // Usando la variable dinámica
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
    // Clear password fields on success
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
  fetchSellerProfile();
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
</style>