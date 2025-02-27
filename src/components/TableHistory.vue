<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import store from '../store'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'

import { ArrowPathIcon, ChevronLeftIcon, ChevronRightIcon, PencilIcon } from '@heroicons/vue/24/solid'
import { TrashIcon } from '@heroicons/vue/24/solid'
import { fetchHistories } from '../api/api'
import router from '../router'

const props = defineProps({
  handleOpen: Function,
  getHistories: Function,
  histories: Array,
  totalhistories: Number,
  currentPageHistory: Number,
  setCurrentPageHistory: Function
})

const handleEdit = (history) => {
  store.dispatch('setHistory', history)
  console.log(store.state.history);
  router.push({ name: 'Estimate' , query: { edit: true } })
}

const isLoading = ref(false)


const nextPage = async () => {
  isLoading.value = false
try {
  if (props.currentPageHistory < Math.ceil(props.totalhistories / 5)) {
    props.setCurrentPageHistory(props.currentPageHistory + 1)
    await props.getHistories()
  }
} catch (error) {
  console.error(error);
} finally{
  isLoading.value = false
}
}

const prevPage = async () => {
  isLoading.value = false
  try {
    if (props.currentPageHistory > 1) {
    props.setCurrentPageHistory(props.currentPageHistory - 1)
    await props.getHistories()
  }
  } catch (error) {
   console.error(error) 
  } finally{
    isLoading.value = false
  }
}

const choosePage = async (page) => {
  isLoading.value = false
  try {
    props.setCurrentPageHistory(page)
    await props.getHistories()
  
  } catch (error) {
   console.error(error) 
  } finally{
    isLoading.value = false
  }

}

onMounted( async () => {
  try {
    isLoading.value = true
    await props.getHistories()
   
  } catch (error) {
    
  } finally{
    isLoading.value = false
  }
})
</script>

<template>

<div>
  <div class="flex justify-between gap-4 max-w-[1216px] mx-auto font-inter">
   
    <div class="flex-1">
      <h3 class="text-3xl font-semibold my-4">History</h3>
      <div v-if="isLoading" class="flex-1 border flex rounded-sm border-neutral-400 min-h-64">
        <div class="flex flex-col items-center justify-center mx-auto my-auto gap-4">
          <ArrowPathIcon class="w-20 h-20 animate-spin text-neutral-500"></ArrowPathIcon>
        </div>
      </div>
      <div v-else-if="histories.length === 0" class="flex-1 border flex rounded-sm border-neutral-400 min-h-64">
        <div class="flex flex-col items-center justify-center mx-auto my-auto gap-4">
          <img src="../assets/note-search.svg" alt="note" width="40" height="20" class=" w-24 h-20" />
          <p class="text-center text-xl">Lakukan estimasi dan lihat 
            <br>
            History disini</p>
        </div>
      </div>
      <table class="w-full rounded-3xl" v-else>
    <tr class=" h-12 bg-teal-500 text-left rounded-3xl text-white">
      <th class="max-w-[125px] px-4">No</th>
      <th class="max-w-[270px] px-2">Tanggal</th>
      <th class="w-[270px] px-2">Nama</th>
      <th class="max-w-[270px] px-2"> Kota</th>
      <th class="w-[400px] px-2"> Estimasi </th>
    </tr> 
    <tr class="h-10 border-b border-b-neutral-400" v-for="(history, index) in histories">
      <td class="px-4">{{ ((props.currentPageHistory - 1)  * 5 ) +index + 1 }}</td>
      <td class="px-2">{{ new Date(history.updated_at).toLocaleDateString() }}</td>
      <td class="px-2">{{ history.name }}</td>
      <td class="px-2">{{ history.city.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }}</td>
      <td>
        <div class="flex items-center gap-2">
          <p class="flex-1">Rp {{  history.price_in_rp.toLocaleString('id-ID') }}</p>
          <div class="flex items-center ">
            <button @click="handleEdit(history)">
              <PencilIcon class="w-6 h-6 text-neutral-400 mx-4 cursor-pointer" />
            </button>
            <button @click="handleOpen(history)">
              <img src="../assets/trash.svg" alt="trash" class=" w-6 h-[22px] mx-4 cursor-pointer" />
            </button>
          </div>
        </div>
      </td>
      
    </tr>
    

  </table>
    </div>
  </div>
  <div v-if="histories.length > 0" class="flex justify-end max-w-[1216px] mx-auto my-6">
    <button @click="prevPage">
      <ChevronLeftIcon class=" h-6 w-6 text-neutral-400" />
    </button>
    <button @click="choosePage(i)" class="py-1 px-2.5 rounded" :class="props.currentPageHistory === i ? 'bg-teal-500 text-white' : ''" v-for="i in Math.ceil(totalhistories / 5)">
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
