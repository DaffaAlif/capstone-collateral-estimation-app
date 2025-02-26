<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import store from '../store'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'

import { ChevronLeftIcon, ChevronRightIcon, PencilIcon } from '@heroicons/vue/24/solid'
import { TrashIcon } from '@heroicons/vue/24/solid'
import { fetchHistories } from '../api/api'


const histories = ref([
  
])
const totalhistories = ref(0)
const currentPage = ref(1)

const getHistories = async() => {
  try {
    const response = await fetchHistories(currentPage.value)
    histories.value = response.data.data.histories
    totalhistories.value = response.data.data.total_data

    console.log(response.data.data);
  } catch (error) {
    console.error(error);
  }
}

const nextPage = () => {
  if (currentPage.value < Math.ceil(totalhistories.value / 5)) {
    currentPage.value++
    getHistories()
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    getHistories()
  }
}

const choosePage = (page) => {
  currentPage.value = page
  getHistories()
}

onMounted(() => {
  getHistories()
})
</script>

<template>

<div>
  <div class="flex justify-between gap-4 w-full font-inter">
   
    <div class="flex-1">
      <h3 class="text-3xl font-semibold my-4">History</h3>
      <div v-if="histories.length === 0" class="flex-1 border flex rounded-sm border-neutral-400 min-h-64">
        <div class="flex flex-col items-center justify-center mx-auto my-auto gap-4">
          <img src="../assets/note-add.svg" alt="note" width="40" height="20" class=" w-24 h-20" />
          <p class="text-center text-xl">Lakukan estimasi dan lihat 
            <br>
            History disini</p>
        </div>
      </div>
      <table class="w-full rounded-3xl" v-else>
    <tr class=" h-12 bg-teal-500 text-left rounded-3xl text-white">
      <th class="px-4">No</th>
      <th>Tanggal</th>
      <th >Nama</th>
    </tr> 
    <tr class="h-10 border-b border-b-neutral-400" v-for="(history, index) in histories">
      <td class="px-4">{{ ((currentPage - 1)  * 5 ) +index + 1 }}</td>
      <td>{{ new Date(history.updated_at).toLocaleDateString() }}</td>
      <td>
        <div class="flex items-center gap-2">
          <p class="flex-1">{{ history.name }}</p>
          <div class="flex gap-2 items-center py-2 w-16">
            <button >
              <PencilIcon class="w-6 h-6 text-neutral-400" />
            </button>
            <button >
              <img src="../assets/trash.svg" alt="trash" width="40" height="20" class=" w-6 h-[22px]" />
            </button>
          </div>
        </div>
      </td>
      
    </tr>
    

  </table>
    </div>
  </div>
  <div v-if="histories.length > 0" class="flex justify-end my-6">
    <button @click="prevPage">
      <ChevronLeftIcon class=" h-6 w-6 text-neutral-400" />
    </button>
    <button @click="choosePage(i)" class="py-1 px-2.5 rounded" :class="currentPage === i ? 'bg-teal-500 text-white' : ''" v-for="i in Math.ceil(totalhistories / 5)">
      <p>{{ i }}</p>
    </button>
    <button @click="nextPage">
      <ChevronRightIcon class=" h-6 w-6 text-neutral-400" />
    </button>
  </div>
</div>
</template>

<style scoped>

</style>
