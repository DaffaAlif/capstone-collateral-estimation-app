<template>
    <!-- Button to Open Popup -->
    <!-- Pop-up Form (Modal) -->
    <div v-if="isOpen" class="fixed inset-0 bg-[rgb(0,0,0)]/50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96 relative">

            <!-- Close Button -->
            <button @click="handleOpen" class="absolute top-2 right-2 text-gray-600 hover:text-red-500">
                &times;
            </button>

            <!-- Form Title -->
            <h2 class="text-xl font-semibold mb-4 text-center">Save </h2>

            <!-- Form Fields -->
            <form @submit.prevent="handleSubmitHistory">
                <div class="mb-3">
                    <label class="block text-sm font-medium text-gray-700">Name</label>
                    <input v-model="estimationName" type="text" class="w-full p-2 border border-gray-300 rounded mt-1" required>
                </div>
                <div v-if="!is_completed" class="text-red-500 text-xs">
                    Anda belum mengisi semua data. Form akan disimpan dalam bentuk draft
                </div>

                <!-- Submit Button -->
                <div class="flex justify-between gap-3">

                    <button @click="sendToParent" type="submit" class="bg-teal-500 text-white px-6 py-2 rounded-md w-full mt-3">
                        Submit
                    </button>
                    <button @click="handleOpen" class="bg-white text-teal-500 border border-teal-500 px-6 py-2 rounded-md w-full mt-3">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
const props = defineProps({
    isOpen: Boolean,
    is_completed: Boolean,
    handleOpen: Function,
    handleSubmitHistory : Function,
    estimationName: String
})

// Define local state
const estimationName = ref('');

// Define emit function
const emit = defineEmits(['estimationName']);

// Function to send data to parent
const sendToParent = () => {
  emit('estimationName', estimationName.value);
};


</script>
  
<style scoped>
/* Additional styling if needed */
</style>
  