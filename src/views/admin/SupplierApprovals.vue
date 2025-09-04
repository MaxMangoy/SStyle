<template>
    <div class="p-6 bg-gray-100 min-h-screen">
      <div class="max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          <i class="fas fa-handshake text-pink-600 mr-3"></i>Aprobaciones de Proveedores
        </h1>
        <p class="text-gray-600 text-lg text-center mb-8">
          Gestiona las solicitudes de nuevos proveedores.
        </p>
  
        <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong class="font-bold">¡Éxito!</strong>
          <span class="block sm:inline ml-2">{{ successMessage }}</span>
          <span @click="successMessage = null" class="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer">
            <svg class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.103l-2.651 3.746a1.2 1.2 0 1 1-1.697-1.697l3.746-2.651-3.746-2.651a1.2 1.2 0 0 1 1.697-1.697L10 8.897l2.651-3.746a1.2 1.2 0 0 1 1.697 1.697L11.103 10l3.746 2.651a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
  
        <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong class="font-bold">¡Error!</strong>
          <span class="block sm:inline ml-2">{{ errorMessage }}</span>
          <span @click="errorMessage = null" class="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer">
            <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.103l-2.651 3.746a1.2 1.2 0 1 1-1.697-1.697l3.746-2.651-3.746-2.651a1.2 1.2 0 0 1 1.697-1.697L10 8.897l2.651-3.746a1.2 1.2 0 0 1 1.697 1.697L11.103 10l3.746 2.651a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
  
        <div class="mb-6">
          <input
            type="text"
            v-model="filterTerm"
            placeholder="Buscar por nombre o email..."
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-base transition duration-150 ease-in-out"
          />
        </div>
  
        <div v-if="loading" class="flex justify-center items-center h-64">
          <svg class="animate-spin h-12 w-12 text-pink-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="ml-4 text-xl text-gray-700">Cargando proveedores...</p>
        </div>
  
        <div v-else-if="filteredSuppliers.length === 0" class="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-md text-center">
          <p class="text-lg font-semibold mb-2">
            <i class="fas fa-info-circle mr-2"></i>No hay solicitudes de proveedores pendientes.
          </p>
          <p class="text-sm">¡Excelente! Todos los proveedores han sido gestionados.</p>
        </div>
  
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha de Registro
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="supplier in filteredSuppliers" :key="supplier.id" class="hover:bg-gray-50 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img class="h-10 w-10 rounded-full object-cover" :src="getAvatarUrl(supplier.name)" alt="Avatar">
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ supplier.name }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ supplier.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(supplier.registration_date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    @click="openConfirmationDialog(supplier.id, 'approve')"
                    class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                  >
                    Aprobar
                  </button>
                  <button
                    @click="openConfirmationDialog(supplier.id, 'reject')"
                    class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                  >
                    Rechazar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <div v-if="showConfirmationDialog" class="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300">
        <div class="bg-white rounded-lg shadow-2xl p-8 max-w-sm w-full mx-auto transform transition-all duration-300 scale-105">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Confirmar Acción</h3>
          <p class="text-gray-700 mb-6">
            ¿Estás seguro de que deseas {{ actionType === 'approve' ? 'aprobar' : 'rechazar' }} a este proveedor? Esta acción es irreversible.
          </p>
          <div class="flex justify-end space-x-3">
            <button
              @click="closeConfirmationDialog"
              class="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              Cancelar
            </button>
            <button
              @click="confirmAction"
              :class="[actionType === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700', 'text-white font-bold py-2 px-5 rounded-md focus:outline-none focus:ring-2', actionType === 'approve' ? 'focus:ring-green-500' : 'focus:ring-red-500', 'focus:ring-offset-2 transition duration-150 ease-in-out']"
            >
              {{ actionType === 'approve' ? 'Sí, Aprobar' : 'Sí, Rechazar' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template><script setup>
  import { ref, onMounted, computed } from 'vue';
  import axios from 'axios';
  
  // --- CAMBIO CLAVE AQUÍ ---
  // Determina la URL base del backend según el entorno
  const API_BASE_URL = import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_APP_API_URL_LOCAL  // Usa tu URL local si estás en desarrollo
    : import.meta.env.VITE_APP_API_URL_PRODUCTION; // Usa tu URL de producción en otro caso (como al hacer build para desplegar)
  
  // Opcional: Para verificar en consola qué URL se está usando
  // console.log('API Base URL en uso:', API_BASE_URL);

  const pendingSuppliers = ref([]);
  const loading = ref(true);
  const errorMessage = ref(null);
  const successMessage = ref(null);
  const filterTerm = ref('');
  
  const showConfirmationDialog = ref(false);
  const selectedSupplierId = ref(null);
  const actionType = ref(''); // 'approve' or 'reject'
  
  // Computed property para filtrar los proveedores
  const filteredSuppliers = computed(() => {
    if (!filterTerm.value) {
      return pendingSuppliers.value;
    }
    const lowerCaseFilter = filterTerm.value.toLowerCase();
    return pendingSuppliers.value.filter(supplier =>
      supplier.name.toLowerCase().includes(lowerCaseFilter) ||
      supplier.email.toLowerCase().includes(lowerCaseFilter)
    );
  });
  
  // Función para obtener la URL de la imagen del avatar (inicial del nombre)
  const getAvatarUrl = (name) => {
    const initial = name ? name.charAt(0).toUpperCase() : '?';
    // Puedes usar un servicio de avatares como DiceBear o simplemente un color de fondo dinámico
    // Para este ejemplo, solo usaremos el carácter inicial, podrías reemplazarlo con algo más sofisticado
    return `https://ui-avatars.com/api/?name=${initial}&background=random&color=fff&size=128`;
  };
  
  // Función para formatear la fecha
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  
  // Función para cargar los proveedores pendientes
  const fetchSuppliers = async () => {
    loading.value = true;
    errorMessage.value = null;
    successMessage.value = null;
    try {
      const token = localStorage.getItem('authToken'); // Asume que guardas el token de autenticación
      if (!token) {
        errorMessage.value = 'No autenticado. Por favor, inicia sesión.';
        loading.value = false;
        return;
      }
      const response = await axios.get(`${API_BASE_URL}/admin/suppliers/pending`, { // Usando la variable dinámica
        headers: { Authorization: `Bearer ${token}` }
      });
      pendingSuppliers.value = response.data;
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      errorMessage.value = error.response?.data?.detail || 'Error al cargar proveedores. Intenta de nuevo.';
    } finally {
      loading.value = false;
    }
  };
  
  // Funciones para el modal de confirmación
  const openConfirmationDialog = (id, type) => {
    selectedSupplierId.value = id;
    actionType.value = type;
    showConfirmationDialog.value = true;
  };
  
  const closeConfirmationDialog = () => {
    showConfirmationDialog.value = false;
    selectedSupplierId.value = null;
    actionType.value = '';
  };
  
  const confirmAction = async () => {
    closeConfirmationDialog(); // Cierra el modal inmediatamente
    errorMessage.value = null;
    successMessage.value = null;
  
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        errorMessage.value = 'No autenticado. Por favor, inicia sesión.';
        return;
      }
  
      let response;
      if (actionType.value === 'approve') {
        response = await axios.post(`${API_BASE_URL}/admin/suppliers/${selectedSupplierId.value}/approve`, {}, { // Usando la variable dinámica
          headers: { Authorization: `Bearer ${token}` }
        });
        successMessage.value = `Proveedor '${selectedSupplierId.value}' aprobado exitosamente.`;
      } else if (actionType.value === 'reject') {
        response = await axios.post(`${API_BASE_URL}/admin/suppliers/${selectedSupplierId.value}/reject`, {}, { // Usando la variable dinámica
          headers: { Authorization: `Bearer ${token}` }
        });
        successMessage.value = `Proveedor '${selectedSupplierId.value}' rechazado exitosamente.`;
      }
  
      // Refrescar la lista de proveedores después de la acción
      await fetchSuppliers();
  
    } catch (error) {
      console.error(`Error ${actionType.value}ing supplier:`, error);
      errorMessage.value = error.response?.data?.detail || `Error al ${actionType.value === 'approve' ? 'aprobar' : 'rechazar'} el proveedor.`;
    }
  };
  
  // Cargar proveedores al montar el componente
  onMounted(() => {
    fetchSuppliers();
  });
</script>
  
  <style scoped>
  /*
    La mayoría de los estilos se manejan con clases de Tailwind CSS en el template.
    Aquí se pueden añadir estilos específicos si es absolutamente necesario
    o para overrides complejos.
  
    Font Awesome (para iconos de fas fa-handshake, fas fa-info-circle):
    Asegúrate de tener Font Awesome configurado en tu proyecto Vue.
    Si no lo tienes, puedes instalarlo:
    npm install --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/vue-fontawesome@latest
    Y configurarlo en tu main.js o similar:
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { fas } from '@fortawesome/free-solid-svg-icons'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    library.add(fas)
    app.component('font-awesome-icon', FontAwesomeIcon)
  
    O simplemente usar SVG puros como hicimos en SidebarAdmin si prefieres no instalar FA.
    Para este ejemplo, he mantenido los SVG de los iconos principales y he puesto
    comentarios para los iconos de FA que podrías usar si lo instalas.
  */
  </style>