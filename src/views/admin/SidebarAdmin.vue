<template>
    <aside class="w-64 bg-gray-800 text-white flex flex-col min-h-screen shadow-lg">
      <div class="p-4 border-b border-gray-700">
        <h2 class="text-2xl font-bold text-center text-pink-400">Admin Panel</h2>
      </div>
  
      <nav class="flex-grow p-4">
        <ul class="space-y-2">
          <li>
            <router-link
              :to="{ name: 'admin-images' }"
              class="flex items-center px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
              active-class="bg-gray-700 text-white font-semibold"
            >
              <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Gestión de Imágenes</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'admin-suppliers' }"
              class="flex items-center px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
              active-class="bg-gray-700 text-white font-semibold"
            >
              <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h2a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2m10-9V3a1 1 0 00-1-1H9a1 1 0 00-1 1v7m-4 7h12v4H4v-4zm0 0l-1.554-1.554A4 4 0 012 13v-2.091a1 1 0 01.328-.737l3-3A1 1 0 016.5 6h11A1 1 0 0118 6.5l3 3a1 1 0 01.328.737V13a4 4 0 01-.446 2.054L20 17z" />
              </svg>
              <span>Aprobaciones de Proveedores</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'admin-settings' }"
              class="flex items-center px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
              active-class="bg-gray-700 text-white font-semibold"
            >
              <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.262 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Configuraciones</span>
            </router-link>
          </li>
        </ul>
      </nav>
  
      <div class="p-4 border-t border-gray-700 mt-auto">
        <p class="text-sm text-gray-500 text-center">v1.0 Admin</p>
      </div>
    </aside>
  </template>
  
  <script>
  export default {
    name: 'SidebarAdmin',
  };
  </script>
  
  <style scoped>
  /*
    Los estilos ahora usan mayormente clases de Tailwind CSS en el template.
    Mantendremos aquí solo overrides o estilos muy específicos si es necesario.
  */
  
  /*
    Usamos `active-class="bg-gray-700 text-white font-semibold"` directamente en el router-link
    para controlar el estilo del enlace activo, lo cual es más idiomático con Vue Router 4.
    Así no necesitas la regla `.router-link-exact-active` en el <style> si no quieres más personalización.
  */
  </style>