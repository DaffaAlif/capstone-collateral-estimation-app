<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import store from '../store'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import { PencilIcon } from '@heroicons/vue/24/solid'
import { TrashIcon } from '@heroicons/vue/24/solid'

const drafts = ref([
  
])

const getDrafts = async() => {
  try {
    const response = await axios.get('http://localhost:5000/api/v1/history', {
      headers: {
        Authorization: `Bearer ${store.state.token}`
      }
    })
    drafts.value = response.data.data

    console.log(response.data.data);
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  getDrafts()
})
</script>

<template>

  <div class="flex justify-between gap-4 w-full pt-6 font-inter">
    <div class="flex flex-col justify-between w-80 gap-4 p-5 border rounded-sm border-neutral-400">
      <div class="">
        <h3 class="text-4xl font-semibold text-teal-500">Draft</h3>
      <p class="text-lg">Lanjutkan proses estimasi dan simpan hasil estimasi untuk referensi di kemudian hari.</p>
      </div>
      <div class="flex justify-end align-self-end mb-0">
        <button>
         <ArrowRightIcon class="w-9 h-9 text-teal-500" />
        </button>
      </div>
    </div>
    <div class="flex-1">
      <table class="w-full rounded-3xl">
    <tr class=" h-12 bg-teal-500 text-left rounded-3xl text-white">
      <th class="px-4">No</th>
      <th>Tanggal</th>
      <th >Nama</th>
    </tr> 
    <tr class="h-10 border-b border-b-neutral-400" v-for="(draft, index) in drafts">
      <td class="px-4">{{ index + 1 }}</td>
      <td>{{ new Date(draft.updated_at).toLocaleDateString() }}</td>
      <td>
        <div class="flex items-center gap-2">
          <p class="flex-1">{{ draft.name }}</p>
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
