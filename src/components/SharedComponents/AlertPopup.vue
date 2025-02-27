<template>
    <!-- Transition for fade in/out -->
    <transition name="fade">
        <div v-if="isVisible" class="fixed inset-0 bg-[rgb(0,0,0)]/50 flex items-center justify-center z-50">


            <div v-if="isVisible"
                class="fixed top-[300px] items-center justify-center flex bg-white border border-teal-500  rounded-md p-3 shadow-lg min-w-[582px]">
                <!-- Message -->
                <p class="text-gray-800 mr-2 text-[18px]">
                    {{ message }}
                </p>
    
                <!-- Check icon (Heroicon) -->
                <svg v-if="icon === 'check'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-500" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </div>
        </div>
    </transition>
</template>
  
<script setup>
import { ref, watch, onMounted } from 'vue';

// Define component props
const props = defineProps({
    // Controls whether the popup is initially shown
    show: {
        type: Boolean,
        default: false
    },
    // The text message to display
    message: {
        type: String,
        default: 'Hasil estimasi berhasil tersimpan'
    },
    // The icon name (can extend for different icons)
    icon: {
        type: String,
        default: 'check'
    },
    // If true, the popup hides itself automatically after `duration` ms
    autoHide: {
        type: Boolean,
        default: true
    },
    // Time in milliseconds before auto-hide
    duration: {
        type: Number,
        default: 3000
    }
});

// Internal state for controlling visibility
const isVisible = ref(props.show);

// Watch for changes to the `show` prop
watch(
    () => props.show,
    (newVal) => {
        isVisible.value = newVal;
        if (newVal && props.autoHide) {
            startTimer();
        }
    }
);

// Start the timer to hide the popup
function startTimer() {
    setTimeout(() => {
        isVisible.value = false;
    }, props.duration);
}

// On mount, if it's initially shown, start the timer if `autoHide` is true
onMounted(() => {
    if (props.show && props.autoHide) {
        startTimer();
    }
});
</script>
  
<style scoped>
/* Simple fade transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
  