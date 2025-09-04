<template>
  <SellerDashboardLayout>
    <div class="container mx-auto px-5 py-8 max-w-4xl bg-white rounded-3xl shadow-2xl">
      <h1 class="text-3xl font-extrabold text-gray-900 mb-8 text-center">Publicar Nuevo Artículo</h1>

      <form @submit.prevent="submitProduct" class="space-y-8">

        <div v-if="submissionStatus === 'loading'" class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">Cargando...</strong>
          <span class="block sm:inline">Enviando tu artículo, por favor espera...</span>
        </div>
        <div v-if="submissionStatus === 'success'" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">¡Éxito!</strong>
          <span class="block sm:inline">Artículo añadido con éxito. Redirigiendo a tus artículos.</span>
        </div>
        <div v-if="submissionStatus === 'error'" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">Error:</strong>
          <span class="block sm:inline">{{ errors.submission || 'Error al añadir el artículo. Por favor, revisa los campos e intenta de nuevo.' }}</span>
        </div>

        <section class="border-b border-gray-200 pb-8">
          <h2 class="text-xl font-extrabold text-gray-800 mb-4 flex items-center">
            <svg class="h-7 w-7 mr-3 text-pink-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            1. Detalles Generales
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="name" class="block text-sm font-semibold text-gray-700 mb-1">Nombre del Artículo <span class="text-red-500">*</span></label>
              <input
                type="text"
                id="name"
                v-model="product.name"
                required
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
                placeholder="Ej: Vestido de Gala 'Noche Estrellada'"
              />
              <p v-if="errors.name" class="mt-1 text-xs text-red-600">{{ errors.name }}</p>
            </div>

            <div>
              <label for="category" class="block text-sm font-semibold text-gray-700 mb-1">Categoría <span class="text-red-500">*</span></label>
              <select
                id="category"
                v-model="product.category"
                required
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm appearance-none bg-white pr-8"
              >
                <option value="" disabled>Selecciona una categoría</option>
                <option v-for="cat in availableCategories" :key="cat.value" :value="cat.value">{{ cat.name }}</option>
              </select>
              <p v-if="errors.category" class="mt-1 text-xs text-red-600">{{ errors.category }}</p>
            </div>

            <div class="md:col-span-2">
              <label for="description" class="block text-sm font-semibold text-gray-700 mb-1">Descripción Detallada <span class="text-red-500">*</span></label>
              <textarea
                id="description"
                v-model="product.description"
                rows="4"
                required
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
                placeholder="Describe el artículo: material, estilo, ocasión, estado, etc."
              ></textarea>
              <p v-if="errors.description" class="mt-1 text-xs text-red-600">{{ errors.description }}</p>
            </div>
          </div>
        </section>

        <section class="border-b border-gray-200 pb-8">
          <h2 class="text-xl font-extrabold text-gray-800 mb-4 flex items-center">
            <svg class="h-7 w-7 mr-3 text-pink-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2V5a2 2 0 00-2-2h-2.343a2 2 0 01-1.664-.89l-2.828-3.181A2 2 0 006.004 0H4a2 2 0 00-2 2v10l8 8h12z" /></svg>
            2. Selecciona Tipo de Oferta
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <label class="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-pink-500 transition-all duration-200 shadow-md"
                   :class="{'bg-pink-50 border-pink-600': product.offerTypes.includes('venta')}">
              <input type="checkbox" v-model="product.offerTypes" value="venta" class="form-checkbox text-pink-600 h-4 w-4 focus:ring-pink-500" />
              <span class="ml-3 text-sm font-medium text-gray-900">Vender</span>
            </label>
            <label class="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-pink-500 transition-all duration-200 shadow-md"
                   :class="{'bg-pink-50 border-pink-600': product.offerTypes.includes('alquiler')}">
              <input type="checkbox" v-model="product.offerTypes" value="alquiler" class="form-checkbox text-pink-600 h-4 w-4 focus:ring-pink-500" />
              <span class="ml-3 text-sm font-medium text-gray-900">Alquilar</span>
            </label>
            <label class="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-pink-500 transition-all duration-200 shadow-md"
                   :class="{'bg-pink-50 border-pink-600': product.offerTypes.includes('ambos')}">
              <input type="checkbox" v-model="product.offerTypes" value="ambos" class="form-checkbox text-pink-600 h-4 w-4 focus:ring-pink-500" />
              <span class="ml-3 text-sm font-medium text-gray-900">Ambas Opciones</span>
            </label>
          </div>
          <p v-if="errors.offerTypes" class="mt-2 text-xs text-red-600">{{ errors.offerTypes }}</p>

          <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-if="product.offerTypes.includes('venta') || product.offerTypes.includes('ambos')">
              <label for="price" class="block text-sm font-semibold text-gray-700 mb-1">Precio de Venta (Soles S/) <span class="text-red-500">*</span></label>
              <input
                type="number"
                id="price"
                v-model.number="product.price"
                min="0.01"
                step="0.01"
                :required="product.offerTypes.includes('venta') || product.offerTypes.includes('ambos')"
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
                placeholder="Ej: 150.00"
              />
              <p v-if="errors.price" class="mt-1 text-xs text-red-600">{{ errors.price }}</p>
            </div>

            <div v-if="product.offerTypes.includes('alquiler') || product.offerTypes.includes('ambos')" class="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label for="rentalPrice" class="block text-sm font-semibold text-gray-700 mb-1">Precio Alquiler/Día (Soles S/) <span class="text-red-500">*</span></label>
                  <input
                    type="number"
                    id="rentalPrice"
                    v-model.number="product.rentalDetails.pricePerDay"
                    min="0.01"
                    step="0.01"
                    :required="product.offerTypes.includes('alquiler') || product.offerTypes.includes('ambos')"
                    class="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
                    placeholder="Ej: 30.00"
                  />
                  <p v-if="errors.pricePerDay" class="mt-1 text-xs text-red-600">{{ errors.pricePerDay }}</p>
                </div>
                <div>
                  <label for="minDays" class="block text-sm font-semibold text-gray-700 mb-1">Mín. Días Alquiler <span class="text-red-500">*</span></label>
                  <input
                    type="number"
                    id="minDays"
                    v-model.number="product.rentalDetails.minDays"
                    min="1"
                    :required="product.offerTypes.includes('alquiler') || product.offerTypes.includes('ambos')"
                    class="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
                    placeholder="Ej: 3"
                  />
                  <p v-if="errors.minDays" class="mt-1 text-xs text-red-600">{{ errors.minDays }}</p>
                </div>
                <div>
                  <label for="maxDays" class="block text-sm font-semibold text-gray-700 mb-1">Máx. Días Alquiler (Opcional)</label>
                  <input
                    type="number"
                    id="maxDays"
                    v-model.number="product.rentalDetails.maxDays"
                    :min="product.rentalDetails.minDays || 1"
                    class="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
                    placeholder="Ej: 30"
                  />
                  <p v-if="errors.maxDays" class="mt-1 text-xs text-red-600">{{ errors.maxDays }}</p>
                </div>
            </div>
          </div>
        </section>

        <section class="border-b border-gray-200 pb-8">
          <h2 class="text-xl font-extrabold text-gray-800 mb-4 flex items-center">
            <svg class="h-7 w-7 mr-3 text-pink-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21v-3m0 0V5a2 2 0 012-2h4a2 2 0 012 2v13m-6 0H4a2 2 0 00-2 2v1a2 2 0 002 2h10a2 2 0 002-2v-1m-6 0H4" /></svg>
            3. Variaciones del Artículo
          </h2>
          <p class="text-sm text-gray-600 mb-5">Define las tallas, colores y el stock disponible para cada combinación. Mínimo una variación es requerida.</p>

          <div class="space-y-6">
            <div v-for="(variation, index) in product.variations" :key="index" class="relative bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 class="text-base font-semibold text-gray-800 mb-4">Variación #{{ index + 1 }}</h3>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label :for="'size-' + index" class="block text-sm font-medium text-gray-700 mb-1">Talla <span class="text-red-500">*</span></label>
                  <input
                    type="text"
                    :id="'size-' + index"
                    v-model="variation.size"
                    required
                    class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
                    placeholder="Ej: M, L, 38"
                  />
                  <p v-if="errors[`variations[${index}].size`]" class="mt-1 text-xs text-red-600">{{ errors[`variations[${index}].size`] }}</p>
                </div>
                <div>
                  <label :for="'color-' + index" class="block text-sm font-medium text-gray-700 mb-1">Color <span class="text-red-500">*</span></label>
                  <input
                    type="text"
                    :id="'color-' + index"
                    v-model="variation.color"
                    required
                    class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
                    placeholder="Ej: Rojo, Azul Marino"
                  />
                  <p v-if="errors[`variations[${index}].color`]" class="mt-1 text-xs text-red-600">{{ errors[`variations[${index}].color`] }}</p>
                </div>
                <div>
                  <label :for="'stock-' + index" class="block text-sm font-medium text-gray-700 mb-1">Stock <span class="text-red-500">*</span></label>
                  <input
                    type="number"
                    :id="'stock-' + index"
                    v-model.number="variation.stock"
                    min="0"
                    required
                    class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
                    placeholder="Ej: 5"
                  />
                  <p v-if="errors[`variations[${index}].stock`]" class="mt-1 text-xs text-red-600">{{ errors[`variations[${index}].stock`] }}</p>
                </div>
              </div>
              <button
                v-if="product.variations.length > 1"
                type="button"
                @click="removeVariation(index)"
                class="absolute top-4 right-4 p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-colors duration-200"
                aria-label="Eliminar variación"
              >
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
          <button
            type="button"
            @click="addVariation"
            class="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 hover:shadow-lg transition-all duration-200"
          >
            <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            Añadir Otra Variación
          </button>
        </section>

        <section class="border-b border-gray-200 pb-8">
          <h2 class="text-xl font-extrabold text-gray-800 mb-4 flex items-center">
            <svg class="h-7 w-7 mr-3 text-pink-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            4. Imágenes del Artículo
          </h2>
          <p class="text-sm text-gray-600 mb-5">Sube al menos <span class="font-bold text-pink-600">3 imágenes</span> de alta calidad para mostrar tu artículo.</p>

          <div
            class="mt-1 flex justify-center px-5 pt-7 pb-9 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer hover:border-pink-500 transition-colors duration-200"
            @click="triggerFileInput"
            @dragover.prevent="handleDragOver"
            @dragleave.prevent="handleDragLeave"
            @drop.prevent="handleDrop"
            :class="{'border-pink-500 bg-pink-50': isDragging}"
          >
            <input type="file" id="images" multiple accept="image/*" @change="handleImageUpload" class="sr-only" ref="fileInputRef" />
            <div class="text-center">
              <svg class="mx-auto h-14 w-14 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.01" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p class="mt-2 text-sm text-gray-600">
                <span class="font-semibold text-pink-600">Haz clic para subir</span> o arrastra y suelta
              </p>
              <p class="text-xs text-gray-500 mt-1">PNG, JPG, GIF hasta 5MB por imagen</p>
            </div>
          </div>
          <p v-if="errors.images" class="mt-2 text-xs text-red-600">{{ errors.images }}</p>

          <div v-if="product.images.length" class="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            <div v-for="(image, index) in product.images" :key="index" class="relative group aspect-w-1 aspect-h-1">
              <img :src="image.preview" class="w-full h-full object-cover rounded-xl border border-gray-200 shadow-md" :alt="`Imagen ${index + 1}`" />
              <button
                type="button"
                @click="removeImage(index)"
                class="absolute top-2 right-2 bg-red-700 text-white rounded-full p-2 text-xs opacity-90 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center shadow-lg"
                aria-label="Eliminar imagen"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        </section>

        <div class="mt-10">
          <p v-if="submissionStatus === 'loading'" class="mt-4 text-center text-blue-600 flex items-center justify-center gap-2 text-sm">
            <svg class="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enviando tu artículo, por favor espera...
          </p>
          <p v-if="submissionStatus === 'success'" class="mt-4 text-center text-green-600 font-semibold flex items-center justify-center gap-2 text-sm">
            <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ¡Artículo añadido con éxito! Redirigiendo a tus artículos.
          </p>
          <p v-if="submissionStatus === 'error'" class="mt-4 text-center text-red-600 font-semibold flex items-center justify-center gap-2 text-sm">
            <svg class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Error al añadir el artículo. Por favor, revisa los campos e intenta de nuevo.
          </p>
          <ul v-if="Object.keys(errors).length > 0 && submissionStatus === 'error'" class="mt-4 text-xs text-red-600 list-disc list-inside">
            <li v-for="(errorMsg, key) in errors" :key="key">{{ errorMsg }}</li>
          </ul>
        </div>

        <div class="mt-10 pt-6 border-t border-gray-200 flex justify-center">
          <button
            type="submit"
            :disabled="submissionStatus === 'loading'"
            class="inline-flex items-center px-8 py-2.5 border border-transparent text-lg font-bold rounded-full shadow-xl text-white bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-700 hover:to-rose-800 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:ring-opacity-70 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300"
          >
            <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
            Publicar Artículo
          </button>
        </div>
      </form>
    </div>
  </SellerDashboardLayout>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import SellerDashboardLayout from './seller/SellerDashboardLayout.vue'; // Ajusta la ruta si lo pones en src/layouts

const router = useRouter();

// --- Configuración de la API ---
// Determina la URL base del backend según el entorno
const API_BASE_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_APP_API_URL_LOCAL  // Usa tu URL local si estás en desarrollo
  : import.meta.env.VITE_APP_API_URL_PRODUCTION; // Usa tu URL de producción en otro caso (como al hacer build para desplegar)

// --- Estados del Formulario ---
const currentStep = ref(1);
const userType = ref(null); // 'customer' o 'seller'
const loading = ref(false);
const formError = ref('');

const product = ref({
  name: '',
  description: '',
  category: '',
  offerTypes: [],
  price: null,
  rentalDetails: {
    pricePerDay: null,
    minDays: 1,
    maxDays: null,
  },
  images: [], // Stores { file: File, preview: DataURL }
  variations: [{ size: '', color: '', stock: null }],
  sellerId: localStorage.getItem('user_id'), // Get sellerId from localStorage
});

const availableCategories = ref([
  { name: 'Vestidos', value: 'vestidos' },
  { name: 'Trajes', value: 'trajes' },
  { name: 'Disfraces', value: 'disfraces' },
  { name: 'Zapatos', value: 'zapatos' },
  { name: 'Accesorios', value: 'accesorios' },
]);

const submissionStatus = ref(null);
const errors = ref({});
const fileInputRef = ref(null);
const isDragging = ref(false);

watch(() => product.value.offerTypes, (newVal) => {
  if (!newVal.includes('venta') && !newVal.includes('ambos')) {
    product.value.price = null;
  }
  if (!newVal.includes('alquiler') && !newVal.includes('ambos')) {
    product.value.rentalDetails = { pricePerDay: null, minDays: 1, maxDays: null };
  }
}, { deep: true });

const triggerFileInput = () => {
  fileInputRef.value.click();
};

const handleDragOver = () => {
  isDragging.value = true;
};

const handleDragLeave = () => {
  isDragging.value = false;
};

const handleDrop = (event) => {
  isDragging.value = false;
  handleFiles(event.dataTransfer.files);
};

const handleImageUpload = (event) => {
  handleFiles(event.target.files);
  event.target.value = ''; // Clear the input so same file can be selected again
};

const handleFiles = (files) => {
  const newFiles = Array.from(files);
  errors.value.images = '';

  if (product.value.images.length + newFiles.length > 10) {
    errors.value.images = 'No puedes subir más de 10 imágenes en total.';
    return;
  }

  newFiles.forEach(file => {
    if (!file.type.startsWith('image/')) {
      errors.value.images = 'Solo se permiten archivos de imagen (PNG, JPG, GIF).';
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      errors.value.images = `La imagen "${file.name}" excede el tamaño máximo (5MB).`;
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      product.value.images.push({ file: file, preview: e.target.result });
    };
    reader.readAsDataURL(file);
  });
};

const removeImage = (index) => {
  product.value.images.splice(index, 1);
};

const addVariation = () => {
  product.value.variations.push({ size: '', color: '', stock: null });
};

const removeVariation = (index) => {
  if (product.value.variations.length <= 1) { // Changed condition to prevent removing if only one left
    errors.value.variations = 'No puedes eliminar la última variación. Debe haber al menos una.';
    return;
  }
  product.value.variations.splice(index, 1);
};

const validateForm = () => {
  errors.value = {};
  let isValid = true;

  if (!product.value.name) {
      errors.value.name = 'El nombre del artículo es obligatorio.';
      isValid = false;
  }
  if (!product.value.category) {
      errors.value.category = 'Debes seleccionar una categoría.';
      isValid = false;
  }
  if (!product.value.description) {
      errors.value.description = 'La descripción es obligatoria.';
      isValid = false;
  }

  if (product.value.offerTypes.length === 0) {
    errors.value.offerTypes = 'Debes seleccionar al menos una opción de oferta (Vender, Alquilar o Ambas).';
    isValid = false;
  } else {
    const isSelling = product.value.offerTypes.includes('venta') || product.value.offerTypes.includes('ambos');
    const isRenting = product.value.offerTypes.includes('alquiler') || product.value.offerTypes.includes('ambos');

    if (isSelling && (product.value.price === null || product.value.price <= 0)) {
      errors.value.price = 'Ingresa un precio de venta válido (mayor a 0).';
      isValid = false;
    }

    if (isRenting) {
      if (product.value.rentalDetails.pricePerDay === null || product.value.rentalDetails.pricePerDay <= 0) {
        errors.value.pricePerDay = 'Ingresa un precio de alquiler por día válido (mayor a 0).';
        isValid = false;
      }
      if (product.value.rentalDetails.minDays === null || product.value.rentalDetails.minDays <= 0) {
        errors.value.minDays = 'Ingresa un mínimo de días de alquiler válido (mayor a 0).';
        isValid = false;
      }
      if (product.value.rentalDetails.maxDays !== null && product.value.rentalDetails.maxDays < product.value.rentalDetails.minDays) {
        errors.value.maxDays = 'El máximo de días no puede ser menor que el mínimo de días.';
        isValid = false;
      }
    }
  }

  if (product.value.variations.length === 0) {
    errors.value.variations = 'Debes añadir al menos una variación (talla, color, stock).';
    isValid = false;
  } else {
    product.value.variations.forEach((variation, index) => {
      if (!variation.size) {
          errors.value[`variations[${index}].size`] = 'La talla es obligatoria.';
          isValid = false;
      }
      if (!variation.color) {
          errors.value[`variations[${index}].color`] = 'El color es obligatorio.';
          isValid = false;
      }
      if (variation.stock === null || variation.stock < 0) {
          errors.value[`variations[${index}].stock`] = 'El stock es obligatorio y debe ser 0 o mayor.';
          isValid = false;
      }
    });
  }

  if (product.value.images.length < 3) {
    errors.value.images = `Debes subir al menos 3 imágenes del producto. Actualmente tienes ${product.value.images.length}.`;
    isValid = false;
  }

  return isValid;
};

const submitProduct = async () => {
  submissionStatus.value = null;

  if (!validateForm()) {
    submissionStatus.value = 'error';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  submissionStatus.value = 'loading';

  const formData = new FormData();

  // Directly append simple string/number fields
  formData.append('name', product.value.name);
  formData.append('description', product.value.description);
  formData.append('category', product.value.category);
  formData.append('sellerId', product.value.sellerId); // Append sellerId directly as a string (UUID)

  // Append offerTypes, FastAPI expects multiple 'offerTypes' fields for List[str]
  product.value.offerTypes.forEach(type => {
    formData.append('offerTypes', type); // Use 'offerTypes' without '[]'
  });

  // Append price if applicable
  if (product.value.offerTypes.includes('venta') || product.value.offerTypes.includes('ambos')) {
    formData.append('price', product.value.price);
  }

  // Stringify rentalDetails and variations to JSON strings
  // Fastapi will parse them using json.loads()
  if (product.value.offerTypes.includes('alquiler') || product.value.offerTypes.includes('ambos')) {
    formData.append('rentalDetails', JSON.stringify(product.value.rentalDetails));
  } else {
    // If rental details are not applicable, explicitly send "null" string
    // to match FastAPI's Optional[str] handling for `Form(...)`
    formData.append('rentalDetails', 'null');
  }

  formData.append('variations', JSON.stringify(product.value.variations));

  // Append individual image files
  product.value.images.forEach((image) => {
    formData.append('images', image.file, image.file.name); // 'images' for the list of UploadFile
  });

  // --- CAMBIO DE FUNCIONALIDAD CLAVE: ADJUNTAR EL TOKEN DE AUTENTICACIÓN ---
  const accessToken = localStorage.getItem('accessToken');
  const tokenType = localStorage.getItem('tokenType'); // Esto debería ser 'bearer'

  if (!accessToken || !tokenType) {
    errors.value.submission = 'No autenticado. Por favor, inicia sesión para publicar un artículo.';
    submissionStatus.value = 'error';
    router.push('/login'); // Redirigir al login si no hay token
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/products`, { // Usando la variable dinámica
      method: 'POST',
      body: formData,
      headers: {
        // MUY IMPORTANTE: No establezcas 'Content-Type': 'multipart/form-data' manualmente aquí.
        // Cuando usas FormData con fetch, el navegador lo establece automáticamente con el boundary correcto.
        // Si lo estableces manualmente, puede causar problemas.

        // ¡Aquí se adjunta el token de autenticación!
        'Authorization': `${tokenType} ${accessToken}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json(); // Attempt to parse JSON even on error
      // Handle detailed errors from FastAPI if they exist
      if (errorData.detail) {
        if (typeof errorData.detail === 'string') {
          errors.value.submission = errorData.detail;
        } else if (Array.isArray(errorData.detail)) {
          // If FastAPI returns validation errors in 'detail' array
          errorData.detail.forEach(err => {
            if (err.loc && err.loc.length > 1) {
              const field = err.loc[1]; // Get the field name
              errors.value[field] = err.msg;
            } else {
              errors.value.submission = errors.value.submission ? errors.value.submission + "\n" + err.msg : err.msg;
            }
          });
        }
      } else {
        errors.value.submission = errorData.message || 'Error desconocido al guardar el producto.';
      }
      throw new Error("Validation Error or Server Error"); // Throw to trigger catch block
    }

    const responseData = await response.json();
    console.log('Producto guardado exitosamente:', responseData);
    submissionStatus.value = 'success';

    resetForm();

    setTimeout(() => {
        router.push('/dashboard-vendedor/mis-articulos');
    }, 2000);

  } catch (error) {
    console.error('Error al enviar producto:', error);
    if (submissionStatus.value !== 'error') { // Avoid overwriting specific validation errors
        errors.value.submission = errors.value.submission || error.message || 'Error de conexión o servidor.';
    }
    submissionStatus.value = 'error';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const resetForm = () => {
  product.value = {
    name: '',
    description: '',
    category: '',
    offerTypes: [],
    price: null,
    rentalDetails: {
      pricePerDay: null,
      minDays: 1,
      maxDays: null,
    },
    images: [],
    variations: [{ size: '', color: '', stock: null }],
    sellerId: localStorage.getItem('user_id'),
  };
  submissionStatus.value = null;
  errors.value = {};
  if (fileInputRef.value) {
    fileInputRef.value.value = ''; // Clear file input
  }
};
</script>

<style scoped>
/* Estilos específicos de AddProductForm.vue, si los hubiera, que no estén en el layout */
/* Por ejemplo, los estilos para select box, aspect-w-1, etc. que ya los tenías aquí,
   pero que probablemente ya no necesites si se aplican a los elementos dentro del layout.*/
</style>