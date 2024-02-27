<script setup lang="ts">
import ColorPickerButton from "./components/ColorPickerButton.vue";
</script>

<template>
  <div>
    <label>Hex</label>
    <input />
    <label>RGB</label>
    <input />
  </div>
  <ColorPickerButton />
</template>

<style scoped>
input {
  margin-bottom: 6px;
}
</style>
