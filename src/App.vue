<template>
  <div id="app">
    <h1>🌦 Weather Dashboard</h1>
    <Weather />
  </div>
</template>

<script>
import Weather from "./components/Weather.vue";

export default {
  name: "App",
  components: { Weather },
};
</script>

<style>
#app {
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}
</style>