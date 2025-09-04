<template>
  <section class="relative h-screen max-h-[800px] overflow-hidden group">
    <div class="absolute inset-0 z-0">
      <div class="relative h-full w-full">
        <transition
          :enter-active-class="currentDirection === 'next' ? 'carousel-slide-enter-next' : 'carousel-slide-enter-prev'"
          :leave-active-class="currentDirection === 'next' ? 'carousel-slide-leave-next' : 'carousel-slide-leave-prev'"
          mode="out-in"
        >
          <div v-if="currentSlide === 0" key="slide-0" class="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                 alt="Modelo con vestido de noche elegante en una pasarela con luces brillantes."
                 class="w-full h-full object-cover object-center transition-transform duration-1000 ease-out"
                 :class="{'scale-105': !isHovering, 'scale-100': isHovering}">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
          </div>
        </transition>

        <transition
          :enter-active-class="currentDirection === 'next' ? 'carousel-slide-enter-next' : 'carousel-slide-enter-prev'"
          :leave-active-class="currentDirection === 'next' ? 'carousel-slide-leave-next' : 'carousel-slide-leave-prev'"
          mode="out-in"
        >
          <div v-if="currentSlide === 1" key="slide-1" class="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                 alt="Modelo con un sofisticado traje elegante en una sesión de fotos urbana."
                 class="w-full h-full object-cover object-center transition-transform duration-1000 ease-out"
                 :class="{'scale-105': !isHovering, 'scale-100': isHovering}">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
          </div>
        </transition>

        <transition
          :enter-active-class="currentDirection === 'next' ? 'carousel-slide-enter-next' : 'carousel-slide-enter-prev'"
          :leave-active-class="currentDirection === 'next' ? 'carousel-slide-leave-next' : 'carousel-slide-leave-prev'"
          mode="out-in"
        >
          <div v-if="currentSlide === 2" key="slide-2" class="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                 alt="Modelo posando con un elegante abrigo de diseñador en un estudio minimalista."
                 class="w-full h-full object-cover object-center transition-transform duration-1000 ease-out"
                 :class="{'scale-105': !isHovering, 'scale-100': isHovering}">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
          </div>
        </transition>
      </div>
    </div>

    <div class="relative z-10 h-full flex flex-col justify-center items-center text-center px-6"
         @mouseenter="isHovering = true" @mouseleave="isHovering = false">
      <div class="max-w-3xl">
        <transition
          appear
          enter-active-class="animate-fade-in-up"
        >
          <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
            <span class="block">{{ slides[currentSlide].title }}</span>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 block mt-2">
              {{ slides[currentSlide].highlight }}
            </span>
          </h1>
        </transition>

        <transition
          appear
          enter-active-class="animate-fade-in-up delay-150"
        >
          <p class="text-lg md:text-xl text-gray-100 mb-8 max-w-xl mx-auto drop-shadow">
            {{ slides[currentSlide].description }}
          </p>
        </transition>

        <transition
          appear
          enter-active-class="animate-fade-in-up delay-300"
        >
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link
              to="/explore"
              class="px-10 py-4 bg-gradient-to-r from-purple-700 to-pink-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
            >
              Explorar Colección
            </router-link>
            <router-link
              to="/how-it-works"
              class="px-10 py-4 bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold rounded-full hover:bg-white/30 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75"
            >
              Cómo Funciona
            </router-link>
          </div>
        </transition>
      </div>
    </div>

    <div class="absolute bottom-8 left-0 right-0 z-10">
      <div class="container mx-auto px-6">
        <div class="flex justify-center items-center space-x-3">
          <button
            v-for="(slide, index) in slides"
            :key="index"
            @click="goToSlide(index)"
            class="w-3 h-3 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            :class="{'bg-white w-7': currentSlide === index, 'bg-white/40 w-3': currentSlide !== index}"
            :aria-label="`Ir a la diapositiva ${index + 1}`"
          ></button>
        </div>
      </div>
    </div>

    <button
      @click="prevSlide"
      class="hidden md:block absolute left-8 top-1/2 z-20 -translate-y-1/2 p-4 text-white/80 hover:text-white transition-all duration-300 transform -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
      aria-label="Diapositiva anterior"
    >
      <div class="relative w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </div>
    </button>
    <button
      @click="nextSlide"
      class="hidden md:block absolute right-8 top-1/2 z-20 -translate-y-1/2 p-4 text-white/80 hover:text-white transition-all duration-300 transform translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
      aria-label="Siguiente diapositiva"
    >
      <div class="relative w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Estado reactivo para el carrusel
const currentSlide = ref(0);
const currentDirection = ref('next'); // 'next' o 'prev' para controlar la dirección de la transición
const isHovering = ref(false); // Detecta si el ratón está sobre el carrusel para pausar el autoplay

// Datos de las diapositivas
const slides = [
  {
    title: "Alquila el",
    highlight: "Estilo que Deseas",
    description: "Prendas exclusivas de diseñador para tus ocasiones especiales, con envíos y devoluciones sencillas."
  },
  {
    title: "Nueva",
    highlight: "Colección Verano",
    description: "Descubre las últimas tendencias en moda premium para alquilar. ¡Renueva tu armario sin límites!"
  },
  {
    title: "Viste como",
    highlight: "Nunca Antes",
    description: "Cambia de look cada semana sin compromisos a largo plazo. Siempre a la moda, siempre tú."
  }
];

let slideInterval; // Variable para almacenar el ID del intervalo de tiempo

// Función para avanzar a la siguiente diapositiva
const nextSlide = () => {
  currentDirection.value = 'next';
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

// Función para retroceder a la diapositiva anterior
const prevSlide = () => {
  currentDirection.value = 'prev';
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
};

// Función para ir a una diapositiva específica
const goToSlide = (index) => {
  // Determina la dirección de la transición basada en la diferencia de índices
  currentDirection.value = index > currentSlide.value ? 'next' : 'prev';
  currentSlide.value = index;
};

// Inicia el carrusel automático
const startCarousel = () => {
  // Limpia cualquier intervalo existente para evitar duplicados y asegurar un solo intervalo activo
  clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    // Solo avanza si el ratón no está sobre el carrusel
    if (!isHovering.value) {
      nextSlide();
    }
  }, 5000); // Cambia de diapositiva cada 5 segundos
};

// Lifecycle hook: se ejecuta cuando el componente se monta en el DOM
onMounted(() => {
  startCarousel(); // Inicia el carrusel automático al montar el componente
});

// Lifecycle hook: se ejecuta cuando el componente se desmonta del DOM
onUnmounted(() => {
  clearInterval(slideInterval); // Limpia el intervalo para evitar fugas de memoria al desmontar
});
</script>

<style>
/* Animaciones personalizadas para las transiciones de imagen del carrusel */

/* Entra desde la derecha y se desvanece */
.carousel-slide-enter-next {
  animation: slideInFromRight 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; /* Curva de velocidad optimizada */
}
/* Sale hacia la izquierda y se desvanece */
.carousel-slide-leave-next {
  animation: slideOutToLeft 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

/* Entra desde la izquierda y se desvanece */
.carousel-slide-enter-prev {
  animation: slideInFromLeft 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
/* Sale hacia la derecha y se desvanece */
.carousel-slide-leave-prev {
  animation: slideOutToRight 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

/* Keyframes para el deslizamiento de entrada desde la derecha */
@keyframes slideInFromRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Keyframes para el deslizamiento de salida hacia la izquierda */
@keyframes slideOutToLeft {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-100%);
  }
}

/* Keyframes para el deslizamiento de entrada desde la izquierda */
@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Keyframes para el deslizamiento de salida hacia la derecha */
@keyframes slideOutToRight {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

/* Animación de entrada de contenido de texto (fade-in-up) */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px); /* Ligeramente desde abajo */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Clases de utilidad de Tailwind para aplicar animaciones con retardos */
.animate-fade-in-up {
  animation: fadeInUp 0.7s ease-out forwards;
}
.animate-fade-in-up.delay-150 { animation-delay: 0.15s; }
.animate-fade-in-up.delay-300 { animation-delay: 0.3s; }

/* Nota: El efecto parallax en las imágenes es manejado directamente por las clases de Tailwind
   `scale-105` y `scale-100` junto con la lógica de `isHovering` y la transición `transition-transform`.
   No se requiere CSS adicional para la clase `.transform` si solo es un marcador. */
</style>