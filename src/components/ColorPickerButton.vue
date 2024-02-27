<script setup lang="ts">
function pickColor() {
  console.log("clicked");
}
</script>
<template>
  <button type="button" @click="pickColor()">pick a color</button>
</template>

<style scoped>
button {
  background-color: brown;
}
</style>
