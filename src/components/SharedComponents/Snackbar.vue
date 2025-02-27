<script setup>
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
  type: String,
  message: String,
  isOpen: Boolean
})


</script>

<template>
  <div class="fixed top-0 right-0 mt-4 mr-4 z-50">
    <div v-if="isOpen" class="border w-80 border-teal-500 p-4 rounded-md text-lg ">
      {{ message }}
      <CheckIcon v-if="type === 'success'" class="h-6 text-teal-500 float-right my-auto" />
      <XMarkIcon v-else class="h-6 text-red-500 float-right my-auto" />
    </div>
  </div>
</template>



