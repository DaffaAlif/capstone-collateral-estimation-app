<script setup>
import { ref } from 'vue';

const isOpen = ref(false);

const toggleAccordion = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="w-full max-w-lg mx-auto border border-gray-300 rounded-lg shadow-lg">
    <!-- Accordion Header -->
    <button 
      @click="toggleAccordion"
      class="w-full flex justify-between items-center p-4 bg-gray-200 hover:bg-gray-300 transition-all duration-300 rounded-lg"
    >
      <span class="text-lg font-medium">Click to Expand</span>
      <svg
        :class="{'rotate-180': isOpen}"
        class="w-6 h-6 transform transition-transform duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>

    <!-- Accordion Content -->
    <div 
      v-if="isOpen"
      class="p-4 bg-white border-t border-gray-300"
    >
      <p class="text-gray-700">
        This is the accordion content. You can put any text, images, or components here.
      </p>
    </div>
    
  </div>
</template>
