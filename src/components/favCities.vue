<template>
  <div class="favorites-container">
    <h2>⭐ Favorite Cities</h2>

    <!-- Input -->
    <div class="input-row">
      <input
        v-model="newCity"
        type="text"
        placeholder="Enter city name"
      />
      <button @click="addCity">Add</button>
    </div>

    <!-- List -->
    <ul class="city-list">
      <li v-for="(city, index) in cities" :key="index" class="city-item">
        <span>{{ city }}</span>
        <button @click="removeCity(index)" class="remove-btn">✕</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const newCity = ref("");
const cities = ref([]);

// Load saved cities from localStorage
onMounted(() => {
  const saved = localStorage.getItem("favoriteCities");
  if (saved) {
    cities.value = JSON.parse(saved);
  }
});

// Add city
const addCity = () => {
  if (newCity.value.trim()) {
    cities.value.push(newCity.value.trim());
    localStorage.setItem("favoriteCities", JSON.stringify(cities.value));
    newCity.value = "";
  }
};

// Remove city
const removeCity = (index) => {
  cities.value.splice(index, 1);
  localStorage.setItem("favoriteCities", JSON.stringify(cities.value));
};
</script>

<style scoped>
.favorites-container {
  max-width: 500px;
  margin: 20px auto;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

h2 {
  margin-bottom: 12px;
  text-align: center;
  color: #333;
}

.input-row {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

input {
  flex: 1;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #100f0f;
}

button {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  background: #0077cc;
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: #005fa3;
}

.city-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.city-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0c0c0c;
  padding: 8px 12px;
  border-radius: 6px;
  margin-bottom: 8px;
}

.remove-btn {
  background: transparent;
  color: #cc0000;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border: none;
}
.remove-btn:hover {
  color: #990000;
}
</style>