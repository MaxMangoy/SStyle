<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 font-sans text-gray-800 antialiased">
    <Header />

    <section class="relative overflow-hidden py-24 md:py-36 bg-gray-900 text-white animate-fade-in">
      <div class="absolute inset-0 z-0">
        <img
          src="http://googleusercontent.com/image_collection/image_retrieval/10012029198911776696"
          alt="Fondo de moda abstracto"
          class="w-full h-full object-cover opacity-60"
        >
        <div class="absolute inset-0 bg-gradient-to-r from-pink-800/60 via-purple-900/70 to-black/80"></div>
      </div>

      <div class="container mx-auto px-6 relative z-10 text-center">
        <div class="max-w-4xl mx-auto animate-slide-up">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight drop-shadow-xl tracking-tight text-white">
            Descubre el <span class="text-pink-400">Talento</span> de la Moda Peruana
          </h1>
          <p class="text-base md:text-lg text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
            Conecta con los diseñadores que están redefiniendo el estilo con creatividad, tradición e innovación.
          </p>
          <div class="relative max-w-xl mx-auto shadow-2xl rounded-full focus-within:ring-4 focus-within:ring-pink-300 transition-all duration-300">
            <input
              type="text"
              placeholder="Buscar diseñadores, marcas o estilos..."
              class="w-full pl-14 pr-6 py-3 border-0 rounded-full
                     focus:ring-0 focus:outline-none bg-white text-base text-gray-800 placeholder-gray-500
                     shadow-inner"
              aria-label="Buscar diseñadores"
            >
            <svg class="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent z-10"></div>
    </section>

    <section class="container mx-auto px-6 pt-48 pb-12 md:pb-20 animate-fade-in-up">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 space-y-5 md:space-y-0">
        <div>
          <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 relative inline-block">
            Diseñadores <span class="text-pink-600">Verificados</span>
            <span class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-75"></span>
          </h2>
          <p class="text-base text-gray-700 max-w-2xl">
            Explora el talento y la calidad excepcional de los creadores de moda más influyentes del Perú.
          </p>
          <p class="text-pink-600 font-semibold mt-2 text-sm md:text-base animate-pulse">
            ¡Pronto se unirán muchos más diseñadores!
          </p>
        </div>
        <div class="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-5 w-full md:w-auto">
          <div class="relative w-full sm:w-auto min-w-[180px]">
              <select
                  class="block w-full bg-white border border-gray-300 rounded-lg px-5 py-2.5 pr-10 text-gray-700 text-sm
                         focus:ring-2 focus:ring-pink-400 focus:border-pink-400 appearance-none shadow-sm transition-all duration-300 hover:border-pink-300"
                  aria-label="Filtrar diseñadores por ciudad"
              >
                  <option disabled selected class="text-gray-500">Filtrar por ciudad</option>
                  <option>Lima</option>
                  <option>Cusco</option>
                  <option>Arequipa</option>
                  <option>Trujillo</option>
                  <option>Piura</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
              </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
        <div
          v-for="designer in designers"
          :key="designer.id"
          class="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl
                 transition-all duration-300 transform hover:-translate-y-2 group
                 border border-gray-100 hover:border-pink-200"
        >
          <router-link :to="`/designers/${designer.slug}`" class="block">
            <div class="relative w-full aspect-video overflow-hidden">
              <img :src="designer.coverImage" :alt="designer.brand" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

              <div v-if="designer.verified" class="absolute top-3 right-3 z-10 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Verificado
              </div>

              <div class="absolute bottom-4 left-4 flex items-end">
                <div class="relative flex-shrink-0">
                  <img :src="designer.avatar" :alt="designer.name" class="w-14 h-14 rounded-full border-3 border-white shadow-lg object-cover">
                </div>
                <div class="ml-2.5 text-left p-1 rounded-md backdrop-filter backdrop-blur-sm bg-black/30">
                  <h3 class="font-extrabold text-white text-lg drop-shadow-md leading-tight">{{ designer.name }}</h3>
                  <span class="text-xs text-white bg-pink-500 px-2 py-0.5 rounded-full font-semibold mt-0.5 inline-block shadow-sm">{{ designer.location }}</span>
                </div>
              </div>
            </div>

            <div class="p-5">
              <div class="flex justify-between items-start mb-2.5">
                <div>
                  <h3 class="font-extrabold text-lg text-gray-900 leading-tight">{{ designer.brand }}</h3>
                  <p class="text-sm text-pink-600 font-semibold">{{ designer.specialty }}</p>
                </div>
                <span class="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-medium shadow-inner">{{ designer.yearsActive }}+ años</span>
              </div>

              <p class="text-sm text-gray-600 mb-3 line-clamp-3 leading-relaxed">{{ designer.description }}</p>

              <div class="flex justify-between items-center pt-2.5 border-t border-gray-100">
                <div class="flex items-center">
                  <div class="flex mr-1.5">
                    <svg v-for="i in 5" :key="i" class="h-3.5 w-3.5" :class="i <= designer.rating ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span class="text-xs font-medium text-gray-600">{{ designer.rating }}.0 ({{ designer.reviews }} reseñas)</span>
                </div>
                <router-link
                  :to="`/designers/${designer.slug}/collections`"
                  class="text-sm font-semibold text-pink-600 hover:text-pink-700 transition-colors flex items-center group-hover:underline"
                  aria-label="Ver colecciones del diseñador"
                >
                  Ver {{ designer.collections }} colecciones
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </router-link>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <section class="bg-gradient-to-r from-pink-700 to-purple-800 py-16 text-white animate-fade-in">
      <div class="container mx-auto px-6 text-center">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl md:text-3xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            ¿Eres diseñador peruano y quieres <span class="text-yellow-300">destacar</span>?
          </h2>
          <p class="text-base md:text-lg mb-8 opacity-95 max-w-2xl mx-auto leading-relaxed">
            Únete a nuestra plataforma y lleva tu talento al siguiente nivel con exposición internacional y clientes exclusivos.
          </p>
          <router-link
            to="/register?type=designer"
            class="inline-block bg-white text-pink-700 hover:bg-gray-100 font-extrabold py-3.5 px-8 rounded-full
                   transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-base"
          >
            Regístrate como Diseñador
          </router-link>
        </div>
      </div>
    </section>

    <footer class="bg-gray-950 text-white py-10 md:py-14">
      <div class="container mx-auto px-6 sm:px-8 lg:px-10">
        <div class="md:hidden space-y-4">
          <div v-for="(section, index) in mobileSections" :key="index" class="bg-gray-900 rounded-lg shadow-md border border-gray-800">
            <button
              @click="toggleSection(index)"
              class="flex justify-between items-center w-full text-left font-bold py-3 px-4 text-base text-white rounded-t-lg focus:outline-none"
            >
              <span>{{ section.title }}</span>
              <svg
                class="w-5 h-5 transition-transform duration-300"
                :class="{ 'transform rotate-180': openSections[index] }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <transition
              enter-active-class="transition-all duration-300 ease-out"
              leave-active-class="transition-all duration-200 ease-in"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-screen"
              leave-from-class="opacity-100 max-h-screen"
              leave-to-class="opacity-0 max-h-0"
            >
              <div
                v-show="openSections[index]"
                class="px-4 pb-4 space-y-2.5 overflow-hidden text-gray-400"
              >
                <router-link
                  v-for="(link, linkIndex) in section.links"
                  :key="linkIndex"
                  :to="link.path"
                  class="block py-0.5 hover:text-pink-400 transition-colors text-sm"
                >
                  {{ link.label }}
                </router-link>
              </div>
            </transition>
          </div>

          <div class="pt-4">
            <button
              @click="navigateToRegister"
              class="w-full bg-pink-600 hover:bg-pink-700 text-white px-5 py-3.5 rounded-lg
                     transition transform hover:scale-[1.02] focus:outline-none text-base font-bold shadow-lg"
            >
              Subir mis prendas
            </button>
          </div>
        </div>

        <div class="hidden md:grid md:grid-cols-5 gap-8">
          <div class="col-span-2">
            <h3 class="text-xl font-extrabold mb-4 text-white leading-tight">VísteteYA</h3>
            <p class="text-gray-400 leading-relaxed max-w-sm text-sm">
              Tu pasarela digital para descubrir y conectar con el vibrante talento de la moda peruana. Innovación y tradición en cada diseño.
            </p>
            <div class="flex space-x-3 mt-4">
              <a href="#" class="text-gray-400 hover:text-pink-500 transition-colors">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22H12c5.523 0 10-4.477 10-10Z" clip-rule="evenodd" /></svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-pink-500 transition-colors">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.002 3.797.048 1.05.056 1.62.232 2.06.447.54.272.964.606 1.298.939.333.333.757.667.939 1.298-.215.44-.391.99-.447 2.06-.046 1.013-.048 1.371.048 3.797s-.002 2.784-.048 3.797c-.056 1.05-.232 1.62-.447 2.06-.272.54-.606.964-.939 1.298-.333.333-.757.667-.939 1.298-.215.44-.391.99-.447 2.06-.046 1.013-.048 1.371-.048-3.797S9.57 2 12.315 2Zm0 0c-2.43 0-2.784.002-3.797.048-1.05.056-1.62.232-2.06.447-.54.272-.606.964-.939 1.298-.333.333-.757.667-.939 1.298-.215.44-.391.99-.447 2.06-.046 1.013-.048 1.371-.048-3.797Z" />
              </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-pink-500 transition-colors">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816Zm-10.77 12.24-.038-.038c-.042-.042-.042-.109 0-.15l.038-.038a.097.097 0 0 1 .15 0c1.066 1.066 2.502 1.653 4.025 1.653 1.523 0 2.959-.587 4.025-1.653a.097.097 0 0 1 .15 0l.038.038c.042.042-.042-.109 0 .15l-.038.038c-1.066 1.066-2.502 1.653-4.025 1.653-1.523 0-2.959-.587-4.025-1.653a.109.109 0 0 1 0-.15Z" /></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 class="text-base font-bold mb-3 text-white">Navegación</h3>
            <ul class="space-y-1.5">
              <li><router-link to="/" class="text-gray-400 hover:text-pink-400 transition-colors text-sm">Inicio</router-link></li>
              <li><router-link to="/explore" class="text-gray-400 hover:text-pink-400 transition-colors text-sm">Explorar Prendas</router-link></li>
              <li><router-link to="/designers" class="text-gray-400 hover:text-pink-400 transition-colors text-sm">Diseñadores</router-link></li>
              <li><router-link to="/how-it-works" class="text-gray-400 hover:text-pink-400 transition-colors text-sm">Cómo Funciona</router-link></li>
              <li><router-link to="/faqs" class="text-gray-400 hover:text-pink-400 transition-colors text-sm">FAQs</router-link></li>
            </ul>
          </div>

          <div>
            <h3 class="text-base font-bold mb-3 text-white">Categorías</h3>
            <ul class="space-y-1.5">
              <li><router-link to="/explore?category=vestidos" class="text-gray-400 hover:text-pink-400 transition-colors text-sm">Vestidos de Noche</router-link></li>
              <li><router-link to="/explore?category=trajes" class="text-gray-400 hover:text-pink-400 transition-colors text-sm">Trajes Ejecutivos</router-link></li>
              <li><router-link to="/explore?category=disfraces" class="text-gray-400 hover:text-pink-400 transition-colors text-sm">Disfraces Temáticos</router-link></li>
              <li><router-link to="/explore?category=accesorios" class="text-gray-400 hover:text-pink-400 transition-colors text-sm">Accesorios Únicos</router-link></li>
            </ul>
          </div>

          <div>
            <h3 class="text-base font-bold mb-3 text-white">Contáctanos</h3>
            <p class="mb-1.5 text-gray-400 text-sm">Estamos aquí para ayudarte:</p>
            <a href="mailto:soporte@visteteya.com" class="text-pink-400 hover:underline hover:text-pink-300 transition-colors text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-1 10a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2v12z" />
              </svg>
              soporte@visteteYA.com
            </a>
            <p class="mt-1.5 text-gray-400 flex items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Lima, Perú
            </p>
          </div>

          <div>
            <h3 class="text-base font-bold mb-3 text-white">¿Eres un Creador?</h3>
            <p class="mb-2.5 text-gray-400 leading-relaxed text-sm">Únete a nuestra creciente comunidad de diseñadores y exhibe tu talento a una audiencia global.</p>
            <button
              @click="navigateToRegister"
              class="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md
                     transition transform hover:scale-105 text-sm font-semibold shadow-lg"
            >
              Comenzar ahora
            </button>
          </div>
        </div>

        <div class="border-t border-gray-800 pt-7 mt-10 text-center text-gray-500 text-sm">
          <p>© {{ new Date().getFullYear() }} VísteteYA. Todos los derechos reservados.</p>
          <div class="mt-3.5 flex justify-center space-x-5">
            <router-link to="/terms" class="hover:text-white transition-colors">Términos de Servicio</router-link>
            <router-link to="/privacy" class="hover:text-white transition-colors">Política de Privacidad</router-link>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Header from './Header.vue';

const router = useRouter();

// Datos de diseñadores. Inicialmente vacío, se llenará con la API.
const designers = ref([]);

// Función para obtener los diseñadores de una API
const fetchDesigners = async () => {
  try {
    // Aquí es donde harías la llamada a tu API backend.
    // Reemplaza '/api/designers' con la URL real de tu endpoint que devuelve los datos de la tabla 'sellers'.
    const response = await fetch('/api/designers'); 

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Mapea los datos de tu tabla 'sellers' a la estructura que tu componente Vue espera.
    designers.value = data.map(seller => ({
      id: seller.seller_id, 
      name: `${seller.first_name || ''} ${seller.last_name || ''}`.trim() || 'Diseñador Desconocido',
      slug: seller.seller_id, // Puedes generar un slug más amigable si tienes un campo de nombre de tienda único
      brand: seller.business_name || 'Marca Genérica', 
      specialty: 'Moda General', // Placeholder, ya que no hay una columna directa en 'sellers'
      description: 'Sin descripción disponible.', // Placeholder, ya que no hay una columna directa en 'sellers'
      location: seller.address ? seller.address.split(',')[0].trim() : 'Perú', // Extrae la ciudad de la dirección
      yearsActive: 0, // Placeholder
      rating: 0, // Placeholder
      reviews: 0, // Placeholder
      collections: 0, // Placeholder (Necesitarías una consulta separada o un join para esto)
      verified: false, // Placeholder (Añade un campo booleano para verificación si lo implementas)
      coverImage: 'https://via.placeholder.com/600x400/FFD1DC/FF69B4?text=Portada+Dise%C3%B1ador', // URL de imagen de portada (placeholder)
      avatar: 'https://randomuser.me/api/portraits/lego/1.jpg' // URL de imagen de avatar (placeholder)
    }));
  } catch (error) {
    console.error("Error al obtener los diseñadores:", error);
    // Puedes implementar una lógica para mostrar un mensaje de error al usuario aquí
  }
};

// Llama a la función para obtener los diseñadores cuando el componente se monta
onMounted(() => {
  fetchDesigners();
});

// Estado para acordeón móvil del footer
const openSections = ref([false, false, false]);
const mobileSections = ref([
  {
    title: 'Navegación',
    links: [
      { label: 'Inicio', path: '/' },
      { label: 'Explorar Prendas', path: '/explore' },
      { label: 'Diseñadores', path: '/designers' },
      { label: 'Cómo Funciona', path: '/how-it-works' },
      { label: 'FAQs', path: '/faqs' }
    ]
  },
  {
    title: 'Categorías',
    links: [
      { label: 'Vestidos de Noche', path: '/explore?category=vestidos' },
      { label: 'Trajes Ejecutivos', path: '/explore?category=trajes' },
      { label: 'Disfraces Temáticos', path: '/explore?category=disfraces' },
      { label: 'Accesorios Únicos', path: '/explore?category=accesorios' },
    ]
  },
  {
    title: 'Contáctanos',
    links: [
      { label: 'soporte@visteteya.com', path: 'mailto:soporte@visteteya.com' },
      { label: 'Lima, Perú', path: '#' }
    ]
  }
]);

const toggleSection = (index) => {
  openSections.value[index] = !openSections.value[index];
};

const navigateToRegister = () => {
  router.push('/Register');
};
</script>

<style scoped>
/* Base para animaciones de entrada */
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
  animation-delay: 0.2s; /* Pequeño retraso para que el fade-in sea primero */
  opacity: 0; /* Asegura que no sea visible antes de la animación */
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Sombras personalizadas para un look más premium */
.shadow-2xl {
  box-shadow: 0 20px 40px -8px rgba(0, 0, 0, 0.15), 0 8px 16px -4px rgba(0, 0, 0, 0.07);
}

.hover\:shadow-3xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.22), 0 10px 20px -5px rgba(0, 0, 0, 0.1);
}

/* Efecto de 'drop-shadow' para títulos grandes */
.drop-shadow-xl {
    filter: drop-shadow(0 6px 8px rgba(0,0,0,0.25)); /* Aumentado para mayor impacto */
}

/* Para ocultar la barra de desplazamiento en contenedores con overflow */
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}
.hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}

/* Transiciones para el acordeón móvil del footer */
.max-h-0 {
  max-height: 0;
}
.max-h-screen {
  max-height: 100vh; /* Suficientemente grande para cualquier contenido */
}

/* Estilos para el select personalizado */
select {
  background-image: none; /* Elimina la flecha predeterminada del select */
}

/* Animación para el mensaje de "Pronto se unirán..." */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 1.5s infinite;
}
</style>