<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white font-sans antialiased text-gray-800">
    <main class="container mx-auto px-3 py-4 sm:px-4 lg:px-6 max-w-7xl">
      <!-- Filtros optimizados para móvil -->
      <section class="bg-white rounded-xl shadow-sm p-3 mb-6 border border-gray-100">
        <div class="max-w-3xl mx-auto text-center mb-3 sm:mb-4">
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-1 leading-tight">Descubre tu Próximo Estilo</h2>
          <p class="text-sm sm:text-base text-gray-600">Explora prendas únicas</p>
        </div>
        
        <!-- Filtros en modo acordeón para móvil -->
        <div class="space-y-2">
          <!-- Botón para mostrar/ocultar filtros en móvil -->
          <button @click="showFilters = !showFilters" class="sm:hidden w-full flex items-center justify-between text-sm font-medium text-gray-700 p-2 rounded-lg bg-gray-50 hover:bg-gray-100">
            <span>Filtros</span>
            <svg class="w-4 h-4 transition-transform duration-200" :class="{'rotate-180': showFilters}" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
          
          <!-- Contenedor de filtros -->
          <div :class="{'hidden sm:grid': !showFilters, 'grid': showFilters}" class="grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
            <!-- Categoría -->
            <div class="space-y-1">
              <label for="category-select" class="block text-xs sm:text-sm font-medium text-gray-600 sm:text-gray-700">Categoría</label>
              <div class="relative">
                <select id="category-select" v-model="filters.category" class="w-full text-xs sm:text-sm py-1.5 sm:py-2 pl-2 pr-6 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 appearance-none">
                  <option value="">Todas</option>
                  <option value="vestidos">Vestidos</option>
                  <option value="trajes">Trajes</option>
                  <option value="disfraces">Disfraces</option>
                  <option value="accesorios">Accesorios</option>
                  <option value="calzado">Calzado</option>
                  <option value="otro">Otros</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-400">
                  <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Talla -->
            <div class="space-y-1">
              <label for="size-select" class="block text-xs sm:text-sm font-medium text-gray-600 sm:text-gray-700">Talla</label>
              <div class="relative">
                <select id="size-select" v-model="filters.size" class="w-full text-xs sm:text-sm py-1.5 sm:py-2 pl-2 pr-6 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 appearance-none">
                  <option value="">Todas</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-400">
                  <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Precio máximo -->
            <div class="space-y-1">
              <label for="max-price-input" class="block text-xs sm:text-sm font-medium text-gray-600 sm:text-gray-700">Precio máx.</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none text-gray-500">
                  <span class="text-xs sm:text-sm">S/</span>
                </div>
                <input
                  type="number"
                  id="max-price-input"
                  v-model.number="filters.maxPrice"
                  placeholder="Máx."
                  class="w-full text-xs sm:text-sm py-1.5 sm:py-2 pl-6 sm:pl-8 pr-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
            </div>

            <!-- Tipo de oferta -->
            <div class="space-y-1">
              <label for="offer-type-select" class="block text-xs sm:text-sm font-medium text-gray-600 sm:text-gray-700">Oferta</label>
              <div class="relative">
                <select id="offer-type-select" v-model="filters.offerType" class="w-full text-xs sm:text-sm py-1.5 sm:py-2 pl-2 pr-6 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 appearance-none">
                  <option value="">Todas</option>
                  <option value="venta">Venta</option>
                  <option value="alquiler">Alquiler</option>
                  <option value="ambos">Ambos</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-400">
                  <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Botón limpiar -->
            <div class="col-span-2 sm:col-span-1 flex items-end">
              <button @click="clearFilters" class="w-full flex items-center justify-center text-xs sm:text-sm py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200">
                <svg class="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-gray-500 group-hover:text-gray-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                Limpiar
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Loading State -->
      <transition name="fade-in" appear v-if="isLoading">
        <div class="py-12 sm:py-16 flex flex-col items-center justify-center bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100">
          <div class="relative w-20 h-20 sm:w-24 sm:h-24 mb-4 sm:mb-6">
            <div class="absolute inset-0 rounded-full border-2 sm:border-3 border-pink-200 animate-spin"></div>
            <div class="absolute inset-2 sm:inset-3 rounded-full border-2 sm:border-3 border-pink-600 border-t-transparent animate-spin-slow"></div>
          </div>
          <p class="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">Buscando productos...</p>
          <p class="text-sm sm:text-base text-gray-500">Un momento, por favor.</p>
        </div>
      </transition>
 
      <!-- Error State -->
      <transition name="fade-in" appear v-else-if="fetchError">
        <div class="text-center py-12 sm:py-16 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100">
          <div class="max-w-md mx-auto">
            <svg class="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-red-400 mb-4 sm:mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 class="text-xl sm:text-2xl font-bold text-gray-800 mt-2 sm:mt-3 mb-1 sm:mb-2">¡Oops! Error al cargar</h3>
            <p class="text-sm sm:text-base text-gray-600 mt-1">No pudimos conectar con el servidor.</p>
            <button @click="fetchAllProducts" class="mt-6 sm:mt-8 flex items-center justify-center mx-auto px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-200 group">
              <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.582m-15.356-2A8.001 8.001 0 0119.418 15m0 0H15"></path>
              </svg>
              Reintentar
            </button>
          </div>
        </div>
      </transition>
 
      <!-- No Results State -->
      <transition name="fade-in" appear v-else-if="!isLoading && paginatedProducts.length === 0">
        <div class="text-center py-12 sm:py-16 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100">
          <div class="max-w-md mx-auto">
            <svg class="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-300 mb-4 sm:mb-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 class="text-xl sm:text-2xl font-bold text-gray-800 mt-2 sm:mt-3 mb-1 sm:mb-2">¡Lo sentimos!</h3>
            <p class="text-sm sm:text-base text-gray-600 mt-1">No encontramos productos con esos filtros.</p>
            <button @click="clearFilters" class="mt-6 sm:mt-8 flex items-center justify-center mx-auto px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-200 group">
              <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              Ver todos
            </button>
          </div>
        </div>
      </transition>
 
      <!-- Product Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        <article v-for="product in paginatedProducts" :key="product.product_id" 
          @click="openProductModal(product)"
          class="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group border border-gray-100 flex flex-col">
          
          <div class="relative w-full h-48 sm:h-56 bg-gray-50 overflow-hidden">
            <div v-if="product.image_urls && product.image_urls.length > 0" class="absolute inset-0 bg-gray-200">
              <img :src="getFullImageUrl(product.image_urls?.[0])" :alt="product.name" 
                class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105" 
                loading="lazy">
            </div>
            <div v-else-if="product.imageUrl" class="absolute inset-0 bg-gray-200">
              <img :src="getFullImageUrl(product.imageUrl)" :alt="product.name" 
                class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105" 
                loading="lazy">
            </div>
            <div v-else class="absolute inset-0 flex items-center justify-center text-gray-300">
              <svg class="w-12 h-12 sm:w-16 sm:h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 3h16a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2zm0 2v14h16V5H4zm2 2h12v10H6V7zM7 8h10v8H7V8zm5 0a3 3 0 100 6 3 3 0 000-6zm0 2a1 1 0 110 2 1 1 0 010-2z"/>
              </svg>
            </div>
            
            <div class="absolute bottom-2 right-2 flex space-x-1 z-10">
              <img v-if="product.image_urls?.[1]" :src="getFullImageUrl(product.image_urls[1])" :alt="`${product.name} - image 2`" 
                class="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md border border-white shadow-md transition-transform duration-300 transform group-hover:scale-110 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                style="transition-delay: 50ms;" loading="lazy">
              <img v-if="product.image_urls?.[2]" :src="getFullImageUrl(product.image_urls[2])" :alt="`${product.name} - image 3`" 
                class="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md border border-white shadow-md transition-transform duration-300 transform group-hover:scale-110 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                style="transition-delay: 100ms;" loading="lazy">
            </div>
            
            <div class="absolute top-2 left-2 flex flex-col space-y-1">
              <span class="px-2 py-0.5 text-xs font-bold text-white bg-pink-600 rounded-full animate-fade-in-up">{{ product.category }}</span>
              <span v-if="product.status === 'available'" class="px-2 py-0.5 text-xs font-bold text-white bg-green-500 rounded-full animate-fade-in-up animation-delay-100">Disponible</span>
              <span v-else-if="product.status === 'rented'" class="px-2 py-0.5 text-xs font-bold text-white bg-yellow-500 rounded-full animate-fade-in-up animation-delay-100">Alquilado</span>
              <span v-else-if="product.status === 'sold'" class="px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full animate-fade-in-up animation-delay-100">Vendido</span>
            </div>
            
            <div class="absolute top-2 right-2">
              <span class="px-1.5 py-0.5 text-[9px] sm:text-xs font-extrabold text-white bg-rose-600 rounded-full shadow-md animate-fade-in-right">{{ getProductDisplayPrice(product) }}</span>
            </div>
          </div>
 
          <div class="p-3 sm:p-4 flex-grow">
            <h3 class="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-1.5 leading-tight line-clamp-2">{{ capitalizeFirstLetter(product.name) }}</h3>
            <p class="text-xs text-gray-600 mb-1.5 sm:mb-2 line-clamp-2">{{ product.description }}</p>
            
            <div class="flex flex-wrap gap-1 mb-1.5 sm:mb-2">
              <span v-for="type in product.offer_types" :key="type"
                :class="['px-2 py-0.5 text-xs rounded-full animate-fade-in', 
                  {'bg-blue-600 text-white': type === 'venta', 
                   'bg-green-600 text-white': type === 'alquiler', 
                   'bg-pink-600 text-white': type === 'venta_alquiler' || type === 'ambos'}]">
                {{ getOfferTypeText(type) }}
              </span>
            </div>
 
            <div class="flex justify-between items-center mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-gray-100 text-[10px] sm:text-[11px] text-gray-500">
              <span class="flex items-center">
                <svg class="w-3 h-3 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                </svg>
                {{ formatDate(product.created_at) }}
              </span>
              <span class="flex items-center">
                <svg class="w-3 h-3 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path>
                </svg>
                Stock: {{ product.stock }}
              </span>
            </div>
          </div>
          <div class="p-3 sm:p-4 pt-0"> 
            <button
              v-if="product.offer_types && (product.offer_types.includes('venta') || product.offer_types.includes('ambos'))"
              @click.stop="navigateToBuyPage(product)"
              class="w-full flex items-center justify-center px-3 py-1.5 sm:py-2 bg-pink-600 text-white text-xs sm:text-sm rounded-lg hover:bg-pink-700 transition-colors duration-200"
            >
              <svg class="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63-.63-.182 1.703.707 1.703H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              Comprar
            </button>
            <button
              v-else-if="product.offer_types && (product.offer_types.includes('alquiler'))"
              @click.stop="navigateToBuyPage(product)"
              class="w-full flex items-center justify-center px-3 py-1.5 sm:py-2 bg-blue-600 text-white text-xs sm:text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <svg class="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Alquilar
            </button>
          </div>
        </article>
      </div>
 
      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <div class="text-xs sm:text-sm text-gray-600">
          Mostrando <span class="font-semibold text-gray-800">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> a 
          <span class="font-semibold text-gray-800">{{ Math.min(currentPage * itemsPerPage, filteredProducts.length) }}</span> de 
          <span class="font-semibold text-gray-800">{{ filteredProducts.length }}</span>
        </div>
        
        <div class="flex items-center space-x-1 sm:space-x-1.5">
          <button @click="currentPage--" :disabled="currentPage === 1"
            class="p-1.5 sm:p-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            :class="{'opacity-50 cursor-not-allowed': currentPage === 1}">
            <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span class="sr-only">Anterior</span>
          </button>
          
          <div class="flex items-center space-x-0.5 sm:space-x-1">
            <button v-for="page in visiblePages" :key="page"
              @click="currentPage = page"
              class="w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200"
              :class="page === currentPage ? 'bg-pink-600 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-100'">
              {{ page }}
            </button>
            <span v-if="showEllipsis" class="px-1 text-gray-500 text-xs">...</span>
          </div>
          
          <button @click="currentPage++" :disabled="currentPage === totalPages"
            class="p-1.5 sm:p-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            :class="{'opacity-50 cursor-not-allowed': currentPage === totalPages}">
            <span class="sr-only">Siguiente</span>
            <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
 
      <!-- Product Modal -->
      <transition name="modal-slide-fade">
        <div v-if="selectedProduct" class="fixed inset-0 z-50 overflow-y-auto">
          <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <transition name="modal-fade-overlay">
              <div class="fixed inset-0 transition-opacity" @click="closeProductModal">
                <div class="absolute inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm"></div>
              </div>
            </transition>
 
            <div class="inline-block align-bottom bg-white rounded-xl sm:rounded-2xl shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full overflow-hidden border border-gray-100">
              <div class="flex flex-col lg:flex-row">
                <div class="lg:w-1/2 p-3 sm:p-4 sm:p-5 bg-gray-50 flex flex-col items-center justify-center">
                  <div class="relative h-60 sm:h-72 w-full rounded-lg sm:rounded-xl overflow-hidden bg-white shadow-inner flex items-center justify-center border border-gray-200">
                    <img v-if="mainImageUrl" :src="mainImageUrl" :alt="selectedProduct.name" 
                      class="max-h-full max-w-full object-contain transition-opacity duration-300">
                    <div v-else class="text-gray-300">
                      <svg class="w-16 h-16 sm:w-20 sm:h-20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 3h16a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2zm0 2v14h16V5H4zm2 2h12v10H6V7zM7 8h10v8H7V8zm5 0a3 3 0 100 6 3 3 0 000-6zm0 2a1 1 0 110 2 1 1 0 010-2z"/>
                      </svg>
                    </div>
                  </div>
                  <div v-if="selectedProductImages.length > 1" class="mt-2 sm:mt-3 w-full px-0.5">
                    <div class="flex space-x-1 overflow-x-auto pb-0.5 hide-scrollbar justify-center">
                      <img v-for="(image, index) in selectedProductImages" :key="index"
                        :src="getFullImageUrl(image)"
                        :alt="`${selectedProduct.name} - thumbnail ${index + 1}`"
                        @click="setMainImage(image)"
                        class="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md border-2 cursor-pointer transition-all duration-200 shadow-sm"
                        :class="{'border-pink-500 ring-1 ring-pink-500 shadow-md scale-105': getFullImageUrl(image) === mainImageUrl, 'border-gray-200 hover:border-gray-400': getFullImageUrl(image) !== mainImageUrl}">
                    </div>
                  </div>
                </div>
                
                <div class="lg:w-1/2 p-3 sm:p-4 sm:p-5 flex flex-col">
                  <div class="flex-grow">
                    <div class="flex justify-between items-start mb-2 sm:mb-3 pb-2 border-b border-gray-100">
                      <div>
                        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-1.5 leading-tight">{{ capitalizeFirstLetter(selectedProduct.name) }}</h2>
                        <span class="inline-block px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs sm:text-xs font-semibold text-rose-700 bg-rose-100 border border-rose-200 shadow-sm">
                          {{ selectedProduct.category }}
                        </span>
                      </div>
                      <button @click="closeProductModal" class="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-full p-1 -mt-1 -mr-1">
                        <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                    
                    <div class="mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-100 flex items-center justify-between">
                      <div>
                        <p class="text-2xl sm:text-3xl font-bold text-pink-700">{{ getProductDisplayPrice(selectedProduct) }}</p>
                        <div class="flex items-center mt-0.5 text-xs text-gray-500">
                          <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                          </svg>
                          Publicado el {{ formatDate(selectedProduct.created_at) }}
                        </div>
                      </div>
                      <div v-if="selectedProduct.status === 'available'" class="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold text-white bg-green-500 animate-pulse">
                        Disponible
                      </div>
                      <div v-else-if="selectedProduct.status === 'rented'" class="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold text-white bg-yellow-500 animate-pulse">
                        Alquilado
                      </div>
                      <div v-else-if="selectedProduct.status === 'sold'" class="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold text-white bg-red-500 animate-pulse">
                        Vendido
                      </div>
                    </div>
                    
                    <div class="mb-3 sm:mb-4">
                      <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Descripción</h3>
                      <p class="text-gray-700 text-sm whitespace-pre-line leading-relaxed line-clamp-3">{{ selectedProduct.description }}</p>
                    </div>
                    
                    <div v-if="selectedProduct.offer_types && (selectedProduct.offer_types.includes('alquiler') || selectedProduct.offer_types.includes('ambos')) && selectedProduct.rental_details" 
                      class="mb-3 sm:mb-4 p-2 sm:p-3 bg-pink-50 rounded-lg border border-pink-100 shadow-sm">
                      <h3 class="text-sm sm:text-base font-semibold text-rose-800 mb-1 sm:mb-2 flex items-center">
                        <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-1.5 text-rose-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        Detalles de Alquiler
                      </h3>
                      <div class="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                        <div>
                          <p class="text-gray-600">Precio/día</p>
                          <p class="font-bold text-pink-700">S/ {{ selectedProduct.rental_details.pricePerDay ? selectedProduct.rental_details.pricePerDay.toFixed(2) : 'N/A' }}</p>
                        </div>
                        <div>
                          <p class="text-gray-600">Días min.</p>
                          <p class="font-bold text-pink-700">{{ selectedProduct.rental_details.min_days || '1' }}</p>
                        </div>
                        <div v-if="selectedProduct.rental_details.max_days">
                          <p class="text-gray-600">Días máx.</p>
                          <p class="font-bold text-pink-700">{{ selectedProduct.rental_details.max_days }}</p>
                        </div>
                        <div v-if="selectedProduct.rental_details.deposit_amount">
                          <p class="text-gray-600">Depósito</p>
                          <p class="font-bold text-pink-700">S/ {{ selectedProduct.rental_details.deposit_amount.toFixed(2) }}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div v-if="selectedProduct.variations && selectedProduct.variations.length > 0" class="mb-3 sm:mb-4">
                      <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Variaciones</h3>
                      <div class="grid grid-cols-2 gap-1.5 sm:gap-2 text-xs sm:text-sm">
                        <div v-for="(variation, index) in selectedProduct.variations" :key="index"
                          class="p-1.5 sm:p-2 border rounded-lg transition-all duration-200 hover:scale-[1.02] shadow-sm"
                          :class="{'border-pink-500 bg-pink-50 shadow-md': variation.stock > 0, 'border-gray-200 bg-gray-50 text-gray-400 opacity-70 cursor-not-allowed': variation.stock <= 0}">
                          <p class="font-medium text-gray-800" :class="{'text-gray-500': variation.stock <= 0}">Talla: <span class="font-semibold">{{ variation.size }}</span></p>
                          <p class="text-gray-600" :class="{'text-gray-400': variation.stock <= 0}">Color: <span class="font-semibold">{{ variation.color }}</span></p>
                          <p class="mt-0.5 font-bold" :class="{'text-green-600': variation.stock > 0, 'text-red-600': variation.stock <= 0}">
                            Stock: {{ variation.stock }}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div class="pt-2 sm:pt-3 border-t border-gray-200">
                      <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Información del Vendedor</h3>
                      <div class="space-y-1.5 sm:space-y-2">
                        <div class="flex items-center p-2 sm:p-2.5 bg-pink-50 rounded-lg border border-pink-100 shadow-sm">
                          <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-pink-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
                          </svg>
                          <p class="text-sm sm:text-base font-medium text-gray-800">{{ selectedProduct.seller_business_name || 'Nombre del Vendedor No Disponible' }}</p>
                        </div>
                        <div v-if="selectedProduct.seller_email" class="flex items-center p-2 sm:p-2.5 bg-white rounded-lg border border-gray-200 shadow-sm">
                          <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                          </svg>
                          <a :href="`mailto:${selectedProduct.seller_email}`" class="text-sm sm:text-base text-pink-600 hover:text-pink-800 font-medium hover:underline transition-colors duration-200">{{ selectedProduct.seller_email }}</a>
                        </div>
                        <div v-if="selectedProduct.seller_phone" class="flex items-center p-2 sm:p-2.5 bg-white rounded-lg border border-gray-200 shadow-sm">
                          <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M14.414 7l-5.707 5.707a1 1 0 01-1.414 0L3.586 10H5a1 1 0 010 2H.586a1 1 0 01-.707-1.707l5-5a1 1 0 011.414 0zM17 12a1 1 0 01-.707-.293l-5-5a1 1 0 011.414-1.414l5 5A1 1 0 0117 12z"></path>
                          </svg>
                          <a :href="`tel:${selectedProduct.seller_phone}`" class="text-sm sm:text-base text-pink-600 hover:text-pink-800 font-medium hover:underline transition-colors duration-200">{{ selectedProduct.seller_phone }}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button v-if="selectedProduct.offer_types && (selectedProduct.offer_types.includes('alquiler') || selectedProduct.offer_types.includes('ambos'))"
                      @click="navigateToBuyPage(selectedProduct)"
                      class="flex-1 flex items-center justify-center px-3 py-2 sm:py-2.5 bg-blue-600 text-white text-sm sm:text-base rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      Alquilar ahora
                    </button>
                    <button 
                      v-if="selectedProduct.offer_types && (selectedProduct.offer_types.includes('venta') || selectedProduct.offer_types.includes('ambos'))"
                      @click="navigateToBuyPage(selectedProduct)"
                      class="flex-1 flex items-center justify-center px-3 py-2 sm:py-2.5 bg-pink-600 text-white text-sm sm:text-base rounded-lg hover:bg-pink-700 transition-colors duration-200">
                      <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63-.63-.182 1.703.707 1.703H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                      Comprar ahora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </main>
  </div>
</template>
<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// --- Variable para controlar la visibilidad de los filtros en móvil ---
const showFilters = ref(false);

// --- CAMBIO CLAVE AQUÍ ---
const BASE_URL_BACKEND = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_APP_API_URL_LOCAL
  : import.meta.env.VITE_APP_API_URL_PRODUCTION;

const products = ref([]);
const isLoading = ref(true);
const fetchError = ref(false);
const selectedProduct = ref(null);
const mainImageUrl = ref('');
const selectedProductImages = ref([]);

const filters = reactive({
  category: '',
  size: '',
  maxPrice: null,
  offerType: '',
});

const currentPage = ref(1);
const itemsPerPage = 8;

const router = useRouter();

const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;
  const range = 2;
  
  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  }
  
  if (current <= range + 1) {
    for (let i = 1; i <= range * 2 + 1; i++) {
      pages.push(i);
    }
    if (total > range * 2 + 1 && current < total - range) {
        pages.push('...'); 
        pages.push(total);
    }
  } else if (current >= total - range) {
    pages.push(1);
    if (total > range * 2 + 1 && current > range + 1) {
        pages.unshift('...'); 
    }
    for (let i = total - range * 2; i <= total; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    pages.push('...'); 
    for (let i = current - range; i <= current + range; i++) {
      pages.push(i);
    }
    pages.push('...'); 
    pages.push(total);
  }
  
  return Array.from(new Set(pages));
});

const showEllipsis = computed(() => {
  return totalPages.value > 5 && 
    !(currentPage.value <= 3 || currentPage.value >= totalPages.value - 2);
});

const fetchAllProducts = async () => {
  isLoading.value = true;
  fetchError.value = false;
  try {
    const response = await axios.get(`${BASE_URL_BACKEND}/products`);
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    fetchError.value = true;
    products.value = [];
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchAllProducts();
});

watch(filters, () => {
  currentPage.value = 1;
});

const filteredProducts = computed(() => {
  let filtered = products.value;

  if (filters.category) {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  if (filters.size) {
    filtered = filtered.filter(p => 
      p.variations && p.variations.some(v => 
        v.size && v.size === filters.size && v.stock > 0
      )
    );
  }

  if (filters.maxPrice !== null && filters.maxPrice !== '') {
    filtered = filtered.filter(p => {
      const hasSalePrice = p.offer_types && (p.offer_types.includes('venta') || p.offer_types.includes('venta_alquiler') || p.offer_types.includes('ambos')) && p.price !== null && p.price <= filters.maxPrice;
      const hasRentalPrice = p.offer_types && (p.offer_types.includes('alquiler') || p.offer_types.includes('venta_alquiler') || p.offer_types.includes('ambos')) && p.rental_details && p.rental_details.pricePerDay !== null && p.rental_details.pricePerDay <= filters.maxPrice;
      
      return hasSalePrice || hasRentalPrice;
    });
  }

  if (filters.offerType) {
    filtered = filtered.filter(p => {
      if (!p.offer_types) return false;
      
      if (filters.offerType === 'ambos') {
        return p.offer_types.includes('venta_alquiler') || p.offer_types.includes('ambos');
      } else {
        return p.offer_types.includes(filters.offerType);
      }
    });
  }

  return filtered;
});

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage);
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});

const clearFilters = () => {
  filters.category = '';
  filters.size = '';
  filters.maxPrice = null;
  filters.offerType = '';
  currentPage.value = 1;
};

const navigateToBuyPage = (product) => {
  if (selectedProduct.value) {
    closeProductModal();
  }
  router.push({ name: 'Buy', params: { productId: product.product_id } });
};

const openProductModal = (product) => {
  selectedProduct.value = product;
  mainImageUrl.value = product.image_urls && product.image_urls.length > 0 
    ? getFullImageUrl(product.image_urls[0]) 
    : (product.imageUrl ? getFullImageUrl(product.imageUrl) : ''); 
  
  selectedProductImages.value = [];
  if (product.image_urls && product.image_urls.length > 0) {
    selectedProductImages.value = product.image_urls;
  } else if (product.imageUrl) {
    selectedProductImages.value.push(product.imageUrl);
  }
  
  document.body.style.overflow = 'hidden';
};

const closeProductModal = () => {
  selectedProduct.value = null;
  mainImageUrl.value = '';
  selectedProductImages.value = [];
  document.body.style.overflow = '';
};

const setMainImage = (imagePath) => {
  mainImageUrl.value = getFullImageUrl(imagePath);
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

const getStatusText = (status) => {
  switch (status) {
    case 'available': return 'Disponible';
    case 'rented': return 'Alquilado';
    case 'sold': return 'Vendido';
    default: return status;
  }
};

const getOfferTypeText = (type) => {
  switch (type) {
    case 'venta': return 'En Venta';
    case 'alquiler': return 'En Alquiler';
    case 'venta_alquiler': 
    case 'ambos': 
      return 'Venta/Alq.';
    default: return type;
  }
};

const getProductDisplayPrice = (product) => {
  const hasRental = product.offer_types && (product.offer_types.includes('alquiler') || product.offer_types.includes('venta_alquiler') || product.offer_types.includes('ambos')) && product.rental_details && product.rental_details.pricePerDay !== null;
  const hasSale = product.offer_types && (product.offer_types.includes('venta') || product.offer_types.includes('venta_alquiler') || product.offer_types.includes('ambos')) && product.price !== null;

  let priceText = '';
  if (hasSale) {
    priceText += `S/ ${product.price.toFixed(2)}`;
  }
  if (hasRental) {
    if (priceText) priceText += ' / '; 
    priceText += `${product.rental_details.pricePerDay.toFixed(2)}/día`;
  }
  return priceText || 'N/A';
};

const getFullImageUrl = (relativePath) => {
  if (!relativePath) return '';
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath; 
  }
  return `${BASE_URL_BACKEND}${relativePath}`;
};

const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};
</script>
 

<style scoped>
/* Estilos compactos y mejorados */
.input-select-compact,
.input-text-compact {
  @apply w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-800 text-sm font-medium focus:ring-1 focus:ring-pink-300 focus:border-pink-300 transition-all duration-200 ease-in-out shadow-sm placeholder-gray-400;
}
 

.input-select-compact {
  appearance: none;
}
 

.input-select-icon-compact {
  @apply pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400;
}
 

.button-primary-compact {
  @apply px-5 py-2.5 bg-pink-600 text-white text-sm font-semibold rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-200 ease-in-out flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-[1.01];
}
 

.button-secondary-compact {
  @apply px-5 py-2.5 bg-white border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 transition-all duration-200 ease-in-out flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-[1.01];
}
 

.button-clear-filters {
  @apply px-5 py-2.5 bg-white border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 transition-all duration-200 ease-in-out flex items-center justify-center shadow-sm hover:shadow-md transform hover:scale-[1.01];
}
 

.badge {
  @apply inline-flex items-center px-3 py-1 rounded-full text-xs font-bold leading-none text-white shadow-sm;
}
 

.badge-sm {
  @apply inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium leading-none text-white shadow-sm;
}
 

.badge-xs {
  @apply inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium leading-none text-white shadow-sm;
}
 

.pagination-button-compact {
  @apply w-9 h-9 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors duration-200;
}
 

/* New styles for card buttons */
.card-button-primary {
  @apply w-full px-3 py-2 bg-pink-600 text-white text-sm font-semibold rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-200 ease-in-out flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-[1.01];
}
 

.card-button-secondary {
  @apply w-full px-3 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-semibold rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 transition-all duration-200 ease-in-out flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-[1.01];
}
 

/* Animaciones de entrada/salida */
.fade-in-enter-active, .fade-in-leave-active {
  transition: opacity 0.5s ease;
}
.fade-in-enter-from, .fade-in-leave-to {
  opacity: 0;
}
 

/* Animaciones específicas para elementos */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 2s linear infinite;
}
 

@keyframes pulse-fade {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
.animate-pulse-fade {
  animation: pulse-fade 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
 

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out forwards;
  opacity: 0; 
}
 

@keyframes fade-in-right {
  from { opacity: 0; transform: translateX(8px); }
  to { opacity: 1; transform: translateX(0); }
}
.animate-fade-in-right {
  animation: fade-in-right 0.3s ease-out forwards;
  opacity: 0;
}
 

@keyframes fade-in-zoom {
  from { opacity: 0; transform: scale(0.97); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in-zoom {
  animation: fade-in-zoom 0.4s ease-out forwards;
}
 

@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
.animate-bounce-subtle {
  animation: bounce-subtle 1.2s infinite ease-in-out;
}
 

/* Retrasos de animación */
.animation-delay-100 { animation-delay: 0.1s; }
.animation-delay-300 { animation-delay: 0.3s; }
.animation-delay-500 { animation-delay: 0.5s; }
 

/* Animaciones para el modal (personalizadas) */
.modal-slide-fade-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-slide-fade-enter-from,
.modal-slide-fade-leave-to {
  opacity: 0;
  transform: translateY(15px) scale(0.99);
}
 

.modal-fade-overlay-enter-active, .modal-fade-overlay-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-overlay-enter-from, .modal-fade-overlay-leave-to {
  opacity: 0;
}
 

/* Clamp para texto multilínea */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
 

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
 

/* Scrollbar personalizado (para el carrusel de miniaturas) */
.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
 

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
 

/* Transiciones suaves y transformaciones */
.transition-all {
  transition-property: all;
}
.transform {
  transform: translateZ(0); 
}
.transform-gpu {
  transform: translateZ(0); 
}
 

/* Mejoras para el modal en móviles */
@media (max-width: 640px) {
  .modal-content {
    max-height: 90vh;
    overflow-y: auto;
  }
}
</style>