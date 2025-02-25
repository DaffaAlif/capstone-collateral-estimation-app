<script setup>
import axios from 'axios'
import { ref } from 'vue'

import store from '../store'
import router from '../router'

const email = ref('')
const password = ref('')


const handleLogin = async () => {
  try {
    store.dispatch('login', { email: email.value, password: password.value })
    router.push({ name: 'Dashboard' })
  } catch (error) {
    console.error(error)
  }
}



</script>

<template>
 <div class="flex my-8 border">
   <input placeholder="email" type="email" v-model="email"/>
   <input placeholder="password" type="password" v-model="password"/>
   <button @click="handleLogin" class="bg-blue-500">Login</button>
 </div>
</template>

<style scoped>

</style>
