<template>
    <div class="admin-layout">
      <SidebarAdmin /> 
      <main class="admin-content">
        <router-view />
      </main>
    </div>
</template>
  
<script>
// 2. CAMBIAR AQUÍ: Importa tu sidebar con el nombre correcto del archivo
import SidebarAdmin from './SidebarAdmin.vue'; 
  
export default {
    name: 'AdminDashboardLayout', // Es buena práctica
    components: {
        // 3. CAMBIAR AQUÍ: Asegúrate de que el nombre aquí coincida con la importación
        SidebarAdmin,
    },
};
</script>
  
<style scoped>
/* Estilos para tu layout de administrador */
.admin-layout {
  display: flex; /* Para poner el sidebar y el contenido uno al lado del otro */
  height: 100vh; /* Ocupar toda la altura de la ventana */
}
  
.admin-content {
  flex-grow: 1; /* Para que el contenido ocupe el espacio restante */
  padding: 20px;
  overflow-y: auto; /* Para permitir scroll en el contenido si es largo */
}
</style>