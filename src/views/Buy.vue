<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white font-sans antialiased text-gray-800">

    <header class="bg-white shadow-md border-b border-gray-100 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <button
            @click="goToHome"
            class="flex items-center text-gray-600 hover:text-rose-700 transition-colors duration-200 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm font-medium transform transition-transform duration-200 hover:scale-[1.02]"
            aria-label="Volver a la página de inicio"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </button>

          <router-link
            to="/"
            class="flex items-center space-x-2 text-gray-800 hover:text-rose-600 transition-colors duration-200 group"
          >
            <img src="@/assets/imagenes/visteteya.jpeg" alt="VisteteYA Logo" class="h-8 w-8 rounded-full shadow-sm">
            <span class="text-2xl font-bold">Vistete<span class="text-rose-600">YA</span></span>
          </router-link>

          <nav class="flex space-x-6">
            <router-link
              to="/"
              class="inline-flex items-center text-sm font-medium text-gray-600 hover:text-rose-700 transition-colors duration-200 py-2 px-3 rounded-md hover:bg-rose-50"
              aria-label="Ir a la página de inicio"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Inicio
            </router-link>
          </nav>
        </div>
      </div>
    </header>

    <div class="p-4 sm:p-8 flex items-center justify-center flex-grow">
      <div class="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10">

        <div class="order-2 md:order-1 flex flex-col justify-between p-6 bg-gray-50 rounded-2xl shadow-inner border border-gray-100">
          <div>
            <h2 class="text-3xl font-extrabold text-rose-800 mb-4 leading-tight">Confirma Tu Compra</h2>
            <p class="text-gray-600 mb-6 text-base">Un paso más para tener tu nuevo tesoro. Revisa los detalles de tu pedido antes de finalizar la compra.</p>

            <div v-if="product" class="bg-white rounded-xl shadow-lg p-4 flex items-center mb-6 border border-gray-100">
              <img :src="getFullImageUrl(product.image_urls ? product.image_urls[0] : product.imageUrl)" :alt="product.name" class="w-28 h-28 object-cover rounded-lg mr-4 border border-gray-200 shadow-sm">
              <div>
                <h3 class="text-xl font-semibold text-gray-800 leading-tight mb-1">{{ capitalizeFirstLetter(product.name) }}</h3>
                <p class="text-rose-700 text-lg font-bold mt-1">{{ getProductDisplayPrice(product) }}</p>
                <p v-if="product.seller_business_name" class="text-base text-gray-600 mt-0.5">Vendido por: <span class="font-bold text-rose-700">{{ product.seller_business_name }}</span></p>
                <p class="text-sm text-gray-600 line-clamp-2 mt-1">{{ product.description }}</p>
              </div>
            </div>
            <div v-else class="bg-white rounded-xl shadow-lg p-6 text-center text-gray-500 border border-gray-100">
              <div class="flex flex-col items-center justify-center">
                <svg class="w-12 h-12 text-gray-300 animate-pulse-fast" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14h-2v-4h2v4zm0-6h-2V7h2v3z"/>
                </svg>
                <p class="mt-3 text-lg font-medium">Cargando detalles del producto...</p>
              </div>
            </div>

            <div v-if="isRentalProduct" class="mt-6 mb-6 p-4 bg-rose-50 rounded-xl border border-rose-100 shadow-sm">
              <label for="rentalDays" class="block text-base font-semibold text-gray-700 mb-2">Días de Alquiler:</label>
              <input
                type="number"
                id="rentalDays"
                v-model.number="rentalDays"
                min="1"
                class="block w-full sm:w-36 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-rose-500 focus:border-rose-500 text-lg text-center transition-all duration-200"
              >
              <p v-if="rentalDays <= 0" class="text-red-500 text-sm mt-2 font-medium">El número de días debe ser al menos 1.</p>
            </div>

            <div class="border-t border-gray-200 pt-6 mt-6">
              <div class="flex justify-between items-center text-gray-700 mb-3 text-lg">
                <span>Subtotal ({{ isRentalProduct ? 'Alquiler' : 'Venta' }}):</span>
                <span class="font-semibold">{{ formatCurrency(calculatedSubtotal) }}</span>
              </div>
              <div class="flex justify-between items-center text-gray-700 mb-3 text-lg">
                <span>Envío:</span>
                <span class="font-semibold">{{ formatCurrency(shippingCost) }}</span>
              </div>
              <div class="flex justify-between items-center text-2xl font-extrabold text-rose-800 border-t-2 border-rose-300 pt-4 mt-4">
                <span>Total a Pagar:</span>
                <span>{{ formatCurrency(calculatedTotal) }}</span>
              </div>
              <p v-if="isRentalProduct" class="text-sm text-gray-600 mt-3 text-center">
                Nota: El precio de alquiler es por día. El total mostrado incluye el costo de envío.
              </p>
            </div>
          </div>

          <div class="mt-8 text-center text-gray-500 text-sm p-4 bg-white rounded-xl shadow-md border border-gray-100">
            <p class="flex items-center justify-center space-x-2 text-gray-700 font-medium">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 002 12c0 2.757 1.252 5.223 3.248 6.914L12 22l6.752-3.086A12.001 12.001 0 0022 12c0-2.757-1.252-5.223-3.248-6.914z"></path></svg>
              <span>Transacción 100% Segura y Encriptada</span>
            </p>
            <div class="flex justify-center items-center mt-4 space-x-4">
              <img src="https://via.placeholder.com/60x30?text=Visa" alt="Visa" class="h-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105">
              <img src="https://via.placeholder.com/60x30?text=Mastercard" alt="Mastercard" class="h-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105">
              <img src="https://via.placeholder.com/60x30?text=PayPal" alt="PayPal" class="h-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105">
            </div>
          </div>
        </div>

        <div class="order-1 md:order-2 p-6 bg-white">
          <h2 class="text-3xl font-extrabold text-gray-900 mb-6 leading-tight">Detalles de Pago</h2>

          <div class="mb-6">
            <div class="flex justify-between text-xs mb-1 text-gray-600 font-medium">
              <span>Envío</span>
              <span>Pago</span>
              <span>Confirmación</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3">
              <div class="bg-rose-600 h-3 rounded-full w-2/3 shadow-sm"></div>
            </div>
          </div>

          <form @submit.prevent="processPayment">
            <div class="mb-4">
              <label for="fullName" class="block text-sm font-medium text-gray-700 mb-1">Nombre Completo <span class="text-red-500">*</span></label>
              <input type="text" id="fullName" v-model="fullName" class="input-modern" placeholder="Ej: Juan Pérez" required>
            </div>

            <div class="mb-4">
              <label for="phoneNumber" class="block text-sm font-medium text-gray-700 mb-1">Número de Teléfono <span class="text-red-500">*</span></label>
              <input type="tel" id="phoneNumber" v-model="phoneNumber" class="input-modern" placeholder="Ej: 987654321" required pattern="[0-9]{9}">
              <p class="text-xs text-gray-500 mt-1">Formato: 9 dígitos (solo números)</p>
            </div>

            <div class="mb-6">
              <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Dirección de Envío <span class="text-red-500">*</span></label>
              <input type="text" id="address" v-model="address" class="input-modern" placeholder="Ej: Av. Sol 123, Miraflores" required>
            </div>

            <div class="text-center py-6 border border-rose-100 rounded-2xl bg-rose-50 shadow-lg mb-6">
              <p class="text-xl font-bold text-rose-800 mb-4 flex justify-center items-center flex-wrap gap-3">
                Escanea y Paga con
                <span class="inline-flex items-center justify-center px-3 py-1 rounded-md text-base text-white font-semibold bg-gradient-to-r from-purple-800 to-purple-600 shadow-md">Yape</span> o
                <span class="inline-flex items-center justify-center px-3 py-1 rounded-md text-base text-white font-semibold bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-md">Plin</span>
              </p>
              <div v-if="sellerProfile && sellerProfile.qr_image_url" class="mx-auto w-48 h-48 border-4 border-rose-200 rounded-lg shadow-xl p-2 flex items-center justify-center overflow-hidden">
                <img
                  :src="getFullImageUrl(sellerProfile.qr_image_url)"
                  alt="Código QR para Yape o Plin"
                  class="object-contain w-full h-full transform transition-transform duration-300 hover:scale-105"
                >
              </div>
              <div v-else class="mx-auto w-48 h-48 border-4 border-rose-200 rounded-lg shadow-xl p-2 flex items-center justify-center bg-gray-100 text-gray-400">
                  <p class="text-center text-sm">QR no disponible</p>
              </div>

              <p class="text-base text-gray-700 mt-4">Monto a pagar: <span class="font-bold text-rose-700">{{ formatCurrency(calculatedTotal) }}</span></p>
              <p class="text-xs text-gray-500 mt-2 px-4">Abre tu app de Yape o Plin, selecciona la opción "Escanear QR" y confirma el pago. ¡Es rápido y seguro!</p>
              </div>

            <div class="mb-4">
              <label for="receipt" class="block text-sm font-medium text-gray-700 mb-1">Subir Comprobante <span class="text-red-500">*</span></label>
              <input
                type="file"
                id="receipt"
                @change="handleReceiptUpload"
                accept=".jpg,.jpeg,.png,.pdf"
                required
                class="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-rose-50 file:text-rose-700
                       hover:file:bg-rose-100"
              >
              <p class="text-xs text-gray-500 mt-1">Formatos permitidos: JPG, PNG, PDF (Max. 5MB)</p>
              <p v-if="receiptFile" class="text-sm text-gray-600 mt-2">Archivo seleccionado: <span class="font-medium">{{ receiptFile.name }}</span></p>
            </div>

            <div class="mb-6 mt-6">
              <label for="country" class="block text-sm font-medium text-gray-700 mb-1">País de facturación</label>
              <div class="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed font-medium">
                Perú
              </div>
              <input type="hidden" id="country" v-model="paymentDetails.country">
            </div>

            <button
              type="submit"
              :disabled="isProcessingPayment"
              class="w-full bg-rose-700 hover:bg-rose-800 text-white font-extrabold py-3.5 px-7 rounded-xl text-xl transition duration-300 ease-in-out transform hover:scale-103 focus:outline-none focus:ring-4 focus:ring-rose-300 focus:ring-offset-2 shadow-lg hover:shadow-xl"
            >
              <span v-if="isProcessingPayment">Procesando Pago...</span>
              <span v-else>Confirmar Pago</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'Buy',
  props: {
    productId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      BASE_URL_BACKEND: import.meta.env.MODE === 'development'
        ? import.meta.env.VITE_APP_API_URL_LOCAL
        : import.meta.env.VITE_APP_API_URL_PRODUCTION,
      product: null,
      sellerProfile: null,
      shippingCost: 15.00,
      rentalDays: 1,
      fullName: '',
      phoneNumber: '',
      address: '',
      receiptFile: null,
      paymentDetails: {
        country: 'PE'
      },
      isProcessingPayment: false // <-- Nueva variable para controlar el estado de carga del botón
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  computed: {
    isRentalProduct() {
      return this.product && this.product.offer_types &&
             (this.product.offer_types.includes('alquiler') ||
              this.product.offer_types.includes('venta_alquiler') ||
              this.product.offer_types.includes('ambos'));
    },
    calculatedSubtotal() {
      if (!this.product) return 0;
      if (this.isRentalProduct) {
        const days = Math.max(1, this.rentalDays || 1);
        return (this.product.rental_details?.pricePerDay || 0) * days;
      } else {
        return this.product.price || 0;
      }
    },
    calculatedTotal() {
      return this.calculatedSubtotal + this.shippingCost;
    },
    // Añade esto para obtener el user_id del cliente logueado.
    // Necesitarás tener una forma de obtenerlo, por ejemplo, desde tu sistema de autenticación (Vuex, Pinia, localStorage).
    // Por ahora, lo dejaré como un placeholder.
    loggedInCustomerId() {
      // ESTO ES UN EJEMPLO. DEBES REEMPLAZARLO CON LA LÓGICA REAL DE TU APP.
      // Por ejemplo, si usas localStorage para guardar el ID del usuario:
      return localStorage.getItem('user_id_cliente_logueado') || 'some_default_customer_uuid'; // DEBES ASEGURARTE DE QUE ESTE ID SEA VÁLIDO Y EXISTA EN TU TABLA 'users'
    }
  },
  watch: {
    product: {
      handler(newProduct) {
        if (newProduct && this.isRentalProduct) {
          this.rentalDays = 1;
        }
      },
      immediate: true
    }
  },
  methods: {
    goToHome() {
      if (this.router) {
        this.router.go(-1);
      } else {
        console.log('Navegación de vuelta no disponible sin Vue Router.');
        alert('Volviendo a la página anterior.');
      }
    },
    async fetchProductDetails(productId) {
      try {
        const response = await axios.get(`${this.BASE_URL_BACKEND}/products/${productId}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching product details:', error);
        alert('No se pudieron cargar los detalles del producto. Inténtalo de nuevo más tarde.');
        return null;
      }
    },
    async fetchSellerProfile(sellerId) {
      try {
        const response = await axios.get(`${this.BASE_URL_BACKEND}/profile/seller/${sellerId}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching seller profile:', error);
        return null;
      }
    },
    formatCurrency(value) {
      if (value === null || value === undefined) return 'S/ 0.00';
      return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN',
        minimumFractionDigits: 2,
      }).format(value);
    },
    getFullImageUrl(relativePath) {
      if (!relativePath) return '';
      if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
        return relativePath;
      }
      return `${this.BASE_URL_BACKEND}${relativePath}`;
    },
    capitalizeFirstLetter(string) {
      if (!string) return '';
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    handleReceiptUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
          alert('Tipo de archivo no permitido. Por favor, sube una imagen (JPG, PNG) o un PDF.');
          this.receiptFile = null;
          event.target.value = '';
          return;
        }
        const maxSize = 5 * 1024 * 1024; // 5 MB
        if (file.size > maxSize) {
          alert('El archivo es demasiado grande. El tamaño máximo permitido es 5MB.');
          this.receiptFile = null;
          event.target.value = '';
          return;
        }
        this.receiptFile = file;
      } else {
        this.receiptFile = null;
      }
    },
    validatePaymentDetails() {
      if (!this.fullName || this.fullName.trim() === '') {
        alert('Por favor, ingresa tu nombre completo.');
        return false;
      }
      const phoneRegex = /^[0-9]{9}$/;
      if (!this.phoneNumber || !phoneRegex.test(this.phoneNumber)) {
        alert('Por favor, ingresa un número de teléfono válido de 9 dígitos.');
        return false;
      }
      if (!this.address || this.address.trim() === '') {
        alert('Por favor, ingresa tu dirección de envío.');
        return false;
      }
      if (!this.receiptFile) {
        alert('Por favor, sube el comprobante de pago.');
        return false;
      }

      if (this.isRentalProduct && (this.rentalDays === null || this.rentalDays <= 0)) {
        alert('Por favor, ingresa un número válido de días de alquiler (al menos 1).');
        return false;
      }
      return true;
    },
    async processPayment() {
      if (this.isProcessingPayment) return; // Evita doble envío
      if (!this.validatePaymentDetails()) {
        return;
      }

      this.isProcessingPayment = true; // Activa el estado de carga

      try {
        // Primero, sube el comprobante de pago
        const formData = new FormData();
        formData.append('receipt', this.receiptFile);
        // Puedes añadir más campos si tu API de subida lo requiere, como el product_id o customer_id
        formData.append('productId', this.product.product_id); // Asegúrate de que product_id exista en tu producto
        formData.append('customer_id', this.loggedInCustomerId);


        // Simulación de subida de comprobante
        // En un entorno real, aquí harías un axios.post a tu endpoint de subida de archivos
        // y esperarías la URL del comprobante guardado.
        let receiptUrl = `/uploads/receipts/${this.receiptFile.name}`; // Simula una URL
        // const uploadResponse = await axios.post(`${this.BASE_URL_BACKEND}/upload-receipt`, formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   }
        // });
        // receiptUrl = uploadResponse.data.url; // Asume que tu API devuelve la URL del archivo subido


        // Datos para crear la orden
        const orderData = {
          customer_id: this.loggedInCustomerId, // DEBES ASEGURARTE DE OBTENER EL ID DEL CLIENTE REAL
          seller_id: this.product.seller_id, // Obtenido de los detalles del producto
          product_id: this.product.product_id,
          quantity: 1, // Asumimos 1 por ahora, pero podrías añadir una cantidad al formulario
          total_price: this.calculatedTotal,
          order_status: 'pending', // O 'paid' si el pago se considera confirmado en este punto
          order_type: this.isRentalProduct ? 'rental' : 'sale',
          rental_days: this.isRentalProduct ? this.rentalDays : null,
          customer_details: { // Puedes guardar los detalles del cliente en un campo JSONB si tu tabla lo soporta
            fullName: this.fullName,
            phoneNumber: this.phoneNumber,
            address: this.address,
          },
          receipt_url: receiptUrl // URL del comprobante subido
        };

        // Enviar la orden a tu backend
        const orderResponse = await axios.post(`${this.BASE_URL_BACKEND}/orders`, orderData);

        if (orderResponse.status === 201) { // 201 Created es una respuesta común para la creación exitosa
          alert('¡Pago confirmado y orden enviada al vendedor con éxito! Recibirás una notificación cuando tu orden sea procesada.');
          console.log('Orden creada:', orderResponse.data);
          // Redirigir al usuario a una página de confirmación o al historial de pedidos
          this.router.push('/order-confirmation/' + orderResponse.data.order_id); // Asume que la respuesta incluye el order_id
        } else {
          alert('Hubo un problema al procesar tu orden. Por favor, intenta de nuevo.');
        }

      } catch (error) {
        console.error('Error al procesar el pago o crear la orden:', error);
        alert('Ha ocurrido un error inesperado. Por favor, verifica tu conexión y vuelve a intentarlo.');
      } finally {
        this.isProcessingPayment = false; // Desactiva el estado de carga
      }
    },
    getProductDisplayPrice(product) {
      if (!product) return 'N/A';

      const hasRental = product.offer_types && (product.offer_types.includes('alquiler') || product.offer_types.includes('venta_alquiler') || product.offer_types.includes('ambos')) && product.rental_details && product.rental_details.pricePerDay !== null;
      const hasSale = product.offer_types && (product.offer_types.includes('venta') || product.offer_types.includes('venta_alquiler') || product.offer_types.includes('ambos')) && product.price !== null;

      let priceText = '';
      if (hasSale) {
        priceText += `S/ ${product.price.toFixed(2)}`;
      }
      if (hasRental) {
        if (priceText) priceText += ' / ';
        priceText += `S/ ${product.rental_details.pricePerDay.toFixed(2)}/día`;
      }
      return priceText || 'N/A';
    }
  },
  async created() {
    this.product = await this.fetchProductDetails(this.productId);
    if (this.product && this.product.seller_id) {
      this.sellerProfile = await this.fetchSellerProfile(this.product.seller_id);
    }
    // IMPORTANTE: Aquí debes obtener el user_id real del cliente logueado.
    // Por ejemplo, si lo tienes en un store de Vuex o Pinia, o en localStorage.
    // this.loggedInCustomerId = someAuthStore.userId || localStorage.getItem('auth_user_id');
  }
};
</script>

<style scoped>
/* Estilos adicionales para un aspecto más profesional */
.input-modern {
  @apply mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm
         focus:ring-rose-500 focus:border-rose-500 text-gray-800
         transition-all duration-200 ease-in-out placeholder-gray-400;
}

/* Animación para el spinner de carga (si se usa un icono similar) */
@keyframes pulse-fast {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
.animate-pulse-fast {
  animation: pulse-fast 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Clamp para texto multilínea */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Los estilos de degradado para texto ya no se usan directamente aquí, se usan para los fondos de los spans */
</style>