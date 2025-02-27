<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import store from '../store'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import { ChevronLeftIcon, ChevronRightIcon, PencilIcon } from '@heroicons/vue/24/solid'
import { TrashIcon } from '@heroicons/vue/24/solid'
import { fetchDrafts } from '../api/api'
import router from '../router'

const props = defineProps({
  handleOpen: Function,
  getDrafts: Function,
  drafts: Array,
  totalDrafts: Number
})


const currentPage = ref(1)




const nextPage = () => {
  if (currentPage.value < Math.ceil(totalDrafts.value / 5)) {
    currentPage.value++
    props.getDrafts()
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    props.getDrafts()
  }
}

const choosePage = (page) => {
  currentPage.value = page
  props.getDrafts()
}

const handleEdit = (history) => {
  store.dispatch('setHistory', history)
  console.log(store.state.history);
  router.push({ name: 'Estimate' })
}

</script>

<template>

<div>
  <div class="flex flex-col lg:flex-row justify-between gap-4 w-full pt-6 font-inter">
    <div class="flex flex-col justify-between w-full lg:w-80 gap-4 p-5 border rounded-sm border-neutral-400 min-h-64 ">
      <div class="">
        <h3 class="text-4xl font-semibold text-teal-500 ">Draft</h3>
      <p class="text-lg">Lanjutkan proses estimasi dan simpan hasil estimasi untuk referensi di kemudian hari.</p>
      </div>
      <div class="flex justify-end align-self-end mb-0">
        <button>
         <ArrowRightIcon class="w-9 h-9 text-teal-500" />
        </button>
      </div>
    </div>
    <div v-if="drafts.length === 0" class="flex-1 border flex rounded-sm border-neutral-400 min-h-64">
        <div class="flex flex-col items-center justify-center mx-auto my-auto gap-4">
          <img src="../assets/note-add.svg" alt="note" width="40" height="20" class=" w-24 h-20" />
          <p class="text-center text-xl">Lakukan estimasi dan lihat 
            <br>
            Draft disini</p>
        </div>
      </div>
    <div v-else class="flex-1">
      <table class="w-full rounded-3xl">
    <tr class=" h-12 bg-teal-500 text-left rounded-3xl text-white">
      <th class="px-4">No</th>
      <th>Tanggal</th>
      <th >Nama</th>
    </tr> 
    <tr class="h-10 border-b border-b-neutral-400" v-for="(draft, index) in drafts">
      <td class="px-4">{{ ((currentPage - 1)  * 5 ) +index + 1 }}</td>
      <td>{{ new Date(draft.updated_at).toLocaleDateString() }}</td>
      <td>
        <div class="flex items-center gap-2">
          <p class="flex-1">{{ draft.name }}</p>
          <div class="flex gap-2 items-center py-2 w-16">
            <button @click="handleEdit(draft)">
              <PencilIcon class="w-6 h-6 text-neutral-400 cursor-pointer" />
            </button>
            <button @click="handleOpen(draft)">
              <img src="../assets/trash.svg" alt="trash" class=" w-6 h-[22px] cursor-pointer" />
            </button>
          </div>
        </div>
      </td>
      
    </tr>
    

  </table>
    </div>
  </div>
  <div v-if="drafts.length > 0" class="flex justify-end my-6">
    <button @click="prevPage">
      <ChevronLeftIcon class=" h-6 w-6 text-neutral-400" />
    </button>
    <button @click="choosePage(i)" class="py-1 px-2.5 rounded" :class="currentPage === i ? 'bg-teal-500 text-white' : ''" v-for="i in Math.ceil(totalDrafts / 5)">
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
