<script setup>

</script>

<template>
 <div>
  <div class=" relative font-inter" >
    <div class="absolute w-full h-full -z-10">
      <img src="../assets/bg-banner.png" class="w-full h-full absolute object-cover">
    </div>
    <div class="absolute w-full h-full backdrop-brightness-50 -z-10">
     
    </div>
    <div class="py-12 font-inter px-6 lg:px-44 text-white ">
      <h2 class="text-4xl font-semibold">
        Estimasi <span class="font-bold">Pintar</span> dalam Hitungan Detik
  </h2>
  <p class="w-[500px] mt-1">
    Masukkan detail properti dan temukan perkiraan nilai properti sebagai agunan dengan cepat dan akurat.
  </p>
    <router-link to="/estimate" class="bg-teal-500 hover:bg-teal-400 py-4 rounded-xl w-[300px] text-white font-semibold text-lg flex items-center justify-center gap-2 mt-10">
      <p>Mulai Estimasikan Properti</p>
      <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="mt-1">
  <path d="M1.5 7H14M14 7L8 1M14 7L8 13" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

    </router-link>
    </div>
  
 </div>
 </div>
</template>

<style scoped>

</style>
