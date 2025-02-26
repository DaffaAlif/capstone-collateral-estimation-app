<template>
    <div class="px-30 py-10">
      <h1 class="text-[48px] font-bold text-teal-500">Estimasi Properti</h1>
      <div class="h-[2px] w-full bg-teal-500"></div>
      <div class="flex mt-10">
        <div class="w-3/5">
          <form @submit.prevent="handleSubmit">
            <!-- Lokasi Section -->
            <h1 class="text-[32px] font-bold">Lokasi</h1>
            <div class="flex">
              <div>
                <label for="city-select" class="mr-2 text-gray-400" >Kota</label>
                <select
                  id="city-select"
                  v-model="selectedCity"
                  class="border border-gray-400 p-2 rounded-xl w-[492px]"
                >
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
                <select
                  id="district-select"
                  v-model="selectedDistrict"
                  :disabled="selectedCity === ''"
                  class="border border-gray-400 p-2 rounded-xl w-[492px]"
                >
                  <option disabled value="">Pilih Distrik</option>
                  <option
                    v-for="district in districts"
                    :key="district"
                    :value="district"
                  >
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
                <input
                  id="land-area"
                  type="number"
                  placeholder="ex: 150"
                  v-model="landArea"
                  class="border border-gray-400 p-2 rounded-xl w-[492px]"
                />
                <div v-if="errors.landArea" class="text-red-500 text-xs">
                  {{ errors.landArea }}
                </div>
              </div>
              <div>
                <label for="building-area" class="text-gray-400">Luas Bangunan (m2)</label>
                <input
                  id="building-area"
                  type="number"
                  placeholder="ex: 110"
                  v-model="buildingArea"
                  class="border border-gray-400 p-2 rounded-xl w-[492px]"
                />
                <div v-if="errors.buildingArea" class="text-red-500 text-xs">
                  {{ errors.buildingArea }}
                </div>
              </div>
            </div>
            <div class="flex">
              <div>
                <label for="floors" class="text-gray-400">Jumlah Lantai</label>
                <input
                  id="floors"
                  type="number"
                  placeholder="ex: 2"
                  v-model="numberOfFloors"
                  class="border border-gray-400 p-2 rounded-xl w-[492px]"
                />
                <div v-if="errors.numberOfFloors" class="text-red-500 text-xs">
                  {{ errors.numberOfFloors }}
                </div>
              </div>
              <div>
                <label for="electrical-power" class="text-gray-400">Kekuatan Listrik (watt)</label>
                <input
                  id="electrical-power"
                  type="number"
                  placeholder="ex: 1800"
                  v-model="electricalPower"
                  class="border border-gray-400 p-2 rounded-xl w-[492px]"
                />
                <div v-if="errors.electricalPower" class="text-red-500 text-xs">
                  {{ errors.electricalPower }}
                </div>
              </div>
            </div>
            <div class="flex">
              <div>
                <label for="certificate-select" class="text-gray-400">Sertifikat</label>
                <select
                  id="certificate-select"
                  v-model="selectedCertificate"
                  class="border border-gray-400 p-2 rounded-xl w-[492px]"
                >
                  <option disabled value="">Pilih Jenis Sertifikat</option>
                  <option
                    v-for="certificate in certificates"
                    :key="certificate.value"
                    :value="certificate.value"
                  >
                    {{ certificate.label }}
                  </option>
                </select>
                <div
                  v-if="errors.selectedCertificate"
                  class="text-red-500 text-xs"
                >
                  {{ errors.selectedCertificate }}
                </div>
              </div>
              <div>
                <label for="property-condition" class="text-gray-400">Kondisi Properti</label>
                <select
                  id="property-condition"
                  v-model="propertyCondition"
                  class="border border-gray-400 p-2 rounded-xl w-[492px]"
                >
                  <option disabled value="">Pilih Kondisi Properti</option>
                  <option
                    v-for="condition in propertyConditions"
                    :key="condition.value"
                    :value="condition.value"
                  >
                    {{ condition.label }}
                  </option>
                </select>
                <div
                  v-if="errors.propertyCondition"
                  class="text-red-500 text-xs"
                >
                  {{ errors.propertyCondition }}
                </div>
              </div>
            </div>
  
            <!-- Fasilitas Section -->
            <h1 class="text-[32px] font-bold">Fasilitas</h1>
            <div class="flex">
              <div>
                <label for="rooms" class="text-gray-400">Jumlah Kamar</label>
                <input
                  id="rooms"
                  type="number"
                  placeholder="ex: 5"
                  v-model="numberOfRooms"
                  class="border border-gray-400 p-2 rounded-xl w-[492px]"
                />
                <div v-if="errors.numberOfRooms" class="text-red-500 text-xs">
                  {{ errors.numberOfRooms }}
                </div>
              </div>
              <div>
                <label for="bathrooms" class="">Jumlah Kamar Mandi</label>
                <input
                  id="bathrooms"
                  type="number"
                  placeholder="ex: 4"
                  v-model="numberOfBathrooms"
                  class="border border-gray-400 p-2 rounded-xl w-[492px]"
                />
                <div
                  v-if="errors.numberOfBathrooms"
                  class="text-red-500 text-xs"
                >
                  {{ errors.numberOfBathrooms }}
                </div>
              </div>
            </div>
            <div >
              <p>Fasilitas yang tersedia</p>
              <div class="grid grid-cols-4 gap-1">
                <label v-for="facility in facilities" :key="facility.value" class="text-[18px]">
                  <input
                    type="checkbox"
                    :value="facility.value"
                    v-model="selectedFacilities"
                  />
                  {{ facility.label }}
                </label>
              </div>
            </div>
  
            <button type="submit" class="border-t-neutral-400">
              Estimate
            </button>
          </form>
        </div>
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
            <button class="btn btn-blue bg-[#24A29F] text-white rounded-md p-3">
              Estimate
            </button>
            <button
              class="btn btn-blue text-[#24A29F] border-[#24A29F] border-[2px] rounded-md p-3"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import city_to_district from '../data/city_to_districts'
  import district_lat_long from '../data/district_lat_long'
  
  // Reactive form fields
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
    { label: 'Garasi', value: 'Garasi' },
    { label: 'Kolam Renang', value: 'Kolam Renang' },
    { label: 'Keamanan', value: 'Keamanan' },
    { label: 'Tempat Jemuran', value: 'Tempat Jemuran' },
    { label: 'Carport', value: 'Carport' },
    { label: 'Taman', value: 'Taman' },
    { label: 'Akses Parkir', value: 'Akses Parkir' },
  ])
  
  // Compute districts based on the selected city
  const districts = computed(() => {
    if (!selectedCity.value) return []
    const key = selectedCity.value.toLowerCase()
    return city_to_district[key] || []
  })
  
  // Validator function
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
  
    return Object.keys(errors.value).length === 0
  }
  
  // Form submission handler
  function handleSubmit() {
    if (!validateForm()) {
      console.log('Validation failed:', errors.value)
      return
    }
    console.log('Form data:')
    console.log('Selected City:', selectedCity.value)
    console.log('Selected District:', selectedDistrict.value)
    console.log('Land Area:', landArea.value)
    console.log('Building Area:', buildingArea.value)
    console.log('Number of Floors:', numberOfFloors.value)
    console.log('Electrical Power:', electricalPower.value)
    console.log('Selected Certificate:', selectedCertificate.value)
    console.log('Property Condition:', propertyCondition.value)
    console.log('Number of Rooms:', numberOfRooms.value)
    console.log('Number of Bathrooms:', numberOfBathrooms.value)
    console.log('Selected Facilities:', selectedFacilities.value)
    // Further processing or API calls can be added here.
  }
  </script>
  
  <style scoped>
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  .flex {
    display: flex;
    gap: 1rem;
  }
  div {
    margin-bottom: 1rem;
  }
  .text-red-500 {
    color: #f56565;
  }
  </style>
  