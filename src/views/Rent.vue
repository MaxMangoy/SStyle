<!-- Rent.vue -->
<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold text-rose-900 mb-6">Proceso de Alquiler</h1>
      <p>Estás alquilando el producto con ID: {{ id }}</p>
      <!-- Aquí iría el formulario de alquiler -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'Rent',
    props: {
      id: {
        type: String,
        required: true
      }
    }
  }
  </script>