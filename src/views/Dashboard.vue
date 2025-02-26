<script setup>
import Banner from '../components/Banner.vue';
import TableDraft from '../components/TableDraft.vue';
import TableHistory from '../components/TableHistory.vue';

</script>
<template>
    <div class="flex flex-col pb-8">
        <Banner />
        <div class="mx-auto w-full">
            <div class="px-52">
                <TableDraft />
            </div>
            <div class=" px-44">
                <div class="w-full h-[1px] bg-neutral-400 mt-6"></div>
            </div>
            <div class="px-52">
                <TableHistory />
            </div>
        </div>
    </div>
</template>



<style scoped>

</style>