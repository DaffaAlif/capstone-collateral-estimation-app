<!-- App.vue -->
<template>
  <div id="app">
    <header>

      <h1>My App</h1>
    </header>
    <main>
      <!-- This is where your routed components appear -->
      <router-view />
    </main>
    <footer>
      <!-- Footer convtent -->
      <p>© 2025 My Company</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
