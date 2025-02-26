<template>
  <div class="">
    <Navbar v-if="route.name !== 'Login' && route.name !== 'register'" />
    <main :class="route.name !== 'Login' && route.name !== 'register' ? 'pt-16' : ''">
      <router-view />
    </main>
   
  </div>
</template>

<script setup>
import Navbar from './components/SharedComponents/Navbar.vue';
import {ref} from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute();
console.log(route);

</script>

<style scoped></style>
