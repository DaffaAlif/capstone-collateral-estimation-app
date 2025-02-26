<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import store from '../store'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import { PencilIcon } from '@heroicons/vue/24/solid'
import { TrashIcon } from '@heroicons/vue/24/solid'

const histories = ref([
  
])

const getHistory = async() => {
  try {
    const response = await axios.get('http://localhost:5000/api/v1/history', {
      headers: {
        Authorization: `Bearer ${store.state.token}`
      }
    })
    histories.value = response.data.data

    console.log(response.data.data);
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  getHistory()
})
</script>

<template>

  <div class="flex justify-between gap-4 w-full pt-6 font-inter">
    
    <div class="flex-1">
      <table class="w-full rounded-3xl">
    <tr class=" h-12 bg-teal-500 text-left rounded-3xl text-white">
      <th class="px-4">No</th>
      <th>Tanggal</th>
      <th >Nama</th>
    </tr> 
    <tr class="h-10 border-b border-b-neutral-400" v-for="(history, index) in histories">
      <td class="px-4">{{ index + 1 }}</td>
      <td>{{ new Date(history.updated_at).toLocaleDateString() }}</td>
      <td>
        <div class="flex items-center gap-2">
          <p class="flex-1">{{ history.name }}</p>
          <div class="flex gap-2 items-center py-2 w-16">
            <button >
              <PencilIcon class="w-6 h-6 text-neutral-400" />
            </button>
            <button >
              <TrashIcon class="w-6 h-6 text-neutral-400" />  
            </button>
          </div>
        </div>
      </td>
      
    </tr>
    

  </table>
    </div>
  </div>
</template>

<style scoped>

</style>
