<template>
    <div class="mx-auto w-full px-[300px] mt-10 mb-10">
        <div class="flex flex-col gap-4">
            <h1 class="text-[48px] text-[#24A29F] text-center font-medium mb-10">Frequently Asked Questions</h1>

            <Accordion v-for="data in AccordionData" :title="data.title" :message="data.message" />


        </div>
    </div>
</template>

<script setup>
import Accordion from '../components/SharedComponents/Accordion.vue';
import { ref } from 'vue';

const AccordionData = ref([{
    title: "Apa itu Smart Collateral?",
    message: "Smart Collateral adalah aplikasi internal PT Bank Syariah Indonesia (BSI) yang dapat digunakan oleh Karyawan Marketing SME BSI untuk membantu proses perhitungan nilai aset agunan"
},
{
    title: "Bagaimana cara kerja aplikasi ini dalam menghitung nilai aset?",
    message: "Aplikasi ini menghitung nilai aset menggunakan model pembelajaran mesin dengan algoritma XGBoost dengan data training yang diambil pada akhir tahun 2022. Dalam penggunaannya, model akan melakukan perhitungan dengan parameter bersumber dari masukan pengguna"
}, {
    title: "Apakah hasil estimasi yang diberikan 100% akurat?",
    message: "Hasil estimasi yang diberikan tidak 100% akurat, karena memiliki rasio error. Dalam versi ini, estimasi memiliki rasio error sekitar 19%. Untuk membantu memperkirakan, aplikasi ini akan menampilkan batas bawah dan batas atas harga."
}, {
    title: "Apakah input yang telah dikerjakan tetapi belum selesai dapat disimpan sebagai draft ?",
    message: "Aplikasi ini menghitung nilai aset menggunakan model pembelajaran mesin dengan algoritma XGBoost dengan data training yang diambil pada akhir tahun 2022. Dalam penggunaannya, model akan melakukan perhitungan dengan parameter bersumber dari masukan pengguna"
}, {
    title: "Apakah data yang telah di-estimasikan bisa di-edit lagi?",
    message: "Pengguna dapat mengedit perhitungan yang telah dilakukan dengan menekan ikon pensil pada laman history"
}, {
    title: "Jika saya mendapatkan error atau gagal ketika memasukkan data, bagaimana cara mengatasinya?",
    message: "Pastikan format penulisan data telah lengkap dan sesuai dengan panduan dan contoh yang diberikan. Apabila masih error, dapat membuat tiket pada aplikasi ITku."
}, {
    title: "Jika ada error atau crash, bagaimana prosedur yang harus dilakukan?",
    message: "Baca pesan error yang muncul aplikasi dan coba lakukan perbaikan. Apabila belum mendapatkan cara ataupun error masih muncul, Anda dapat membuat tiket pada aplikasi IT ku."
}, {
    title: "Aplikasi terasa lambat atau tidak merespons, apa yang harus dilakukan?",
    message: `Apabila perhitungan lambat atau tidak merespons, anda dapat melakukan langkah berikut:\n
1. Pastikan koneksi dengan jaringan aplikasi lancar.\n
2. Lakukan refresh laman aplikasi.\n
3. Apabila belum bisa, buat laporan pada aplikasi IT-Ku.`
}, {
    title: "Mengapa hasil perhitungan aset saya tidak sesuai atau terlihat aneh?",
    message: "Apabila perhitungan tidak sesuai atau terlihat aneh, pastikan kembali data yang Anda masukkan benar dan sesuai panduan pengisian dan coba lakukan perhitungan kembali. Apabila masih sama, hubungi penanggung jawab aplikasi dan Anda dapat melakukan perhitungan secara manual untuk sementara waktu."
}, {
    title: "Bagaimana cara membaca hasil perhitungan nilai aset?",
    message: "erhitungan nilai aset dibaca dengan melihat estimasi harga yang muncul beriringan dengan mempertimbangkan range estimasi yang dihasilkan."
},])




</script>

<style lang="scss" scoped></style>