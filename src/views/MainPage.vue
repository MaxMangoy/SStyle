<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <HeroSection />
    <Product ref="productGrid" @send-products="setProducts" @filters-cleared="scrollToProductFilters" />
    <Footer />
  </div>
</template>

<script>
import Header from './Header.vue'
import HeroSection from './HeroSection.vue'
import Footer from './Footer.vue'
import Product from './Product.vue' // Asegúrate de que el nombre del componente sea correcto

export default {
  components: {
    Header,
    HeroSection,
    Footer,
    Product
  },
  data() {
    return {
      products: []
    }
  },
  methods: {
    setProducts(productos) {
      this.products = productos
    },
    // Este método se ejecutará cuando FashionRentalGrid emita 'filters-cleared'
    scrollToProductFilters() {
      // Usamos nextTick para asegurar que el DOM de FashionRentalGrid haya sido actualizado
      this.$nextTick(() => {
        if (this.$refs.productGrid && this.$refs.productGrid.$refs.filterContainer) {
          // Accedemos al ref 'filterContainer' DENTRO del componente Product
          this.$refs.productGrid.$refs.filterContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // Fallback si por alguna razón no se encuentra el elemento
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }
  }
}
</script>