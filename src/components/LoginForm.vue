<script setup>
import axios from 'axios'
import { ref } from 'vue'

import store from '../store'
import router from '../router'

const email = ref('')
const password = ref('')
const hidden = ref(true)


const handleLogin = async () => {
  try {
    store.dispatch('login', { email: email.value, password: password.value })
    router.push({ name: 'Dashboard' })
  } catch (error) {
    console.error(error)
  }
}

const toggleHidden = () => {
  hidden.value = !hidden.value
}



</script>

<template>
 <div class="flex flex-col justify-center items-center w-[520px] font-inter">
    <img src="../assets/logo.png" class="mx-auto w-40 object-contain mb-8">
    <div class="mb-12">
      <h2 class="text-3xl font-bold">Selamat Datang Insan BSI</h2>
    <p class="text-lg">Masuk dan dapatkan perkiraan nilai properti sebagai agunan nasabah dengan cepat.</p>
    </div>
   <form class="flex flex-col gap-4 w-full my">
    <div class="gap-2">
      <label class="text-zinc-700">Email</label>
      <input placeholder="Email" type="email" name="email"
      class="border border-neutral-400 rounded py-4 px-4 w-full"  v-model="email"/>
    </div>
    <div class="gap-2 relative">
      <label class="text-zinc-700">Password</label>
      <input placeholder="Password" :type="hidden ? 'password' : 'text'" name="password"
      class="border border-neutral-400 rounded py-4 px-4 w-full" v-model="password"/>
      <button class="absolute right-4 top-1/2 cursor-pointer" type="button" @click="toggleHidden">
        <div :class="hidden ? 'block' : 'hidden'">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        </div>
        <div :class="hidden ? 'hidden' : 'block'">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>

        </div>
      </button>
    </div>
   <button @click="handleLogin" class="bg-teal-500 w-full py-4 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-2 mt-8">
    <p>Login</p>
    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="mt-1">
<path d="M1.5 7H14M14 7L8 1M14 7L8 13" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

   </button>
    </form>
 </div>
</template>

<style scoped>

</style>
