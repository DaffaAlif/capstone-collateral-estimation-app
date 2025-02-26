<template>
  <div class="">
    <Navbar v-if="route.name !== 'Login' && route.name !== 'Home'" :handleOpen="handleOpen"/>
    <main :class="route.name !== 'Login' && route.name !== 'Home' ? 'pt-16' : ''">
      <router-view />
    </main>
    <LogOutModal :isOpen="isOpen" :handleOpen="handleOpen"/>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navbar from './components/SharedComponents/Navbar.vue';
import { useRoute } from 'vue-router';
import LogOutModal from './components/LogOutModal.vue';

const isOpen = ref(false)

const handleOpen = () => {
    isOpen.value = !isOpen.value;
};
const route = useRoute();
console.log(route);

</script>

<style scoped></style>
