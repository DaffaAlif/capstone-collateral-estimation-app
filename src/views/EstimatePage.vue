<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <h1>Estimasi Properti</h1>

            <h1>Lokasi</h1>
            <label>
                Kota
            </label>
            <select v-model="selectedCity">
                <option disabled value="">Pilih Kota</option>
                <option v-for="city in cities" :key="city" :value="city">
                    {{ city }}
                </option>
            </select>
            <label>
                Distrik
            </label>

            <select v-model="selectedDistrict">
                <option disabled value="">Pilih Distrik</option>
                <option v-for="district in districts" :key="district" :value="district">
                    {{ district }}
                </option>
            </select>

            <h1>Detail Properti</h1>
            <label>
                Luas Tanah (m2)
            </label>
            <input type="number" placeholder="ex: 150" />
            <label>
                Luas Bangunan (m2)
            </label>
            <input type="number" placeholder="ex: 110" />
            <label>
                Jumlah Lantai
            </label>
            <input type="number" placeholder="ex: 2" />
            <label>
                Kekuatan Listrik (watt)
            </label>
            <input type="number" placeholder="ex: 1800" />
            <label>
                Sertifikat
            </label>
            <select v-model="selectedCertificate">
                <option disabled value="">Pilih Jenis Sertifikat</option>
                <option v-for="certificate in certificates" :key="certificate.value" :value="certificate.value">
                    {{ certificate.label }}
                </option>
            </select>
            <label>
                Kondisi Properti
            </label>
            <select>
                <option disabled value="">Pilih Kondisi Properti</option>
                <option v-for="propertyCondition in propertyConditions" :key="propertyCondition.value"
                    :value="propertyCondition.value">
                    {{ propertyCondition.label }}
                </option>
            </select>

            <h1>Fasilitas</h1>
            <label>
                Jumlah Kamar
            </label>
            <input type="number" placeholder="ex: 5" />
            <label>
                Jumlah Kamar Mandi
            </label>
            <input type="number" placeholder="ex: 4" />
            <p>Fasilitas yang tersedia</p>
            <div class="flex">
                <label v-for="facility in facilities" :key="facility.value">
                    <input type="checkbox" :value="facility.value" v-model="selectedFacilities" />
                    {{ facility.label }}
                </label>
            </div>

            <button type="submit" class="border-t-neutral-400">Estimate</button>
        </form>
    </div>
</template>
  
<script setup>
import { ref, computed } from 'vue'
import city_to_district from "../data/city_to_districts"
import district_lat_long from "../data/district_lat_long"

// Facilities
const facilities = ref([
    { label: "Garasi", value: "Garasi" },
    { label: "Kolam Renang", value: "Kolam Renang" },
    { label: "Keamanan", value: "Keamanan" },
    { label: "Tempat Jemuran", value: "Tempat Jemuran" },
    { label: "Carport", value: "Carport" },
    { label: "Taman", value: "Taman" },
    { label: "Akses Parkir", value: "Akses Parkir" },
])

// Certificates
const certificates = ref([
    { label: "SHM", value: "SHM" },
    { label: "SHGB", value: "SHGB" },
    { label: "SHP", value: "SHP" },
    { label: "Lainnya", value: "Lainnya" },
])

const propertyConditions = ref([
    { label: "Butuh Renovasi", value: 1 },
    { label: "Sudah Renovasi", value: 2 },
    { label: "Baru", value: 3 },
    { label: "Bagus", value: 4 },
    { label: "Bagus Sekali", value: 5 },
])


const cities = Object.keys(city_to_district).map(
    city => city.charAt(0).toUpperCase() + city.slice(1)
)
const selectedCity = ref('')
const selectedDistrict = ref('')


const districts = computed(() => {
    if (!selectedCity.value) return []
    const key = selectedCity.value.toLowerCase()
    return city_to_district[key] || []
})

const selectedCertificate = ref('')
const selectedFacilities = ref([])

function handleSubmit() {
    console.log("Selected City:", selectedCity.value)
    console.log("Selected District:", selectedDistrict.value)
    console.log("Selected Certificate:", selectedCertificate.value)
    console.log("Selected Facilities:", selectedFacilities.value)
}
</script>
  
<style scoped>
/* Optional styling */
label {
    display: block;
    margin-bottom: 0.5rem;
}
</style>
  