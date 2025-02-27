<script setup>
import { ref, watchEffect } from 'vue';
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
  type: String,
  message: String,
  isOpen: Boolean
});

const isVisible = ref(props.isOpen);
</script>

<template>
  <transition name="fade">
    <div v-if="isVisible" class="transform  fixed top-0 right-0 mt-4 mr-4 z-50">
      <div class="border w-80 border-teal-500 p-4 rounded-md text-lg bg-white shadow-lg">
        {{ message }}
        <CheckIcon v-if="type === 'success'" class="h-6 text-teal-500 float-right my-auto" />
        <XMarkIcon v-else class="h-6 text-red-500 float-right my-auto" />
      </div>
    </div>
  </transition>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
