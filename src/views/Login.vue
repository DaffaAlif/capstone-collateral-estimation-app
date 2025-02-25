<script setup>
    import LoginForm from '../components/LoginForm.vue';

    
</script>
<template>
    <div class="flex w-full h-screen">
        <div class="md:w-5/12 flex relative">
                <img src="../assets/bg-login.png" class="h-full w-full absolute object-cover">

            </div>

        <div class="flex align-middle justify-center flex-1">

            <div class="mx-auto my-auto">
                <LoginForm />
            </div>
        </div>
        
    </div>
</template>



<style scoped>

</style>