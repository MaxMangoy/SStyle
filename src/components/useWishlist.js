// src/composables/useWishlist.js
import { ref, onMounted } from 'vue';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'; 

export function useWishlist() {
  const wishlistItems = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const getUserId = () => {
    return localStorage.getItem('user_id'); 
  };

  const fetchWishlist = async () => {
    const userId = getUserId();
    if (!userId) {
      error.value = "Usuario no ha iniciado sesión. No se puede obtener la lista de deseos.";
      wishlistItems.value = [];
      console.error(error.value);
      return;
    }

    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`${API_BASE_URL}/wishlist/${userId}`);
      wishlistItems.value = response.data.map(item => {
        // Asegura que las URLs de las imágenes sean completas
        const fullImageUrls = item.product.image_urls ? item.product.image_urls.map(url => `${API_BASE_URL}${url}`) : [];
        const mainImageUrl = item.product.imageUrl ? `${API_BASE_URL}${item.product.imageUrl}` : (fullImageUrls.length > 0 ? fullImageUrls[0] : null);

        return {
          ...item.product, 
          wishlist_item_id: item.wishlist_item_id, 
          added_at: item.added_at, 
          
          images: fullImageUrls, // Array de URLs completas
          imageUrl: mainImageUrl, // URL principal, si se usa en Wishlist.vue
          
          canBuy: item.product.offer_types.includes('venta') || item.product.offer_types.includes('ambos'),
          canRent: item.product.offer_types.includes('alquiler') || item.product.offer_types.includes('ambos'),
          buyPrice: item.product.price,
          rentPrice: item.product.rental_details ? item.product.rental_details.pricePerDay : null, // Corregido a pricePerDay
          
          size: item.product.variations && item.product.variations.length > 0 ? item.product.variations[0].size : null,
          color: item.product.variations && item.product.variations.length > 0 ? item.product.variations[0].color : null,
          
          id: item.product.product_id, // Importante para Wishlist.vue
        };
      });
      console.log("Lista de deseos obtenida exitosamente:", wishlistItems.value);
    } catch (err) {
      console.error("Error al obtener la lista de deseos:", err);
      error.value = "Falló al obtener la lista de deseos.";
      if (err.response && err.response.status === 404) {
          error.value = "Usuario no encontrado o no tiene lista de deseos.";
      } else if (err.response) {
          error.value = err.response.data.detail || err.message;
      } else {
          error.value = err.message;
      }
    } finally {
      isLoading.value = false;
    }
  };

  const addToWishlist = async (productId) => { // Ahora sí espera un productId
    const userId = getUserId();
    if (!userId) {
      error.value = "Usuario no ha iniciado sesión. No se puede añadir a la lista de deseos.";
      console.error(error.value);
      return false;
    }

    try {
      isLoading.value = true;
      error.value = null;
      await axios.post(`${API_BASE_URL}/wishlist/${userId}/${productId}`);
      console.log(`Producto ${productId} añadido a la lista de deseos del usuario ${userId}`);
      await fetchWishlist(); 
      return true;
    } catch (err) {
      console.error("Error al añadir a la lista de deseos:", err);
      error.value = "Falló al añadir el producto a la lista de deseos.";
      if (err.response && err.response.status === 409) {
        error.value = "Este producto ya está en tu lista de deseos.";
      } else if (err.response) {
          error.value = err.response.data.detail || err.message;
      } else {
          error.value = err.message;
      }
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const removeFromWishlist = async (productId) => {
    const userId = getUserId();
    if (!userId) {
      error.value = "Usuario no ha iniciado sesión. No se puede eliminar de la lista de deseos.";
      console.error(error.value);
      return false;
    }

    try {
      isLoading.value = true;
      error.value = null;
      await axios.delete(`${API_BASE_URL}/wishlist/${userId}/${productId}`);
      console.log(`Producto ${productId} eliminado de la lista de deseos del usuario ${userId}`);
      await fetchWishlist(); 
      return true;
    } catch (err) {
      console.error("Error al eliminar de la lista de deseos:", err);
      error.value = "Falló al eliminar el producto de la lista de deseos.";
      if (err.response && err.response.status === 404) {
          error.value = "Producto no encontrado en la lista de deseos.";
      } else if (err.response) {
          error.value = err.response.data.detail || err.message;
      } else {
          error.value = err.message;
      }
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const clearWishlist = async () => {
    const itemsToRemove = [...wishlistItems.value]; 
    for (const item of itemsToRemove) {
        await removeFromWishlist(item.id); 
    }
  };

  onMounted(() => {
    fetchWishlist();
  });

  return {
    wishlistItems,
    isLoading,
    error,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
  };
}