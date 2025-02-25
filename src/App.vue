<template>
  <div class="">
    <Navbar />
    <main >
      <router-view />
    </main>
   
  </div>
</template>

<script setup>
import Navbar from './components/SharedComponents/Navbar.vue';

</script>

<style scoped></style>
