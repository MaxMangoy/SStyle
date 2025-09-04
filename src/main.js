import { createApp } from 'vue';
import App from './App.vue';
import './assets/css/main.css'; // Asegúrate de que esta ruta sea correcta para tus estilos
import router from './router'; // Importa tu instancia de Vue Router

// --- Importa la instancia de Axios configurada desde src/axios.js ---
// Ya no creas ni configuras Axios aquí; solo lo importas.
import axiosInstance from './axios'; 

const app = createApp(App);

app.use(router);

// Haz la instancia de Axios disponible globalmente en todos tus componentes
// Ahora se accede a ella como `this.$axios` en la Options API
// y se puede importar `axiosInstance` directamente en la Composition API si es necesario.
app.config.globalProperties.$axios = axiosInstance;

app.mount('#app');