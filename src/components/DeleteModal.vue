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
import AlertPopup from './SharedComponents/AlertPopup.vue';
const props = defineProps({
    isOpen: Boolean,
    handleOpen: Function,
    history: Object,
    getDrafts: Function,
    getHistories: Function,
    totalHistories: Number,
    totalDrafts: Number,
    setCurrentPageHistory: Function,
    setCurrentPageDraft: Function,
    currentPageHistory: Number,
    currentPageDraft: Number
})


const showPopup = ref(false);


const handleSubmit = async () => {
    try {
        if (props.history.is_completed) {
            if(props.totalHistories%5 === 1){
                props.setCurrentPageHistory(props.currentPageHistory - 1)
            }
        }
        if (!props.history.is_completed) {
            if(props.totalDrafts%5 === 1){
                props.setCurrentPageDraft(props.currentPageDraft - 1)
            }
        }

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
  