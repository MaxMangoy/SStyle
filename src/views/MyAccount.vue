<!-- src/views/MyAccount.vue -->
<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold text-gray-800">Mi Cuenta</h1>
      <div v-if="user" class="mt-4">
        <p>Bienvenido, {{ user.name }}!</p>
        <p>Email: {{ user.email }}</p>
        <button 
          @click="handleLogout"
          class="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  
  const authStore = useAuthStore();
  const router = useRouter();
  const { user } = storeToRefs(authStore);
  
  const handleLogout = () => {
    authStore.logout();
    router.push('/');
  };
  </script>