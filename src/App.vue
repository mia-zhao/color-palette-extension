<script setup lang="ts">
import ColorPickerButton from "./components/ColorPickerButton.vue";
import { ref } from "vue";

const selectedName = ref("");
const selectedRGB = ref({ r: 0, g: 0, b: 0 });
const selectedHex = ref("#000000");

function callback(name: string, rgb: RGB) {
  selectedName.value = name;
  selectedRGB.value = rgb;
  selectedHex.value = rgbToHex(rgb);
}

function rgbToHex(rgb: RGB) {
  let r = rgb.r.toString(16);
  let g = rgb.g.toString(16);
  let b = rgb.b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}
</script>

<template>
  <div>
    <ul>
      <li>
        <label id="hex">Hex:</label>
        <input
          readonly
          id="hex-input"
          aria-labelledby="hex"
          v-model="selectedHex"
        />
      </li>
      <li id="rgb-info">
        <label id="rgb">RGB</label>
        <label id="r">r:</label
        ><input number readonly aria-labelledby="r" :value="selectedRGB.r" />
        <label id="g">g:</label
        ><input number readonly aria-labelledby="g" :value="selectedRGB.g" />
        <label id="b">b:</label
        ><input number readonly aria-labelledby="b" :value="selectedRGB.b" />
      </li>
      <li id="tailwind-info">
        <label id="tailwind-color"
          >Mapped
          <a href="https://tailwindcss.com/">Tailwind CSS</a> Color</label
        >
        <label id="tailwind-name">name:</label
        ><input
          readonly
          aria-labelledby="tailwind-color"
          :value="selectedName"
        />
      </li>
    </ul>
  </div>
  <ColorPickerButton :call-back="callback" />
</template>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  & > li {
    margin-bottom: 10px;
  }
}
li > label {
  margin-right: 6px;
}
input {
  border: none;
  background-color: #f2f2f2;
  height: 16px;
  &:hover,
  &:focus {
    border: none;
    outline: none;
  }
}
#hex-input {
  width: 100px;
}
#rgb {
  display: block;
}
#tailwind-color {
  display: block;
}
#rgb-info > input {
  width: 30px;
  margin-right: 4px;
}
#tailwind-info > input {
  width: 100px;
}
a {
  text-decoration: none;
  color: #7f7f7f;
  border-bottom: 1px dashed;
}
</style>
