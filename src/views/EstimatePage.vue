<template>
    <div class="px-30 py-10">
        <form @submit.prevent="handleSubmit">
            <h1 class="text-[48px] font-bold text-teal-500">Estimasi Properti</h1>
            <div class="h-[2px] w-full bg-teal-500"></div>
            <div class="flex mt-10">
                <div class="w-3/5">

                    <!-- Lokasi Section -->
                    <h1 class="text-[32px] font-bold">Lokasi</h1>
                    <div class="flex">
                        <div>
                            <label for="city-select" class="mr-2 text-gray-400">Kota</label>
                            <select id="city-select" v-model="selectedCity"
                                class="border border-gray-400 p-2 rounded-xl w-[492px]">
                                <option disabled value="">Pilih Kota</option>
                                <option v-for="city in cities" :key="city" :value="city">
                                    {{ city }}
                                </option>
                            </select>
                            <div v-if="errors.selectedCity" class="text-red-500 text-xs">
                                {{ errors.selectedCity }}
                            </div>
                        </div>
                        <div>
                            <label for="district-select" class=" text-gray-400">Distrik</label>
                            <select id="district-select" v-model="selectedDistrict" :disabled="selectedCity === ''"
                                class="border border-gray-400 p-2 rounded-xl w-[492px]">
                                <option disabled value="">Pilih Distrik</option>
                                <option v-for="district in districts" :key="district" :value="district">
                                    {{ district }}
                                </option>
                            </select>
                            <div v-if="errors.selectedDistrict" class="text-red-500 text-xs">
                                {{ errors.selectedDistrict }}
                            </div>
                        </div>
                    </div>

                    <!-- Detail Properti Section -->
                    <h1 class="text-[32px] font-bold">Detail Properti</h1>
                    <div class="flex">
                        <div>
                            <label for="land-area" class="text-gray-400">Luas Tanah (m2)</label>
                            <input id="land-area" type="number" placeholder="ex: 150" v-model="landArea"
                                class="border border-gray-400 p-2 rounded-xl w-[492px]" />
                            <div v-if="errors.landArea" class="text-red-500 text-xs">
                                {{ errors.landArea }}
                            </div>
                        </div>
                        <div>
                            <label for="building-area" class="text-gray-400">Luas Bangunan (m2)</label>
                            <input id="building-area" type="number" placeholder="ex: 110" v-model="buildingArea"
                                class="border border-gray-400 p-2 rounded-xl w-[492px]" />
                            <div v-if="errors.buildingArea" class="text-red-500 text-xs">
                                {{ errors.buildingArea }}
                            </div>
                        </div>
                    </div>
                    <div class="flex">
                        <div>
                            <label for="floors" class="text-gray-400">Jumlah Lantai</label>
                            <input id="floors" type="number" placeholder="ex: 2" v-model="numberOfFloors"
                                class="border border-gray-400 p-2 rounded-xl w-[492px]" />
                            <div v-if="errors.numberOfFloors" class="text-red-500 text-xs">
                                {{ errors.numberOfFloors }}
                            </div>
                        </div>
                        <div>
                            <label for="electrical-power" class="text-gray-400">Kekuatan Listrik (watt)</label>
                            <input id="electrical-power" type="number" placeholder="ex: 1800" v-model="electricalPower"
                                class="border border-gray-400 p-2 rounded-xl w-[492px]" />
                            <div v-if="errors.electricalPower" class="text-red-500 text-xs">
                                {{ errors.electricalPower }}
                            </div>
                        </div>
                    </div>
                    <div class="flex">
                        <div>
                            <label for="certificate-select" class="text-gray-400">Sertifikat</label>
                            <select id="certificate-select" v-model="selectedCertificate"
                                class="border border-gray-400 p-2 rounded-xl w-[492px]">
                                <option disabled value="">Pilih Jenis Sertifikat</option>
                                <option v-for="certificate in certificates" :key="certificate.value"
                                    :value="certificate.value">
                                    {{ certificate.label }}
                                </option>
                            </select>
                            <div v-if="errors.selectedCertificate" class="text-red-500 text-xs">
                                {{ errors.selectedCertificate }}
                            </div>
                        </div>
                        <div>
                            <label for="property-condition" class="text-gray-400">Kondisi Properti</label>
                            <select id="property-condition" v-model="propertyCondition"
                                class="border border-gray-400 p-2 rounded-xl w-[492px]">
                                <option disabled value="">Pilih Kondisi Properti</option>
                                <option v-for="condition in propertyConditions" :key="condition.value"
                                    :value="condition.value">
                                    {{ condition.label }}
                                </option>
                            </select>
                            <div v-if="errors.propertyCondition" class="text-red-500 text-xs">
                                {{ errors.propertyCondition }}
                            </div>
                        </div>
                    </div>

                    <!-- Fasilitas Section -->
                    <h1 class="text-[32px] font-bold">Fasilitas</h1>
                    <div class="flex">
                        <div>
                            <label for="rooms" class="text-gray-400">Jumlah Kamar</label>
                            <input id="rooms" type="number" placeholder="ex: 5" v-model="numberOfRooms"
                                class="border border-gray-400 p-2 rounded-xl w-[492px]" />
                            <div v-if="errors.numberOfRooms" class="text-red-500 text-xs">
                                {{ errors.numberOfRooms }}
                            </div>
                        </div>
                        <div>
                            <label for="bathrooms" class="text-gray-400">Jumlah Kamar Mandi</label>
                            <input id="bathrooms" type="number" placeholder="ex: 4" v-model="numberOfBathrooms"
                                class="border border-gray-400 p-2 rounded-xl w-[492px]" />
                            <div v-if="errors.numberOfBathrooms" class="text-red-500 text-xs">
                                {{ errors.numberOfBathrooms }}
                            </div>
                        </div>
                    </div>
                    <div class="flex">
                        <div>
                            <label for="rooms" class="text-gray-400">Kapasitas Garasi</label>
                            <input id="rooms" type="number" placeholder="ex: 2" v-model="numberOfGarages"
                                class="border border-gray-400 p-2 rounded-xl w-[492px]" />
                            <div v-if="errors.numberOfGarages" class="text-red-500 text-xs">
                                {{ errors.numberOfGarages }}
                            </div>
                        </div>
                        <div>
                            <label for="bathrooms" class="text-gray-400">Jumlah Carport</label>
                            <input id="bathrooms" type="number" placeholder="ex: 1" v-model="numberOfCarports"
                                class="border border-gray-400 p-2 rounded-xl w-[492px]" />
                            <div v-if="errors.numberOfCarports" class="text-red-500 text-xs">
                                {{ errors.numberOfCarports }}
                            </div>
                        </div>
                    </div>
                    <div>
                        <p class="text-gray-400">Fasilitas yang tersedia</p>
                        <div class="grid grid-cols-3 gap-1">
                            <label v-for="facility in facilities" :key="facility.value" class="text-[18px]">
                                <input type="checkbox" :value="facility.value" v-model="selectedFacilities" />
                                {{ facility.label }}
                            </label>
                        </div>
                    </div>

                

                </div>


                <!-- Card -->
                <div class="w-[411px] ml-[150px]">
                    <div class="bg-[#F3F3F3] px-4 py-2 rounded-md">
                        <h1 class="text-[24px] text-center">Estimasi Harga</h1>
                        <div class="bg-white rounded-md mt-3 p-2">
                            <h1 class="text-center font-bold text-[32px] text-[#24A29F]">Rp 1.500.000.000</h1>
                            <p class="text-center text-[12px]">
                                Estimation Error <span class="text-red-500">19%</span>
                            </p>
                        </div>
                        <p class="text-center font-bold">Range Estimasi</p>
                        <div class="bg-[#DDDDDD] rounded-md p-2 mt-2">
                            <p class="text-center font-bold">Rp. 100.000 - Rp. 100.000</p>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <button @click="isOpen = true" class="btn btn-blue bg-[#24A29F] text-white rounded-md p-3 mt-10">
                            Estimate
                        </button>
                        <button class="btn btn-blue text-[#24A29F] border-[#24A29F] border-[2px] rounded-md p-3">
                            Simpan
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
  
<script setup>
import { ref, computed } from 'vue'
import city_to_district from '../data/city_to_districts'
import district_lat_long from '../data/district_lat_long'
import SaveModal from '../components/SaveModal.vue';

const selectedCity = ref('')
const selectedDistrict = ref('')
const landArea = ref('')
const buildingArea = ref('')
const numberOfFloors = ref('')
const electricalPower = ref('')
const selectedCertificate = ref('')
const propertyCondition = ref('')
const numberOfRooms = ref('')
const numberOfBathrooms = ref('')
const numberOfGarages = ref('')
const numberOfCarports = ref('')
const selectedFacilities = ref([])

// Reactive errors object
const errors = ref({})

// Options for selects and checkboxes
const cities = Object.keys(city_to_district).map(
    city => city.charAt(0).toUpperCase() + city.slice(1)
)
const certificates = ref([
    { label: 'SHM', value: 'SHM' },
    { label: 'SHGB', value: 'SHGB' },
    { label: 'SHP', value: 'SHP' },
    { label: 'Lainnya', value: 'Lainnya' },
])
const propertyConditions = ref([
    { label: 'Butuh Renovasi', value: 1 },
    { label: 'Sudah Renovasi', value: 2 },
    { label: 'Baru', value: 3 },
    { label: 'Bagus', value: 4 },
    { label: 'Bagus Sekali', value: 5 },
])
const facilities = ref([

    { label: 'Kolam Renang', value: 'Kolam Renang' },
    { label: 'Keamanan', value: 'Keamanan' },
    { label: 'Tempat Jemuran', value: 'Tempat Jemuran' },

    { label: 'Taman', value: 'Taman' },
    { label: 'Akses Parkir', value: 'Akses Parkir' },
])

const districts = computed(() => {
    if (!selectedCity.value) return []
    const key = selectedCity.value.toLowerCase()
    return city_to_district[key] || []
})

function validateForm() {
    errors.value = {}

    if (!selectedCity.value) {
        errors.value.selectedCity = 'Kota harus dipilih.'
    }
    if (!selectedDistrict.value) {
        errors.value.selectedDistrict = 'Distrik harus dipilih.'
    }
    if (!landArea.value || Number(landArea.value) <= 0) {
        errors.value.landArea = 'Luas tanah harus lebih dari 0.'
    }
    if (!buildingArea.value || Number(buildingArea.value) <= 0) {
        errors.value.buildingArea = 'Luas bangunan harus lebih dari 0.'
    }
    if (!numberOfFloors.value || Number(numberOfFloors.value) <= 0) {
        errors.value.numberOfFloors = 'Jumlah lantai harus lebih dari 0.'
    }
    if (!electricalPower.value || Number(electricalPower.value) <= 0) {
        errors.value.electricalPower = 'Kekuatan listrik harus lebih dari 0.'
    }
    if (!selectedCertificate.value) {
        errors.value.selectedCertificate = 'Jenis sertifikat harus dipilih.'
    }
    if (!propertyCondition.value) {
        errors.value.propertyCondition = 'Kondisi properti harus dipilih.'
    }
    if (!numberOfRooms.value || Number(numberOfRooms.value) <= 0) {
        errors.value.numberOfRooms = 'Jumlah kamar harus lebih dari 0.'
    }
    if (!numberOfBathrooms.value || Number(numberOfBathrooms.value) <= 0) {
        errors.value.numberOfBathrooms = 'Jumlah kamar mandi harus lebih dari 0.'
    }
    if (!numberOfGarages.value || Number(numberOfGarages.value) <= 0) {
        errors.value.numberOfGarages = 'Jumlah garasi harus lebih dari 0.'
    }
    if (!numberOfCarports.value || Number(numberOfCarports.value) <= 0) {
        errors.value.numberOfCarports = 'Jumlah carport harus lebih dari 0.'
    }


    return Object.keys(errors.value).length === 0
}

//   {
//     "name": "RUMAH A",
//     "city": "Jakarta",
//     "latitude": 38.8951,
//     "longitude": -77.0364,
//     "swimming_pool": false,
//     "garage": 1,
//     "carport": 1,
//     "garden": false,
//     "parking_access": true,
//     "drying_area": true,
//     "security": true,
//     "bedrooms": 5,
//     "bathrooms": 3,
//     "land_size": 12,
//     "building_size": 12,
//     "certificate": "SHM",
//     "electricity": 3,
//     "floors": 2,
//     "property_condition": 4,
//     "price_in_rp": 1500000000.0,
//     "is_completed": false
// }

function handleSubmit() {
    if (!validateForm()) {
        console.log('Validation failed:', errors.value)
        return
    }
    const formData = {
    city: selectedCity.value.toLowerCase(),
    latitude: district_lat_long[selectedDistrict.value]?.lat || 0, 
    longitude: district_lat_long[selectedDistrict.value]?.long || 0, 
    land_size: Number(landArea.value),
    building_size: Number(buildingArea.value),
    floors: Number(numberOfFloors.value),
    electricity: Number(electricalPower.value),
    certificate: selectedCertificate.value,
    property_condition: Number(propertyCondition.value),
    bedrooms: Number(numberOfRooms.value),
    bathrooms: Number(numberOfBathrooms.value),
    swimming_pool: selectedFacilities.value.includes("Kolam Renang") ? 1 : 0,
    garage: Number(numberOfGarages.value),
    carport: Number(numberOfCarports.value),
    garden: selectedFacilities.value.includes("Taman") ? 1 : 0,
    drying_area: selectedFacilities.value.includes("Tempat Jemuran") ? 1 : 0,
    security: selectedFacilities.value.includes("Keamanan") ? 1 : 0,
    parking_access: selectedFacilities.value.includes("Akses Parkir") ? 1 : 0
  }

  console.log("Submitted Form Data:", formData)
}
</script>
  
<style scoped>
label {
    margin-bottom: 0.3rem;
}

.flex {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}

.text-red-500 {
    color: #f56565;
}
</style>
  