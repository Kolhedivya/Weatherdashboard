<template>
  <div id="app">
    <h1>🌦 Weather Dashboard</h1>

    <!-- Tabs -->
    <div class="tabs">
      <button
        @click="activeTab = 'weather'"
        :class="{ active: activeTab === 'weather' }"
      >
        Weather
      </button>
      <button
        @click="activeTab = 'favorites'"
        :class="{ active: activeTab === 'favorites' }"
      >
        Favorite Cities
      </button>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <Weather v-if="activeTab === 'weather'" />
      <FavoriteCities v-if="activeTab === 'favorites'" />
    </div>
  </div>

</template>

<script>
import Weather from "./components/Weather.vue";
import FavoriteCities from "./components/favCities.vue";

export default {
  name: "App",
  components: { Weather, FavoriteCities },
  data() {
    return {
      activeTab: "weather",
    };
  },
};

</script>

<style>
#app {
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.tabs {
  margin: 20px 0;
}

.tabs button {
  padding: 10px 20px;
  margin: 0 5px;
  border: none;
  border-radius: 6px;
  background: #ddd;
  cursor: pointer;
  transition: background 0.3s ease;
}

.tabs button.active {
  background: #0077cc;
  color: white;
}

.tabs button:hover {
  background: #bbb;
}

.tab-content {
  margin-top: 20px;
}

</style>