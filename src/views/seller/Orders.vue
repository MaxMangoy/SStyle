<template>
  <SellerDashboardLayout>
    <div class="container mx-auto px-5 py-8 max-w-6xl bg-white rounded-3xl shadow-2xl mt-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-extrabold text-gray-900">Gestión de Pedidos</h1>
        <button
          @click="exportOrdersToExcel"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
        >
          <svg class="-ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414zM10 3a1 1 0 011 1v7a1 1 0 11-2 0V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Exportar a Excel
        </button>
      </div>

      <p class="text-gray-600 mb-6 text-lg">
        Revisa el estado de tus ventas y gestiona cada pedido de tus clientes.
      </p>

      <div v-if="isLoading" class="animate-pulse space-y-4">
        <div class="h-10 bg-gray-200 rounded-md w-full"></div>
        <div class="space-y-3">
          <div class="grid grid-cols-6 gap-4">
            <div class="h-6 bg-gray-200 rounded col-span-1"></div>
            <div class="h-6 bg-gray-200 rounded col-span-1"></div>
            <div class="h-6 bg-gray-200 rounded col-span-1"></div>
            <div class="h-6 bg-gray-200 rounded col-span-1"></div>
            <div class="h-6 bg-gray-200 rounded col-span-1"></div>
            <div class="h-6 bg-gray-200 rounded col-span-1"></div>
          </div>
          <div v-for="n in 5" :key="n" class="grid grid-cols-6 gap-4 h-16 bg-gray-100 rounded-md">
            <div class="h-full bg-gray-200 rounded col-span-1"></div>
            <div class="h-full bg-gray-200 rounded col-span-1"></div>
            <div class="h-full bg-gray-200 rounded col-span-1"></div>
            <div class="h-full bg-gray-200 rounded col-span-1"></div>
            <div class="h-full bg-gray-200 rounded col-span-1"></div>
            <div class="h-full bg-gray-200 rounded col-span-1"></div>
          </div>
        </div>
      </div>

      <div v-else-if="orders.length === 0" class="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <svg class="mx-auto h-16 w-16 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <h3 class="mt-4 text-xl font-semibold text-gray-900">
          ¡No hay pedidos para mostrar!
        </h3>
        <p class="mt-2 text-md text-gray-600">
          Actualmente no tienes ningún pedido en tu lista.
        </p>
        <div class="mt-6">
          <router-link
            to="/dashboard-vendedor/articulos"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10 0a1 1 0 00-1 1v12a1 1 102 0V4a1 1 0 00-1-1zm-4 0a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1z" />
            </svg>
            Explorar mis Artículos
          </router-link>
        </div>
      </div>

      <div v-else class="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Pedido
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
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
            <tr v-for="order in orders" :key="order.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ order.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ order.customer }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ order.date }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                €{{ order.total.toFixed(2) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    {
                      'bg-green-100 text-green-800': order.status === 'Completado',
                      'bg-yellow-100 text-yellow-800': order.status === 'Pendiente',
                      'bg-red-100 text-red-800': order.status === 'Cancelado',
                      'bg-blue-100 text-blue-800': order.status === 'En Proceso' 
                    }
                  ]"
                >
                  {{ order.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="viewOrderDetails(order.id)" class="text-pink-600 hover:text-pink-900 inline-flex items-center">
                  Ver Detalles
                  <svg class="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <nav v-if="orders.length > 0" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-8 rounded-b-lg">
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
              <span class="font-medium">{{ orders.length }}</span>
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
import { useRouter } from 'vue-router';
import SellerDashboardLayout from './SellerDashboardLayout.vue'; 
import * as XLSX from 'xlsx'; // Importa la librería xlsx

const orders = ref([]);
const isLoading = ref(true); 

const router = useRouter(); 

const viewOrderDetails = (orderId) => {
  console.log(`Ver detalles del pedido: ${orderId}`);
  // router.push(`/dashboard-vendedor/pedidos/${orderId}`);
  alert(`Simulando ver detalles del pedido: ${orderId}`);
};

// Función para exportar pedidos a Excel
const exportOrdersToExcel = () => {
  if (orders.value.length === 0) {
    alert('No hay pedidos para exportar.');
    return;
  }

  // Definir las cabeceras de la tabla para el archivo Excel
  const headers = ["ID Pedido", "Cliente", "Fecha", "Total", "Estado"];

  // Mapear los datos de los pedidos para que coincidan con las cabeceras
  const data = orders.value.map(order => [
    order.id,
    order.customer,
    order.date,
    order.total.toFixed(2), // Asegura que el total esté en formato de dos decimales
    order.status
  ]);

  // Combinar cabeceras y datos
  const ws_data = [headers, ...data];

  // Crear una nueva hoja de cálculo
  const ws = XLSX.utils.aoa_to_sheet(ws_data);

  // Crear un nuevo libro de trabajo
  const wb = XLSX.utils.book_new();
  // Añadir la hoja de cálculo al libro de trabajo
  XLSX.utils.book_append_sheet(wb, ws, "Pedidos"); // "Pedidos" es el nombre de la hoja

  // Generar y descargar el archivo Excel
  // El nombre del archivo incluirá la fecha actual para que sea único
  const date = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD
  XLSX.writeFile(wb, `Pedidos_VisteteYA_${date}.xlsx`);
  
  alert('Pedidos exportados con éxito a Excel!');
};


onMounted(() => {
  console.log('Componente Orders montado. Cargando pedidos...');
  setTimeout(() => {
    isLoading.value = false;
    orders.value = [
      { id: 'ORD001', customer: 'Juan Pérez', date: '2023-01-15', total: 125.50, status: 'Completado' },
      { id: 'ORD002', customer: 'Maria García', date: '2023-01-16', total: 75.00, status: 'Pendiente' },
      { id: 'ORD003', customer: 'Carlos López', date: '2023-01-17', total: 200.75, status: 'Completado' },
      { id: 'ORD004', customer: 'Ana Fernández', date: '2023-01-18', total: 30.20, status: 'Cancelado' },
      { id: 'ORD005', customer: 'Pedro Gómez', date: '2023-01-19', total: 99.99, status: 'En Proceso' },
    ];
  }, 1500); 
});
</script>

<style scoped>
/* No se necesitan estilos adicionales ya que se usa principalmente Tailwind CSS */
</style>