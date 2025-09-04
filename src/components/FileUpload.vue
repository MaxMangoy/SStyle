<template>
    <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
      <div class="space-y-1 text-center">
        <svg v-if="!previewUrl" class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        
        <img v-else :src="previewUrl" class="mx-auto h-32 object-cover rounded-md" alt="Preview">
        
        <div class="flex text-sm text-gray-600">
          <label class="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none">
            <span>{{ label }}</span>
            <input type="file" class="sr-only" @change="handleFileChange">
          </label>
          <p class="pl-1">o arrastra y suelta</p>
        </div>
        <p class="text-xs text-gray-500">PNG, JPG, PDF hasta 5MB</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    label: {
      type: String,
      default: 'Subir archivo'
    }
  });
  
  const emit = defineEmits(['file-changed']);
  
  const previewUrl = ref(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    // Validar tamaño
    if (file.size > 5 * 1024 * 1024) {
      alert('El archivo no debe exceder los 5MB');
      return;
    }
  
    // Validar tipo
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      alert('Solo se permiten archivos JPG, PNG o PDF');
      return;
    }
  
    // Mostrar preview si es imagen
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewUrl.value = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      previewUrl.value = null;
    }
  
    emit('file-changed', file);
  };
  </script>