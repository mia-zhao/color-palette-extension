<script setup lang="ts">
import { getClosestColor } from "../scripts/colors";

const props = defineProps<{
  callBack: (name: string, color: RGB) => void;
}>();

function pickColor() {
  if (window.EyeDropper) {
    const eyeDropper = new window.EyeDropper();
    (async () => {
      const res = await eyeDropper.open();
      if (res != undefined) {
        const color = parseRGBHex(res.sRGBHex);
        if (color != undefined) {
          props.callBack(color.name, color.rgb);
        }
      }
    })();
  }
}

function parseRGBHex(value: string): Color | undefined {
  const regex = /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/;
  const match = value.match(regex);
  if (match) {
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    const color = getClosestColor({ r, g, b });
    return { name: color, rgb: { r, g, b } };
  }
}
</script>
<template>
  <button type="button" @click="pickColor()">pick a color</button>
</template>

<style scoped>
button {
  background-color: brown;
  border-radius: 8px;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
</style>
