<template>
  <SellerDashboardLayout>
    <div class="container mx-auto px-5 py-8 max-w-6xl bg-white rounded-3xl shadow-2xl mt-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-extrabold text-gray-900">Mis Artículos Publicados</h1>
        <router-link
          to="/dashboard-vendedor/add-product"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
        >
          <svg class="-ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Publicar Nuevo Artículo
        </router-link>
      </div>

      <p class="text-gray-600 mb-6 text-lg">
        Aquí puedes ver y gestionar todos los artículos que tienes publicados en VisteteYA.
      </p>

      <div v-if="isLoading" class="animate-pulse space-y-4">
        <div class="h-10 bg-gray-200 rounded-md w-full"></div>
        <div class="space-y-3">
          <div class="grid grid-cols-5 gap-4">
            <div class="h-6 bg-gray-200 rounded col-span-1"></div>
            <div class="h-6 bg-gray-200 rounded col-span-2"></div>
            <div class="h-6 bg-gray-200 rounded col-span-1"></div>
            <div class="h-6 bg-gray-200 rounded col-span-1"></div>
          </div>
          <div v-for="n in 5" :key="n" class="grid grid-cols-5 gap-4 h-16 bg-gray-100 rounded-md">
            <div class="h-full bg-gray-200 rounded col-span-1"></div>
            <div class="h-full bg-gray-200 rounded col-span-2"></div>
            <div class="h-full bg-gray-200 rounded col-span-1"></div>
            <div class="h-full bg-gray-200 rounded col-span-1"></div>
          </div>
        </div>
      </div>

      <div v-else-if="articles.length === 0" class="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <svg class="mx-auto h-16 w-16 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        <h3 class="mt-4 text-xl font-semibold text-gray-900">
          ¡Aún no tienes artículos publicados!
        </h3>
        <p class="mt-2 text-md text-gray-600">
          Parece que no has añadido ningún producto. Empieza a vender tus prendas.
        </p>
        <div class="mt-6">
          <router-link
            to="/dashboard-vendedor/add-product"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Publicar mi primer artículo
          </router-link>
        </div>
      </div>

      <div v-else class="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Imagen
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre del Artículo
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio (PEN)
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="article in articles" :key="article.product_id"> <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden border border-gray-200">
                  <img class="h-full w-full object-cover" :src="article.imageUrl ? `${API_BASE_URL}${article.imageUrl}` : 'https://via.placeholder.com/150/CCCCCC/000000?text=No+Image'" :alt="article.name">
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ article.name }}</div>
                <div class="text-sm text-gray-500">{{ article.category }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                S/ {{ typeof article.price === 'number' ? article.price.toFixed(2) : 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  article.status === 'available' ? 'bg-green-100 text-green-800' :
                  article.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800',
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full'
                ]">
                  {{ getStatusText(article.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" class="text-pink-600 hover:text-pink-900 mr-4">Editar</a>
                <a href="#" class="text-red-600 hover:text-red-900">Eliminar</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <nav v-if="articles.length > 0" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-8 rounded-b-lg">
        <div class="flex-1 flex justify-between sm:hidden">
          <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Anterior
          </a>
          <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Siguiente
          </a>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Mostrando
              <span class="font-medium">1</span>
              a
              <span class="font-medium">{{ articles.length }}</span>
              de
              <span class="font-medium">X</span>
              resultados
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Previous</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </a>
              <a href="#" aria-current="page" class="z-10 bg-pink-50 border-pink-500 text-pink-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                1
              </a>
              <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                2
              </a>
              <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">
                3
              </a>
              <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
              <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">
                8
              </a>
              <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                9
              </a>
              <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                10
              </a>
              <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Next</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </nav>

    </div>
  </SellerDashboardLayout>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import SellerDashboardLayout from './SellerDashboardLayout.vue'; 

const isLoading = ref(true);
const articles = ref([]);
// --- CAMBIO CLAVE AQUÍ ---
// Determina la URL base del backend según el entorno
const API_BASE_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_APP_API_URL_LOCAL  // Usa tu URL local si estás en desarrollo
  : import.meta.env.VITE_APP_API_URL_PRODUCTION; // Usa tu URL de producción en otro caso (como al hacer build para desplegar)

// Opcional: Para verificar en consola qué URL se está usando
// console.log('API Base URL en uso:', API_BASE_URL);

const getStatusText = (status) => {
  switch (status) {
    case 'available':
      return 'Disponible';
    case 'unavailable':
      return 'No disponible';
    case 'draft':
      return 'Borrador';
    case 'activo':
      return 'Activo';
    case 'pendiente':
      return 'Pendiente';
    case 'inactivo':
      return 'Inactivo';
    default:
      return status;
  }
};

const fetchArticles = async () => {
  isLoading.value = true;
  try {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      console.error("User ID no encontrado en localStorage. No se pueden cargar los artículos.");
      articles.value = [];
      isLoading.value = false;
      return;
    }

    // Esta línea ya está buscando productos solo para el vendedor logueado
    const response = await fetch(`${API_BASE_URL}/products/seller/${userId}`); // Usando la variable dinámica
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Error al obtener los artículos');
    }
    const data = await response.json();
    articles.value = data;
  } catch (error) {
    console.error('Error al cargar los artículos:', error);
    articles.value = []; 
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchArticles();
});
</script>

<style scoped>
/* No se necesitan estilos adicionales ya que se usa principalmente Tailwind CSS */
</style>