<script setup lang="ts">
function pickColor() {
  console.log("clicked");
  (async () => {
    const [tab] = await window.chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    const response = await window.chrome.tabs.sendMessage(tab.id || 0, {
      action: "useColorPickerCursor",
    });
    console.log(response);
  })();
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
