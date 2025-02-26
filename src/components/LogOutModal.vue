<template>
  <!-- Button to Open Popup -->
  <!-- Pop-up Form (Modal) -->
  <div v-if="isOpen" class="fixed inset-0 bg-[rgb(0,0,0)]/50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-80 relative ">


          <!-- Form Title -->
          <h2 class="text-xl font-semibold mb-1 text-center">Hapus </h2>

          <!-- Form Fields -->
          <form @submit.prevent="handleSubmit()">
              <div class="text-neutral-600 mb-6 text-center">
                  Anda yakin ingin keluar dari akun ini?
              </div>
              

              <!-- Submit Button -->
              <div class="flex justify-between gap-4">
                  <button type="submit" class="bg-teal-600 text-white px-6 py-2 rounded-md w-full mt-3">
                  Logout
              </button>
              <button @click="handleOpen" class="border border-teal-500 text-teal-500 px-6 py-2 rounded-md w-full mt-3">
                  Cancel
              </button>
              </div>
          </form>
      </div>
  </div>
</template>

<script setup>
import { h, ref } from 'vue'
import { deleteHistory } from '../api/api';
import store from '../store';
import router from '../router';
const props = defineProps({
  isOpen: Boolean,
  handleOpen: Function,
})





const handleSubmit = async () => {
  try {
    props.handleOpen();
    await store.dispatch('logout');
    router.push({ name: 'Login' })

  } catch (error) {
      console.error(error);
  }
};



</script>

<style scoped>
/* Additional styling if needed */
</style>
