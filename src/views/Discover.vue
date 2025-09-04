<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 font-sans text-gray-800 antialiased flex flex-col">
      <Header /> 
  
      <div class="flex-grow flex items-center justify-center text-center px-6 py-12">
        <div class="max-w-2xl mx-auto bg-white p-10 md:p-16 rounded-3xl shadow-xl border border-gray-100 transform transition-all duration-500 hover:scale-[1.01]">
          <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight animate-fade-in-down">
            ¡Descubre la Moda! <span class="text-pink-600">Próximamente</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed animate-fade-in-up">
            Estamos preparando una experiencia de descubrimiento única, donde encontrarás las últimas tendencias, colecciones exclusivas y piezas que te inspirarán.
          </p>
          <p class="text-md text-gray-600 animate-fade-in" style="animation-delay: 0.6s;">
            ¡Prepárate para explorar un mundo de estilo!
          </p>
          <div class="mt-10 animate-fade-in-up" style="animation-delay: 0.8s;">
            <router-link
              to="/"
              class="inline-block bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg
                     hover:bg-pink-700 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              Volver al Inicio
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Header from './Header.vue'; // <-- Asegúrate de que esta ruta sea correcta
  
  // No se necesita lógica adicional por ahora.
  </script>
  
  <style scoped>
  /* Animaciones básicas para mejorar la experiencia de "próximamente" */
  .animate-fade-in-down {
    animation: fadeInDown 0.8s ease-out forwards;
    opacity: 0;
  }
  
  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
    opacity: 0;
  }
  
  .animate-fade-in {
    animation: fadeIn 0.8s ease-out forwards;
    opacity: 0;
  }
  
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  </style>