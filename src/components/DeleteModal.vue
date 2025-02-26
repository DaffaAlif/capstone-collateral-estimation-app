<template>
    <!-- Button to Open Popup -->
    <!-- Pop-up Form (Modal) -->
    <div v-if="isOpen" class="fixed inset-0 bg-[rgb(0,0,0)]/50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-80 relative ">


            <!-- Form Title -->
            <h2 class="text-xl font-semibold mb-1 text-center">Hapus </h2>

            <!-- Form Fields -->
            <form @submit.prevent="handleSubmit(history, handleOpen)">
                <div class="text-neutral-600 mb-6 text-center">
                    Anda yakin ingin menghapus {{ history.is_completed ? 'hasil estimasi' : 'draft estimasi' }} ini? 
                </div>
                

                <!-- Submit Button -->
                <div class="flex justify-between gap-4">
                    <button type="submit" class="bg-red-600 text-white px-6 py-2 rounded-md w-full mt-3">
                    Hapus
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
const props = defineProps({
    isOpen: Boolean,
    handleOpen: Function,
    history: Object,
    getDrafts: Function,
    getHistories: Function
})





const handleSubmit = async () => {
    try {
        await deleteHistory(props.history.id);
        props.handleOpen(); // Close the modal
        props.getDrafts();  // Refresh drafts
        props.getHistories();
    } catch (error) {
        console.error(error);
    }
};



</script>
  
<style scoped>
/* Additional styling if needed */
</style>
  