<template>
    <div class="mx-auto w-full px-4 xl:px-[300px] mt-10 mb-10">
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
    title: "Apa penjelasan dari setiap field pada form estimasi?",
    message: `1. Kota: Kota letak properti berada \n
2. Distrik: Kecamatan atau wilayah administratif yang lebih kecil dalam kota\n
3. Luas Tanah: Luas tanah dari properti dalam satuan meter persegi\n
4. Luas Bangunan: Luas bangunan properti dalam satuan meter persegi\n
5. Jumlah Lantai: Jumlah tingkat properti\n
6. Kekuatan Listrik: Daya listrik yang tersedia dalam properti dalam satuan watt\n
7. Jenis Sertifikat: Jenis sertifikat kepemilikan properti, seperti SHM (Sertifikat Hak Milik) atau HGB (Hak Guna Bangunan) atau SHP (Sertifikat Hak Pakai) atau Lainnya.\n
8. Kondisi Properti: Kondisi rumah saat ini, dengan tingkatan secara berurutan Bagus Sekali, Bagus, Baru, Sudah Renovasi, dan Butuh Renovasi\n
9. Jumlah Kamar: Jumlah kamar tidur dalam properti (termasuk kamar tidur pembantu)\n
10. Jumlah Kamar Mandi: Jumlah kamar mandi dalam properti (termasuk kamar mandi pembantu)\n
11. Kapasitas Garasi: Kapasitas kendaraan pada garasi\n
12. Kapasitas Carport: Kapasitas kendaraan pada carport\n`
}, {
    title: "Bagaimana cara kerja aplikasi ini dalam menghitung nilai aset?",
    message: "Aplikasi ini menghitung nilai aset menggunakan model pembelajaran mesin dengan algoritma XGBoost dengan data training yang diambil pada akhir tahun 2022. Dalam penggunaannya, model akan melakukan perhitungan dengan parameter bersumber dari masukan pengguna"
}, {
    title: "Apakah hasil estimasi yang diberikan 100% akurat?",
    message: "Aplikasi ini menghitung nilai aset menggunakan model pembelajaran mesin dengan algoritma XGBoost dengan data training yang diambil pada akhir tahun 2022. Dalam penggunaannya, model akan melakukan perhitungan dengan parameter bersumber dari masukan pengguna"
}, {
    title: "Apakah input yang telah dikerjakan tetapi belum selesai dapat disimpan sebagai draft ?",
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
    message: "Perhitungan nilai aset dibaca dengan melihat estimasi harga yang muncul beriringan dengan mempertimbangkan range estimasi yang dihasilkan."
},])




</script>

<style lang="scss" scoped></style>