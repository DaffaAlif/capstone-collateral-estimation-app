<script setup>
import { onMounted, ref } from 'vue';
import Banner from '../components/Banner.vue';
import DeleteModal from '../components/DeleteModal.vue';
import TableDraft from '../components/TableDraft.vue';
import TableHistory from '../components/TableHistory.vue';
import { fetchDrafts, fetchHistories } from '../api/api';

const histories = ref([
  
])
const totalhistories = ref(0)

const isOpen = ref(false)
const isCompletedDelete = ref(false)
const idDelete = ref(null)
const history = ref({
    id: null,
    is_completed: null
})

const handleOpen = (objHistory) => {
    isOpen.value = !isOpen.value;
    history.value = objHistory;// Store reference to refresh function
};
const getDrafts = async() => {
  try {
    const response = await fetchDrafts(currentPage.value)
    drafts.value = response.data.data.histories
    totalDrafts.value = response.data.data.total_data

    console.log(response.data.data);
  } catch (error) {
    console.error(error);
  }
}

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
const drafts = ref([
  
])
const totalDrafts = ref(0)
const currentPage = ref(1)

onMounted(() => {
  getDrafts()
  getHistories()
})

</script>
<template>
    <div class="flex flex-col pb-8">
        <Banner />
        <div class="mx-auto w-full mt-8">
            <div class="px-4 lg:px-52">
                <TableDraft :handleOpen="handleOpen" :getDrafts="getDrafts" :drafts="drafts" :totalDrafts="totalDrafts"/>
            </div>
            <div class=" px-2 lg:px-44 my-12">
                <div class="w-full h-[1px] bg-neutral-400 mt-6"></div>
            </div>
            <div class="px-4 lg:px-52">
                <TableHistory :handleOpen="handleOpen" :getHistories="getHistories" :histories="histories" :totalhistories="totalhistories" />
            </div>
        </div>
    </div>
    <DeleteModal :isOpen="isOpen" :handleOpen="handleOpen" :history="history" :getDrafts="getDrafts" :getHistories="getHistories"/>
</template>



<style scoped>

</style>