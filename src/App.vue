<script setup lang="ts">
import ColorPickerButton from "./components/ColorPickerButton.vue";
import { ref } from "vue";

const selectedName = ref("");
const selectedRGB = ref({ r: 0, g: 0, b: 0 });

function callback(name: string, rgb: RGB) {
  selectedName.value = name;
  selectedRGB.value = rgb;
}
</script>

<template>
  <div>
    <label>Hex</label>
    <input />
    <label>RGB</label>
    <input :value="selectedRGB.r" />
    <input :value="selectedRGB.g" />
    <input :value="selectedRGB.b" />
    <label>Mapped Tailwind CSS Color</label>
    <input :value="selectedName" />
  </div>
  <ColorPickerButton :call-back="callback" />
</template>

<style scoped>
input {
  margin-bottom: 6px;
}
</style>
