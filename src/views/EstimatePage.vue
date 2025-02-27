<template>
    <div class="px-4 md:px-8 lg:px-43 py-10">
        <form @submit.prevent="handleSubmit">
            <h1 v-if="!edition" class="text-3xl md:text-4xl lg:text-5xl font-semibold text-teal-500 ">
                Estimasi Properti
            </h1>
            <h1 v-if="edition" class="text-3xl md:text-4xl lg:text-5xl font-semibold text-teal-500 ">
                {{ estimationName.name }} - Edit
            </h1>
            <div class="h-1 w-full bg-teal-500 my-4"></div>

            <div class="flex flex-col md:flex-row gap-6">
                <!-- Left Column: Form Fields -->
                <div class="w-full md:w-2/3">
                    <!-- Lokasi Section -->
                    <h1 class="text-2xl font-medium">Lokasi</h1>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div class="field">
                            <label for="city-select" class="text-gray-400">Kota</label>
                            <select id="city-select" v-model="form.city"
                                class="border border-gray-400 p-2 rounded-xl w-full">
                                <option disabled value="">Pilih Kota</option>
                                <option v-for="city in cities" :key="city" :value="city">
                                    {{ capitalizeSentence(city) }}
                                </option>
                            </select>
                            <div v-if="errors.city" class="text-red-500 text-xs">{{ errors.city }}</div>
                        </div>
                        <div class="field">
                            <label for="district-select" class="text-gray-400">Distrik</label>
                            <select id="district-select" v-model="form.district"
                                class="border border-gray-400 p-2 rounded-xl w-full">
                                <option disabled value="">Pilih Distrik</option>
                                <option v-for="district in districts" :key="district" :value="district">
                                    {{ capitalizeSentence(district) }}
                                </option>
                            </select>
                            <div v-if="errors.district" class="text-red-500 text-xs">{{ errors.district }}</div>
                        </div>
                    </div>

                    <!-- Detail Properti Section -->
                    <h1 class="text-2xl font-medium mt-6">Detail Properti</h1>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div class="field">
                            <label for="land-area" class="text-gray-400">Luas Tanah (m2)</label>
                            <input id="land-area" type="number" placeholder="e.g: 150" v-model.number="form.landArea"
                                class="border border-gray-400 p-2 rounded-xl w-full" />
                            <div v-if="errors.landArea" class="text-red-500 text-xs">{{ errors.landArea }}</div>
                        </div>
                        <div class="field">
                            <label for="building-area" class="text-gray-400">Luas Bangunan (m2)</label>
                            <input id="building-area" type="number" placeholder="e.g: 110" v-model.number="form.buildingArea"
                                class="border border-gray-400 p-2 rounded-xl w-full" />
                            <div v-if="errors.buildingArea" class="text-red-500 text-xs">{{ errors.buildingArea }}</div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div class="field">
                            <label for="floors" class="text-gray-400">Jumlah Lantai</label>
                            <input id="floors" type="number" placeholder="e.g: 2" v-model.number="form.floors"
                                class="border border-gray-400 p-2 rounded-xl w-full" />
                            <div v-if="errors.floors" class="text-red-500 text-xs">{{ errors.floors }}</div>
                        </div>
                        <div class="field">
                            <label for="electrical-power" class="text-gray-400">Kekuatan Listrik (watt)</label>
                            <input id="electrical-power" type="number" placeholder="e.g: 1800"
                                v-model.number="form.electricalPower"
                                class="border border-gray-400 p-2 rounded-xl w-full" />
                            <div v-if="errors.electricalPower" class="text-red-500 text-xs">{{ errors.electricalPower }}
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div class="field">
                            <label for="certificate-select" class="text-gray-400">Sertifikat</label>
                            <select id="certificate-select" v-model="form.certificate"
                                class="border border-gray-400 p-2 rounded-xl w-full">
                                <option disabled value="">Pilih Jenis Sertifikat</option>
                                <option v-for="certificate in certificates" :key="certificate.value"
                                    :value="certificate.value">
                                    {{ certificate.label }}
                                </option>
                            </select>
                            <div v-if="errors.certificate" class="text-red-500 text-xs">{{ errors.certificate }}</div>
                        </div>
                        <div class="field">
                            <label for="property-condition" class="text-gray-400">Kondisi Properti</label>
                            <select id="property-condition" v-model="form.propertyCondition"
                                class="border border-gray-400 p-2 rounded-xl w-full">
                                <option disabled value="">Pilih Kondisi Properti</option>
                                <option v-for="condition in propertyConditions" :key="condition.value"
                                    :value="condition.value">
                                    {{ condition.label }}
                                </option>
                            </select>
                            <div v-if="errors.propertyCondition" class="text-red-500 text-xs">{{ errors.propertyCondition }}
                            </div>
                        </div>
                    </div>

                    <!-- Fasilitas Section -->
                    <h1 class="text-2xl font-medium mt-6">Fasilitas</h1>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div class="field">
                            <label for="rooms" class="text-gray-400">Jumlah Kamar</label>
                            <input id="rooms" type="number" placeholder="e.g: 5" v-model.number="form.numberOfRooms"
                                class="border border-gray-400 p-2 rounded-xl w-full" />
                            <div v-if="errors.numberOfRooms" class="text-red-500 text-xs">{{ errors.numberOfRooms }}</div>
                        </div>
                        <div class="field">
                            <label for="bathrooms" class="text-gray-400">Jumlah Kamar Mandi</label>
                            <input id="bathrooms" type="number" placeholder="e.g: 4" v-model.number="form.numberOfBathrooms"
                                class="border border-gray-400 p-2 rounded-xl w-full" />
                            <div v-if="errors.numberOfBathrooms" class="text-red-500 text-xs">{{ errors.numberOfBathrooms }}
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div class="field">
                            <label for="garages" class="text-gray-400">Kapasitas Garasi</label>
                            <input id="garages" type="number" placeholder="e.g: 2" v-model.number="form.numberOfGarages"
                                class="border border-gray-400 p-2 rounded-xl w-full" />
                            <div v-if="errors.numberOfGarages" class="text-red-500 text-xs">{{ errors.numberOfGarages }}
                            </div>
                        </div>
                        <div class="field">
                            <label for="carports" class="text-gray-400">Kapasitas Carport</label>
                            <input id="carports" type="number" placeholder="e.g: 1" v-model.number="form.numberOfCarports"
                                class="border border-gray-400 p-2 rounded-xl w-full" />
                            <div v-if="errors.numberOfCarports" class="text-red-500 text-xs">{{ errors.numberOfCarports }}
                            </div>
                        </div>
                    </div>
                    <div class="mt-4 w-2/3">
                        <p class="text-gray-400">Fasilitas yang tersedia</p>
                        <div class="grid grid-cols-2 sm:grid-cols-3 mt-2">
                            <label v-for="facility in facilities" :key="facility.value" class="text-[18px] flex items-center">
                                <input type="checkbox" :value="facility.value" v-model="form.selectedFacilities"
                                    class="mr-2" />
                                {{ facility.label }}
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Estimation Card -->
                <div class="w-full md:w-1/3">
                    <div class="bg-[#F3F3F3] px-4 py-6 rounded-md shadow-md">
                        <h1 class="text-xl text-center font-medium">Estimasi Harga</h1>
                        <div class="bg-white rounded-md mt-3 p-2 min-h-[96px] shadow">
                            <h1 class="text-center font-bold text-3xl text-[#24A29F] mt-4">
                                {{ priceEstimate ? formatRupiah(priceEstimate) : '' }}
                            </h1>
                            <div class="flex items-center justify-center mt-2">
                                <p v-if="priceEstimate" class="text-center text-[16px]">
                                    Estimation Error <span class="text-red-500">19%</span>
                                </p>
                                <div v-if="priceEstimate" class="relative group ml-2 mt-[2px]">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="w-5 h-5 text-gray-500 cursor-pointer group-hover:text-gray-700 transition"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" />
                                    </svg>
                                    <div
                                    class="absolute left-1/2 transform -translate-x-1/2 top-8 w-56  shadow-2xl bg-white border text-sm p-2 rounded-md  opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <p class="font-medium">Estimation Error</p>
                                        Rata-rata persentase kesalahan prediksi dibanding dengan nilai sebenarnya.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p class="text-center font-medium mt-4">Range Estimasi</p>
                        <div class="bg-[#FFFFFF] rounded-md p-2 mt-2 min-h-[40px] shadow">
                            <p class="text-center font-bold text-[#24A29F] text-[18px]">
                                {{ priceEstimate ? formatRupiah(priceEstimate - priceEstimate * 0.19) : '' }}
                                <span class="text-black">{{ priceEstimate ? 's/d' : '' }}</span>
                                {{ priceEstimate ? formatRupiah(priceEstimate + priceEstimate * 0.19) : '' }}
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-col mt-6">
                        <button type="submit"
                            class="bg-[#24A29F] text-white rounded-md  hover:bg-teal-600 transition"
                            :disabled="isLoading">
                            <div class="flex items-center justify-center gap-4 mt-4">

                                <p>Estimasi</p>
                                <svg width="15" height="14" viewBox="0 0 15 14" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" :class="isLoading ? 'hidden' : 'block'">
                                    <path d="M1.5 7H14M14 7L8 1M14 7L8 13" stroke="white" stroke-width="1.8"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <ArrowPathIcon class="w-6 h-6 animate-spin" v-if="isLoading" />
                            </div>
                        </button>
                        <button type="button" @click="handleOpen"
                            class="text-[#24A29F] border border-[#24A29F] rounded-md p-3 mt-4 hover:bg-[#24A29F] hover:text-white transition">
                            Simpan
                        </button>
                    </div>

                </div>
            </div>
        </form>
        <!-- Modal Component -->
        <SaveModal :isOpen="isOpen" :handleOpen="handleOpen" :is_completed="is_completed"
            :handleSubmitHistory="handleSubmitHistory" @estimationName="updateEstimationName" />
    </div>
    <AlertPopup :show="isPopupVisible" message="Hasil estimasi berhasil tersimpan" :autoHide="true" :duration="4000" />
</template>


  
<script setup>
import { reactive, ref, computed, onBeforeUnmount, onMounted, watchEffect } from 'vue';
import city_to_district from '../data/city_to_districts';
import district_lat_long from '../data/district_lat_long';
import SaveModal from '../components/SaveModal.vue';
import { estimate } from '../api/api'
import { updateHistory } from '../api/api';
import { postHistory } from '../api/api';
import formatRupiah from '../script/formatrupiah';
import capitalizeSentence from '../script/formatCapitalizeEachLetter';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import AlertPopup from '../components/SharedComponents/AlertPopup.vue';

import {ArrowPathIcon} from '@heroicons/vue/24/outline'


const router = useRouter();
const route = useRoute();

const edition = ref(false);
// Access Vuex store
const store = useStore();

// Check if `history` exists in the store
const history = computed(() => store.state.history || {});

// Define form with default values
const form = reactive({
    city: '',
    district: '',
    landArea: null,
    buildingArea: null,
    floors: null,
    electricalPower: null,
    certificate: '',
    propertyCondition: '',
    numberOfRooms: null,
    numberOfBathrooms: null,
    numberOfGarages: null,
    numberOfCarports: null,
    selectedFacilities: []
});

const defaultForm = reactive({ ...form });

function clearForm() {
    // Copies all defaultForm fields back into form
    Object.assign(form, defaultForm);
}


const cities = Object.keys(city_to_district).map(
    (city) => city.charAt(0).toUpperCase() + city.slice(1)
);

const districts = computed(() => {
    if (!form.city) return [];
    const key = form.city.toLowerCase().trim();
    return city_to_district[key] || [];
});

// Modal state
const isOpen = ref(false);
const is_completed = ref(false);
const handleOpen = () => {
    isOpen.value = !isOpen.value;
};
const estimationName = reactive({ id: "", name: "" })

const updateEstimationName = (value) => {
    estimationName.name = value;
};


watchEffect(() => {
    if (history.value && Object.keys(history.value).length > 0) {

        edition.value = route.query.edit || null;

        form.city = cities.find(city => city.toLowerCase() === history.value.city.toLowerCase()) || '';
        form.district = history.value.district || '';
        form.landArea = history.value.land_size ?? form.landArea;
        form.buildingArea = history.value.building_size ?? form.buildingArea;
        form.floors = history.value.floors ?? form.floors;
        form.electricalPower = history.value.electricity ?? form.electricalPower;
        form.certificate = history.value.certificate || form.certificate;
        form.propertyCondition = history.value.property_condition ?? form.propertyCondition;
        form.numberOfRooms = history.value.bedrooms ?? form.numberOfRooms;
        form.numberOfBathrooms = history.value.bathrooms ?? form.numberOfBathrooms;
        form.numberOfGarages = history.value.garage ?? form.numberOfGarages;
        form.numberOfCarports = history.value.carport ?? form.numberOfCarports;

        estimationName.name = history.value.name || "";
        estimationName.id = history.value.id || "";


        form.selectedFacilities = [];
        if (history.value.swimming_pool) form.selectedFacilities.push("Kolam Renang");
        if (history.value.security) form.selectedFacilities.push("Keamanan");
        if (history.value.drying_area) form.selectedFacilities.push("Tempat Jemuran");
        if (history.value.garden) form.selectedFacilities.push("Taman");
        if (history.value.parking_access) form.selectedFacilities.push("Akses Parkir");
    }
});

const isPopupVisible = ref(false);

function showSuccessPopup() {
    isPopupVisible.value = true;
}

const errors = reactive({});

const certificates = [
    { label: 'SHM', value: 'SHM' },
    { label: 'SHGB', value: 'SHGB' },
    { label: 'SHP', value: 'SHP' },
    { label: 'Lainnya', value: 'Lainnya' }
];
const propertyConditions = [
    { label: 'Butuh Renovasi', value: 1 },
    { label: 'Sudah Renovasi', value: 2 },
    { label: 'Baru', value: 3 },
    { label: 'Bagus', value: 4 },
    { label: 'Bagus Sekali', value: 5 }
];
const facilities = [
    { label: 'Kolam Renang', value: 'Kolam Renang' },
    { label: 'Keamanan', value: 'Keamanan' },
    { label: 'Tempat Jemuran', value: 'Tempat Jemuran' },
    { label: 'Taman', value: 'Taman' },
    { label: 'Akses Parkir', value: 'Akses Parkir' }
];


const isLoading = ref(false);
const priceEstimate = ref(0);

const isFormHalfFilled = computed(() => {
    return Object.values(form).some(value => {
        if (Array.isArray(value)) return value.length > 0;
        return value !== null && value !== '';
    });
});

const handleBeforeUnload = (event) => {
    if (isFormHalfFilled.value) {
        event.preventDefault();
        event.returnValue = '';
    }
};

onMounted(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
});

onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
});



function validateForm() {
    Object.keys(errors).forEach(key => delete errors[key]);

    if (!form.city) errors.city = 'Kota harus dipilih.';
    if (!form.district) errors.district = 'Distrik harus dipilih.';
    if (!form.landArea || form.landArea <= 0) errors.landArea = 'Luas tanah harus lebih dari 0.';
    if (!form.buildingArea || form.buildingArea <= 0) errors.buildingArea = 'Luas bangunan harus lebih dari 0.';
    if (!form.floors || form.floors <= 0) errors.floors = 'Jumlah lantai harus lebih dari 0.';
    if (!form.electricalPower || form.electricalPower <= 0) errors.electricalPower = 'Kekuatan listrik harus lebih dari 0.';
    if (!form.certificate) errors.certificate = 'Jenis sertifikat harus dipilih.';
    if (!form.propertyCondition) errors.propertyCondition = 'Kondisi properti harus dipilih.';
    if (form.numberOfRooms < -1) errors.numberOfRooms = 'Jumlah kamar harus lebih dari atau sama dengan 0.';
    if (form.numberOfBathrooms < -1) errors.numberOfBathrooms = 'Jumlah kamar mandi harus lebih dari atau sama dengan 0.';
    if (form.numberOfGarages < -1) errors.numberOfGarages = 'Jumlah garasi harus lebih dari atau sama dengan 0.';
    if (form.numberOfCarports < -1) errors.numberOfCarports = 'Jumlah carport harus lebih dari atau sama dengan 0.';
    return Object.keys(errors).length === 0;
}



async function handleSubmit() {
    if (!validateForm()) {
        console.log('Validation failed:', errors);
        return;
    }

    const data = {
        city: form.city.toLowerCase(),
        latitude: district_lat_long[form.district]?.lat || 0,
        longitude: district_lat_long[form.district]?.long || 0,
        land_size: Number(form.landArea),
        building_size: Number(form.buildingArea),
        floors: Number(form.floors),
        electricity: Number(form.electricalPower),
        certificate: form.certificate,
        property_condition: Number(form.propertyCondition),
        bedrooms: Number(form.numberOfRooms),
        bathrooms: Number(form.numberOfBathrooms),
        swimming_pool: form.selectedFacilities.includes("Kolam Renang") ? true : false,
        garage: Number(form.numberOfGarages),
        carport: Number(form.numberOfCarports),
        garden: form.selectedFacilities.includes("Taman") ? true : false,
        drying_area: form.selectedFacilities.includes("Tempat Jemuran") ? true : false,
        security: form.selectedFacilities.includes("Keamanan") ? true : false,
        parking_access: form.selectedFacilities.includes("Akses Parkir") ? true : false
    };

    try {
        isLoading.value = true;
        const response = await estimate(
            data
        )

        console.log(response.data.data)
        priceEstimate.value = response.data.data;
        is_completed.value = true;
    } catch (error) {
        console.error("API call failed:", error);
    } finally {
        isLoading.value = false;
    }
}

function handleSubmitHistory() {

    const data = {
        name: estimationName.name,
        city: form.city.toLowerCase(),
        latitude: district_lat_long[form.district]?.lat || 0,
        longitude: district_lat_long[form.district]?.long || 0,
        land_size: Number(form.landArea),
        building_size: Number(form.buildingArea),
        floors: Number(form.floors),
        electricity: Number(form.electricalPower),
        certificate: form.certificate,
        property_condition: Number(form.propertyCondition),
        bedrooms: Number(form.numberOfRooms),
        bathrooms: Number(form.numberOfBathrooms),
        swimming_pool: form.selectedFacilities.includes("Kolam Renang") ? true : false,
        garage: Number(form.numberOfGarages),
        carport: Number(form.numberOfCarports),
        garden: form.selectedFacilities.includes("Taman") ? true : false,
        drying_area: form.selectedFacilities.includes("Tempat Jemuran") ? true : false,
        security: form.selectedFacilities.includes("Keamanan") ? true : false,
        parking_access: form.selectedFacilities.includes("Akses Parkir") ? true : false,
        price_in_rp: parseInt(priceEstimate.value),
        is_completed: priceEstimate.value ? true : false
    };

    if (!edition.value) {
        try {
            isLoading.value = true;
            postHistory(data)
                .then(response => {
                    priceEstimate.value = response.data.data;
                    is_completed.value = true;
                    isOpen.value = false;
                    priceEstimate.value = '';
                    clearForm();
                    setTimeout(() => {
                        showSuccessPopup()

                    }, 1000);
                })
                .catch(error => {
                    console.error("API call failed:", error);
                })
                .finally(() => {
                    isLoading.value = false;
                });
        } catch (error) {
            console.error("API call failed:", error);
        }
    } else {
        try {
            isLoading.value = true;
            updateHistory(estimationName.id, data)
                .then(response => {
                    priceEstimate.value = response.data.data;
                    is_completed.value = true;
                    isOpen.value = false;
                    priceEstimate.value = '';
                    clearForm();
                    store.dispatch('clearHistory');
                    showSuccessPopup()
                    setTimeout(() => {

                        router.push('/dashboard');
                    }, 2000);


                })
                .catch(error => {
                    console.error("API call failed:", error);
                })
                .finally(() => {
                    isLoading.value = false;
                });
        } catch (error) {
            console.error("API call failed:", error);
        }
    }



}
</script>
  
<style scoped>
label {
    margin-bottom: 0.3rem;
}

h1 {
    margin-bottom: 0.5rem;
}

.flex {
    display: flex;
    margin-bottom: 20px;
}

.text-red-500 {
    color: #f56565;
}

.field {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}
</style>
  