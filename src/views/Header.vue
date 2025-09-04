<template>
  <header class="sticky top-0 z-50 bg-white shadow-lg">
    <div class="border-b border-gray-100">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <router-link to="/" class="flex items-center group">
            <img src="@/assets/imagenes/visteteya.jpeg" alt="VisteteYA Logo" class="h-10 w-10 rounded-full transition-transform duration-300 group-hover:scale-105">
            <span class="ml-2 text-2xl font-extrabold text-gray-900 leading-none">
              Vistete<span class="text-pink-600">YA</span>
            </span>
          </router-link>

          <nav class="hidden md:flex space-x-8">
            <router-link
              v-for="item in menuItems"
              :key="item.name"
              :to="item.path"
              class="text-gray-700 hover:text-pink-600 font-medium transition-all duration-200 py-2 px-3 rounded-md hover:bg-pink-50"
              active-class="text-pink-600 border-b-2 border-pink-600 pb-2 -mb-2"
              @click="handleMenuItemClick(item)"
            >
              {{ item.name }}
            </router-link>

            <router-link
              v-if="isLoggedIn && userRole === 'vendedor'"
              to="/dashboard-vendedor/add-product" class="text-pink-600 hover:text-pink-700 font-semibold transition-all duration-200 py-2 px-3 rounded-md hover:bg-pink-50 border border-pink-300"
              active-class="text-pink-600 border-b-2 border-pink-600 pb-2 -mb-2"
            >
              Panel Vendedor
            </router-link>
            </nav>

          <div class="flex items-center space-x-4">
            <button class="p-2 text-gray-600 hover:text-pink-600 transition-colors duration-200" aria-label="Buscar">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>

            <router-link to="/wishlist" class="relative p-2 text-gray-600 hover:text-pink-600 transition-colors duration-200" aria-label="Lista de deseos">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span v-if="favoritesCount > 0"
                    class="absolute -top-1.5 -right-1.5 bg-pink-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center animate-ping-once">
                {{ favoritesCount }}
              </span>
            </router-link>

            <div v-if="isLoggedIn && (userRole === 'cliente' || userRole === 'vendedor')" class="relative hidden md:flex items-center space-x-2 cursor-pointer group" @click="toggleProfileMenu">
                <div class="h-9 w-9 rounded-full bg-pink-100 flex items-center justify-center border-2 border-pink-500 transition-transform duration-300 group-hover:scale-105">
                    <svg class="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <span class="font-semibold text-gray-800 group-hover:text-pink-600 transition-colors duration-200">
                    {{ userFirstName || 'Mi Perfil' }}
                </span>

                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <div v-if="isProfileMenuOpen" class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none top-full">
                    <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                      <router-link v-if="userRole === 'cliente'" to="/myprofile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pink-600" role="menuitem" tabindex="-1" id="user-menu-item-0" @click="isProfileMenuOpen = false">
                        Mi Perfil
                      </router-link>
                      <router-link v-else-if="userRole === 'vendedor'" to="/dashboard-vendedor/add-product" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pink-600" role="menuitem" tabindex="-1" id="user-menu-item-1" @click="isProfileMenuOpen = false">
                        Panel Vendedor
                      </router-link>
                      <a href="#" @click.prevent="handleLogout" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700" role="menuitem" tabindex="-1" id="user-menu-item-2">
                        Cerrar sesión
                      </a>
                    </div>
                  </div>
                </transition>
            </div>

            <button
              v-else
              @click="goToLogin"
              type="button"
              class="hidden md:block bg-gradient-to-r from-pink-500 to-rose-600 text-white px-5 py-2.5 rounded-full font-semibold
                     hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-out"
            >
              Unirse
            </button>


            <button
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="md:hidden p-2 text-gray-600 hover:text-pink-600 transition-colors duration-200"
              aria-label="Abrir menú móvil"
            >
              <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white hidden md:block border-t border-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex overflow-x-auto py-3 space-x-6 hide-scrollbar">
          <button
            v-for="category in categories"
            :key="category.value"
            @click="handleCategoryClick(category.value)"
            class="whitespace-nowrap px-4 py-1.5 text-sm font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all duration-200"
            :class="{ 'bg-pink-100 text-pink-700 font-semibold shadow-sm': activeCategory === category.value }"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="transition-all duration-300 ease-out transform"
      leave-active-class="transition-all duration-200 ease-in transform"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden bg-white border-t border-pink-100 shadow-xl absolute w-full"
      >
        <div class="container mx-auto px-4 py-4">
          <nav class="flex flex-col divide-y divide-gray-100">
            <router-link
              v-for="item in menuItems"
              :key="item.name"
              :to="item.path"
              class="flex items-center justify-between py-3 px-3 transition-colors duration-200 rounded-md"
              :class="{
                'bg-pink-50 text-pink-600 font-semibold': route.path === item.path,
                'text-gray-800 hover:bg-gray-50 hover:text-pink-600': route.path !== item.path
              }"
              @click="isMobileMenuOpen = false"
            >
              <span class="text-base">{{ item.name }}</span>
              <svg
                v-if="route.path === item.path"
                class="h-5 w-5 text-pink-500 animate-fade-in-right"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>

            <router-link
              v-if="isLoggedIn && userRole === 'vendedor'"
              to="/dashboard-vendedor/add-product" class="flex items-center justify-between py-3 px-3 transition-colors duration-200 rounded-md"
              :class="{
                'bg-pink-50 text-pink-600 font-semibold': route.path === '/dashboard-vendedor/add-product', 'text-gray-800 hover:bg-gray-50 hover:text-pink-600': route.path !== '/dashboard-vendedor/add-product' }"
              @click="isMobileMenuOpen = false"
            >
              <span class="text-base">Panel Vendedor</span>
              <svg
                v-if="route.path === '/dashboard-vendedor/add-product'" class="h-5 w-5 text-pink-500 animate-fade-in-right"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
            <button
              v-if="isLoggedIn && (userRole === 'cliente' || userRole === 'vendedor')"
              @click="userRole === 'cliente' ? goToProfile() : goToDashboardVendedor()"
              type="button"
              class="w-full text-left py-3 px-3 mt-2 rounded-md bg-pink-50 text-pink-600 font-semibold
                     hover:bg-pink-100 transition-colors duration-200 flex items-center justify-start gap-2"
            >
              <div class="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center border border-pink-400">
                    <svg class="h-4 w-4 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
              <span>{{ userFirstName || 'Mi Perfil' }}</span>
            </button>

            <button
              v-if="isLoggedIn"
              @click="handleLogout"
              type="button"
              class="w-full text-left py-3 px-3 mt-2 rounded-md bg-red-500 text-white font-semibold
                     hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar sesión
            </button>

            <button
              v-else
              @click="goToLogin"
              type="button"
              class="w-full text-left py-3 px-3 mt-2 rounded-md bg-pink-500 text-white font-semibold
                     hover:bg-pink-600 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Unirse / Iniciar Sesión
            </button>
          </nav>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, watch, computed, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const menuItems = [
  { name: 'Inicio', path: '/' },
  { name: 'Diseñadores', path: '/designers' },
  { name: 'Ocasiones', path: '/occasions' },
];

const categories = [
  { name: 'Vestidos', value: 'vestidos' },
  { name: 'Trajes', value: 'trajes' },
  { name: 'Disfraces', value: 'disfraces' },
  { name: 'Zapatos', value: 'zapatos' },
  { name: 'Accesorios', value: 'accesorios' },
  { name: 'Nueva Colección', value: 'nueva-coleccion' },
  { name: 'Verano 2025', value: 'verano-2025' }
];

const favoritesCount = ref(3);
const isMobileMenuOpen = ref(false);
const isProfileMenuOpen = ref(false); // Nuevo estado para el menú desplegable del perfil
const activeCategory = ref(null);

const userFirstName = ref(null);
const userRole = ref(null);

const isLoggedIn = computed(() => {
  return localStorage.getItem('user_id') !== null;
});

const loadUserDataFromLocalStorage = () => {
  userFirstName.value = localStorage.getItem('user_first_name');
  userRole.value = localStorage.getItem('user_role');
};

watch(() => route.path, () => {
  isMobileMenuOpen.value = false;
  isProfileMenuOpen.value = false; // Cerrar el menú del perfil al navegar
});

// Cerrar el menú del perfil si se hace clic fuera de él
onMounted(() => {
  loadUserDataFromLocalStorage();
  window.addEventListener('storage', loadUserDataFromLocalStorage);
  document.addEventListener('click', closeProfileMenuOnClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('storage', loadUserDataFromLocalStorage);
  document.removeEventListener('click', closeProfileMenuOnClickOutside);
});

const closeProfileMenuOnClickOutside = (event) => {
  const profileMenuButton = document.querySelector('.group.relative'); // Selector del botón/contenedor del perfil
  if (isProfileMenuOpen.value && profileMenuButton && !profileMenuButton.contains(event.target)) {
    isProfileMenuOpen.value = false;
  }
};

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
};

const handleLogout = () => {
  localStorage.removeItem('user_id');
  localStorage.removeItem('user_email');
  localStorage.removeItem('user_role');
  localStorage.removeItem('user_first_name');
  userFirstName.value = null; // Limpiar los datos reactivos
  userRole.value = null;     // Limpiar los datos reactivos
  isProfileMenuOpen.value = false; // Cerrar el menú
  router.push('/login'); // Redirigir a la página de login
};

const handleMenuItemClick = (item) => {
  router.push(item.path);
  isMobileMenuOpen.value = false;
};

const handleCategoryClick = (category) => {
  activeCategory.value = category;
  console.log(`Categoría "${category}" clickeada.`);
};

const goToLogin = () => {
  router.push('/login')
    .then(() => {
      console.log('Redirección a /login exitosa.');
    })
    .catch((error) => {
      console.error('Error al intentar redirigir a /login:', error);
    });
  isMobileMenuOpen.value = false;
};

const goToProfile = () => {
  // CAMBIO AQUÍ: Redirige a /myprofile para clientes
  router.push('/myprofile'); 
  isProfileMenuOpen.value = false; // Asegurarse de cerrar el menú
  isMobileMenuOpen.value = false;
};

const goToDashboardVendedor = () => {
  // Ahora, el botón "Panel Vendedor" redirige directamente a AddProductForm
  router.push('/dashboard-vendedor/add-product'); 
  isProfileMenuOpen.value = false; // Asegurarse de cerrar el menú
  isMobileMenuOpen.value = false;
};
</script>

<style scoped>
/* Estilos existentes */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
@keyframes fade-in-right {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.animate-fade-in-right {
  animation: fade-in-right 0.3s ease-out forwards;
}
@keyframes ping-once {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  70% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-ping-once {
  animation: ping-once 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.transition-all {
  transition-property: all;
  transition-duration: var(--transition-duration, 0.3s);
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>