<template> 
    <div class="flex flex-col min-h-screen bg-gray-50"> 
      <div 
        v-if="isSidebarOpen" 
        class="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" 
        @click="toggleSidebar" 
      ></div> 
   
      <header class="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-30"> 
        <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center"> 
          <button 
            @click="toggleSidebar" 
            class="md:hidden flex items-center text-gray-600 hover:text-pink-700 transition-colors duration-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500" 
            aria-label="Abrir menú" 
          > 
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /> 
            </svg> 
          </button> 
   
          <button 
            @click="goToDashboard" 
            class="hidden md:flex items-center text-gray-700 hover:text-pink-600 transition-colors duration-200 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 text-sm font-medium border border-gray-200 shadow-sm" 
            aria-label="Volver al Panel de Vendedor" 
          > 
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"> 
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /> 
            </svg> 
            Volver al Panel 
          </button> 
   
          <router-link 
            to="/" 
            class="flex items-center space-x-2 text-gray-900 hover:text-pink-700 transition-colors duration-200 group md:ml-0 ml-4" 
          > 
            <img src="@/assets/imagenes/visteteya.jpeg" alt="VisteteYA Logo" class="h-8 w-8 rounded-full shadow-sm"> 
            <span class="text-xl font-extrabold">Vistete<span class="text-pink-600">YA</span></span> 
          </router-link> 
   
          <nav class="flex space-x-6"> 
            <router-link 
              to="/" 
              class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-pink-700 transition-colors duration-200 py-2.5 px-4 rounded-full hover:bg-pink-50" 
              aria-label="Ir a la página de inicio" 
            > 
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"> 
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> 
              </svg> 
              Inicio 
            </router-link> 
          </nav> 
        </div> 
      </header> 
   
      <div> 
        <aside 
          :class="{ 
            'translate-x-0 ease-out': isSidebarOpen, 
            '-translate-x-full ease-in': !isSidebarOpen, 
            'md:translate-x-0': true // Siempre visible en MD+ 
          }" 
          class="fixed inset-y-0 left-0 w-64 bg-white text-gray-700 p-4 transform transition-transform duration-200 z-30 md:flex md:flex-col shadow-md border-r border-gray-100" 
          style="top: 4rem;" 
        > 
          <div class="flex items-center justify-between mb-2 mt-4 pl-1 pr-2"> 
            <span class="text-2xl font-extrabold text-pink-700">Vendedor Panel</span> 
            <button 
              @click="toggleSidebar" 
              class="md:hidden text-gray-600 hover:text-pink-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500" 
              aria-label="Cerrar menú" 
            > 
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /> 
              </svg> 
            </button> 
          </div> 
   
          <nav class="flex-1"> 
            <span class="text-xs font-semibold uppercase text-gray-400 mb-2 mt-6 ml-4 block">Gestión Principal</span> 
            <div class="space-y-2"> 
              <router-link 
                to="/dashboard-vendedor" 
                class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-700" 
                active-class="bg-pink-100 text-pink-800 hover:bg-pink-200" 
              > 
                <svg class="h-5 w-5 mr-3 inactive-icon-color" active-icon-color="text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> 
                Panel Principal 
              </router-link> 
              <router-link 
                to="/dashboard-vendedor/add-product" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-700" 
                exact-active-class="bg-pink-100 text-pink-800 hover:bg-pink-200" 
              > 
                <svg class="h-5 w-5 mr-3 inactive-icon-color" active-icon-color="text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg> 
                Publicar Nuevo Artículo 
              </router-link> 
            </div> 
   
            <hr class="border-t border-gray-200 my-4"> 
   
            <span class="text-xs font-semibold uppercase text-gray-400 mb-2 mt-4 ml-4 block">Tus Productos</span> 
            <div class="space-y-2"> 
              <router-link 
                to="/dashboard-vendedor/mis-articulos"  class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-700" 
                exact-active-class="bg-pink-100 text-pink-800 hover:bg-pink-200" 
              > 
                <svg class="h-5 w-5 mr-3 inactive-icon-color" active-icon-color="text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> 
                Mis Artículos 
              </router-link> 
              <router-link 
                to="/dashboard-vendedor/pedidos" 
                class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-700" 
                exact-active-class="bg-pink-100 text-pink-800 hover:bg-pink-200" 
              > 
                <svg class="h-5 w-5 mr-3 inactive-icon-color" active-icon-color="text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M10 12l-2 2-2-2" /></svg> 
                Pedidos 
              </router-link> 
            </div> 
   
            <hr class="border-t border-gray-200 my-4"> 
   
            <span class="text-xs font-semibold uppercase text-gray-400 mb-2 mt-4 ml-4 block">Configuración</span> 
            <div class="space-y-2"> 
              <router-link 
                to="/dashboard-vendedor/configuracion" 
                class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-700" 
                exact-active-class="bg-pink-100 text-pink-800 hover:bg-pink-200" 
              > 
                <svg class="h-5 w-5 mr-3 inactive-icon-color" active-icon-color="text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> 
                Configuración 
              </router-link> 
            </div> 
          </nav> 
        </aside> 
   
        <main class="flex-1 p-4 md:p-8 overflow-y-auto pt-16 md:ml-64"> 
          <slot></slot> </main> 
      </div> 
    </div> 
  </template> 
   
  <script setup> 
  import { ref } from 'vue'; 
  import { useRouter } from 'vue-router'; 
   
  const router = useRouter(); 
  const isSidebarOpen = ref(false); 
   
  const toggleSidebar = () => { 
    isSidebarOpen.value = !isSidebarOpen.value; 
  }; 
   
  const goToDashboard = () => { 
    router.push('/dashboard-vendedor'); 
  }; 
  </script> 
   
  <style scoped> 
  /* Estilos para el select box (si aplica a elementos dentro del layout) */ 
  select { 
    -webkit-appearance: none; 
    -moz-appearance: none; 
    appearance: none; 
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E"); 
    background-repeat: no-repeat; 
    background-position: right 0.75rem center; 
    background-size: 1.5em 1.5em; 
  } 
   
  /* Estilos para las imágenes de aspecto 1:1 (si aplica a elementos dentro del layout) */ 
  .aspect-w-1 { 
    position: relative; 
    padding-bottom: 100%; /* Crea un contenedor con relación de aspecto 1:1 */ 
  } 
   
  .aspect-h-1 { 
    position: absolute; 
    height: 100%; 
    width: 100%; 
    top: 0; 
    left: 0; 
  } 
   
  /* Estilos para los enlaces de router activos */ 
  /* Aplicado a todos los router-link cuando la ruta actual es un match (exacto o parcial) */ 
  .router-link-active { 
      @apply bg-pink-100 text-pink-800 hover:bg-pink-200; 
  } 
   
  /* Estilos para el icono dentro del router-link activo */ 
  .router-link-active .inactive-icon-color { 
      @apply text-pink-600; 
  } 
   
  /* Estilos para los enlaces de router con coincidencia exacta de ruta */ 
  .router-link-exact-active { 
      @apply bg-pink-100 text-pink-800 hover:bg-pink-200; 
  } 
   
  /* Estilos para el icono dentro del router-link con coincidencia exacta de ruta */ 
  .router-link-exact-active .inactive-icon-color { 
      @apply text-pink-600; 
  } 
   
  /* Estilo base para los íconos inactivos */ 
  .inactive-icon-color { 
      @apply text-gray-500; 
  } 
  </style>