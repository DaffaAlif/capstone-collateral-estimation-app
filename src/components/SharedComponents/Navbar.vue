<template>
    <div>
        <header :class="headerClass">
            <div class="xl:mr-12">
                <router-link to="/dashboard" :class="['header-logo']">
                    <img src="../../assets/logo.png" alt="logo" width="40" height="20" class="w-24 h-12" />
                </router-link>
            </div>

            <div class="flex items-center justify-end pr-2 lg:pr-0 w-full">

                <nav id="navbarCollapse" :class="[
                    'navbar absolute right-0 z-30 w-screen lg:w-[250px] rounded bg-white  lg:py-0 duration-300 lg:visible lg:static lg:border-none lg:!bg-transparent px-8 lg:px-6  lg:p-0 lg:opacity-100',
                    navbarOpen ? 'visibility top-full opacity-100' : 'invisible top-[120%] opacity-0'
                ]">
                    <ul class="block lg:flex lg:space-x-12 py-5">
                        <li v-for="(menuItem, index) in menuData" :key="index" class="group relative">
                            <router-link v-if="menuItem.path" :to="menuItem.path" :class="[
                                'flex text-lg font-medium lg:mr-0 lg:inline-flex lg:px-0 py-1',
                                currentPath === menuItem.path ? 'text-teal-500 border-b border-teal-500' : 'text-dark hover:text-black'
                            ]">
                                {{ menuItem.title }}
                            </router-link>
                            
                            <div v-else>
                                <p @click="handleSubmenu(index)"
                                    class="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:text-black text-black lg:mr-0 lg:inline-flex lg:px-0 lg:py-6">
                                    {{ menuItem.title }}
                                    <span class="pl-3">
                                        <svg width="25" height="24" viewBox="0 0 25 24">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                                fill="currentColor" />
                                        </svg>
                                    </span>
                                </p>
                                <div :class="[
                                    'submenu relative left-0 top-full rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full',
                                    openIndex === index ? 'block' : 'hidden'
                                ]">
                                    <router-link v-for="(submenuItem, sIndex) in menuItem.submenu" :key="sIndex"
                                        :to="submenuItem.path"
                                        class="block rounded py-2.5 text-sm text-dark hover:text-black lg:px-3">
                                        {{ submenuItem.title }}
                                    </router-link>
                                </div>
                            </div>

                        </li>
                        <li  class="group relative block lg:hidden">
                            <button @click="handleOpen" 
                            class="block flex text-lg font-medium lg:mr-0 lg:inline-flex lg:px-0 py-1 lg:hidden">
                            Sign Out
                            </button>
                        </li>

                    </ul>
                </nav>
                <div class="my-3 ml-6 w-[1px] h-7 bg-black"></div>
                <button @click="toggleNavbar" class="lg:hidden p-2 text-dark">
                   <Bars3Icon class="h-7 font-light" />
                </button>
                <div class="mx-0 lg:mx-4">
                    <button @click="handleOpen" 
                    class="hidden py-3 text-base font-medium text-dark hover:opacity-70 lg:block">
                        <ArrowRightEndOnRectangleIcon class="h-7 font-light" />
                    </button>
                </div>
                
            
            </div>
        </header>
    </div>
</template>
  
<script setup>
import { ArrowRightEndOnRectangleIcon } from "@heroicons/vue/24/outline";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import store from "../../store";
import router from "../../router";
import { Bars3Icon } from "@heroicons/vue/24/solid";

const handleLogOut = async () => {
    console.log('logout');
    await store.dispatch('logout');
    router.push({ name: 'Login' });
};

const props = defineProps({
    sticky: {
        type: Boolean,
        default: false,
    },
    handleOpen: Function,
});

const navbarOpen = ref(false);
const openIndex = ref(null);
const menuData = ref([
    { path: "/dashboard", title: "Home" },
    { path: "/estimate", title: "Form" },
    { path: "/faq", title: "FAQ" },
]);

const route = useRoute();
const currentPath = computed(() => route.path);

const headerClass = computed(() => [
    "header",
    "flex",
    "w-full",
    "items-center",
    "col-12",
    "shadow-lg",
    "py-2",
    "lg:py-0",
    "px-6",
    "lg:px-44",
    props.sticky
        ? " fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
        : " fixed z-[9999] bg-white !bg-opacity-90 shadow-sticky backdrop-blur-sm transition",
]);

function handleSubmenu(index) {
    openIndex.value = openIndex.value === index ? null : index;
}

function toggleNavbar() {
    navbarOpen.value = !navbarOpen.value;
}
</script>
  
<style scoped>
/* Your scoped SCSS goes here */
</style>
