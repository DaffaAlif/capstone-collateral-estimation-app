<template>
    <!-- Button to Open Popup -->
    <!-- Pop-up Form (Modal) -->
    <div v-if="isOpen" class="fixed inset-0 bg-gray-100 bg-opacity-25 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96 relative">

            <!-- Close Button -->
            <button @click="isOpen = false" class="absolute top-2 right-2 text-gray-600 hover:text-red-500">
                &times;
            </button>

            <!-- Form Title -->
            <h2 class="text-xl font-semibold mb-4">Contact Us</h2>

            <!-- Form Fields -->
            <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                    <label class="block text-sm font-medium text-gray-700">Name</label>
                    <input v-model="name" type="text" class="w-full p-2 border border-gray-300 rounded mt-1" required>
                </div>


                <!-- Submit Button -->
                <button type="submit" class="bg-teal-500 text-white px-6 py-2 rounded-md w-full mt-3">
                    Submit
                </button>
            </form>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue'
const props = defineProps({
    isOpen: Boolean
})

// Form Data
const name = ref('')

// Form Submission Handler
const handleSubmit = () => {
    console.log('Name:', name.value)

    // Close the modal after submission
    isOpen.value = false

    // Clear form fields
    name.value = ''
}
</script>
  
<style scoped>
/* Additional styling if needed */
</style>
  