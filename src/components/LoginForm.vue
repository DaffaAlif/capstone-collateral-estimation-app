<script setup>
import axios from 'axios'
import { ref } from 'vue'

import store from '../store'
import router from '../router'

import Snackbar from './SharedComponents/Snackbar.vue'

import {ArrowPathIcon} from '@heroicons/vue/24/outline'

const isLoading = ref(false)
const email = ref('')
const password = ref('')
const hidden = ref(true)
const errors = ref({
  email: '',
  password: '',
  login: ''
})

const validateLogin = () => {
  if (!password.value) {
    errors.value.password = 'Password harus diisi'
  } else if (password.value.length < 8) {
    errors.value.password = 'Password minimal 8 karakter'
  } else {
    errors.value.password = ''
  }
}


const handleLogin = async () => {
  try {
    isLoading.value = true
    validateLogin();
    await store.dispatch('login', { email: email.value, password: password.value })
    router.push({ name: 'Dashboard' })
  } catch (error) {
    if (error.response.data.message == "User not found" || error.response.data.message == "Wrong password") {
      errors.value.login = 'Email atau password salah'
    }
  } finally {
    isLoading.value = false
  }
}

const toggleHidden = () => {
  hidden.value = !hidden.value
}



</script>

<template>
 <div class="flex flex-col justify-center items-center w-[520px] font-inter px-12 lg:px-0">
    <img src="../assets/logo.png" class="mx-auto my-auto w-40 object-contain mb-8">
    <div class="mb-4 text-center">
      <h2 class="text-3xl font-bold">Selamat Datang Insan BSI</h2>
      <p class="text-lg">Masuk dan dapatkan perkiraan nilai properti sebagai agunan nasabah dengan cepat.</p>
    </div>
    <!-- <p v-if="errors.login" class="text-red-500">{{ errors.login }}</p> -->
   <form class="flex flex-col gap-4 w-full mt-4" @submit.prevent="handleLogin">
    <div class="gap-2">
      <label class="text-zinc-700">Email</label>
      <input placeholder="Email" type="email" name="email"
      class="border border-neutral-400 rounded py-4 px-4 w-full"  v-model="email"/>
      <span class="text-red-500" v-if="errors.email">{{ errors.email }}</span>
    </div>
    <div class="gap-2">
      <label class="text-zinc-700">Password</label>
      <div class="relative flex justify-center align-middle">
              <input placeholder="Password" :type="hidden ? 'password' : 'text'" name="password"
      class="border border-neutral-400 rounded py-4 px-4 w-full" v-model="password"/>
      <button class="absolute right-4 cursor-pointer h-full " type="button" @click="toggleHidden">
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
      <span class="text-red-500" v-if="errors.password">{{ errors.password }}</span>
    </div>
   <button class="bg-teal-500 hover:bg-teal-400 w-full py-4 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-2 mt-8 cursor-pointer" type="submit">
    <p>Masuk</p>
      <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg" :class="isLoading ? 'hidden' : 'block'">
        <path d="M1.5 7H14M14 7L8 1M14 7L8 13" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      <ArrowPathIcon class="w-6 h-6 animate-spin" v-if="isLoading" />
   </button>
    </form>
 </div>
 <Snackbar v-if="errors.login" :message="errors.login" type="failure" :isOpen="true" />
</template>

<style scoped>

</style>
