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
  totalDrafts: Number,
  currentPageDraft: Number,
  setCurrentPageDraft: Function
})






const nextPage = () => {
  if (props.currentPageDraft < Math.ceil(props.totalDrafts / 5)) {
    props.setCurrentPageDraft(props.currentPageDraft + 1)
    props.getDrafts()
  }
}

const prevPage = () => {
  if (props.currentPageDraft > 1) {
    props.setCurrentPageDraft(props.currentPageDraft - 1)
    props.getDrafts()
  }
}

const choosePage = (page) => {
  props.setCurrentPageDraft(page)
  props.getDrafts()
}

const handleEdit = (history) => {
  store.dispatch('setHistory', history)
  console.log(store.state.history);
  router.push({ name: 'Estimate' , query: { edit: true } })
}

</script>

<template>

<div>
  <div class="flex flex-col lg:flex-row justify-center gap-4 w-full pt-6 font-inter">
    <div class="flex flex-col justify-between max-w-[1200px] lg:w-80 gap-4 p-5 border rounded-sm border-neutral-400 min-h-64 ">
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
    <div v-if="drafts.length === 0" class="border flex rounded-sm border-neutral-400 min-h-64 w-[880px]">
        <div class="flex flex-col items-center justify-center mx-auto my-auto gap-4">
          <img src="../assets/note-search.svg" alt="note" width="40" height="20" class=" w-24 h-20" />
          <p class="text-center text-xl">Lakukan estimasi dan lihat 
            <br>
            Draft disini</p>
        </div>
      </div>
    <div v-else class="max-w-[880px] flex-1">
      <table class="w-full rounded-3xl">
    <tr class=" h-12 bg-teal-500 text-left rounded-3xl text-white">
      <th class="max-w-[125px] px-4">No</th>
      <th class="max-w-[270px] px-2">Tanggal</th>
      <th class="px-2">Nama</th>
    </tr> 
    <tr class="h-10 border-b border-b-neutral-400" v-for="(draft, index) in drafts">
      <td class="px-4">{{ ((currentPageDraft - 1)  * 5 ) +index + 1 }}</td>
      <td class="px-2">{{ new Date(draft.updated_at).toLocaleDateString() }}</td>
      <td>
        <div class="flex items-center gap-2">
          <p class="flex-1">{{ draft.name }}</p>
          <div class="flex items-center py-2">
            <button @click="handleEdit(draft)">
              <PencilIcon class="w-6 h-6 mx-4 text-neutral-400 cursor-pointer" />
            </button>
            <button @click="handleOpen(draft)">
              <img src="../assets/trash.svg" alt="trash" class="mx-4 w-6 h-[22px] cursor-pointer" />
            </button>
          </div>
        </div>
      </td>
      
    </tr>
    

  </table>
    </div>
    
  </div>
  <div v-if="drafts.length > 0" class="flex max-w-[1200px]  mx-auto justify-end my-6">
    <button @click="prevPage">
      <ChevronLeftIcon class=" h-6 w-6 text-neutral-400" />
    </button>
    <button @click="choosePage(i)" class="py-1 px-2.5 rounded" :class="currentPageDraft === i ? 'bg-teal-500 text-white' : ''" v-for="i in Math.ceil(totalDrafts / 5)">
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
