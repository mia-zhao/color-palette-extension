<script setup lang="ts">
const props = defineProps<{
  callBack: (name: string, color: RGB) => void;
}>();

chrome.runtime.onMessage.addListener(listener);

function pickColor() {
  console.log("clicked");
  (async () => {
    const [tab] = await window.chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    const response = await window.chrome.tabs.sendMessage(tab.id || 0, {
      action: "useColorPicker",
    });
    console.log(response);
  })();
}

function listener(
  msg: ColorMsg,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  props.callBack(msg.name, msg.rgb);
  sendResponse({ status: "Ok" });
}
</script>
<template>
  <button type="button" @click="pickColor()">pick a color</button>
</template>

<style scoped>
button {
  background-color: brown;
}
body * {
  cursor: url("../assets/cursor-24.png"), auto;
}
</style>
