export function getClosestColor(rgb: RGB): string | undefined {
  let minDelta = Infinity;
  let closestColor: Color | null = null;
  for (const color of colors) {
    const delta = deltaColor(rgb, color.rgb);
    if (delta < minDelta) {
      minDelta = delta;
      closestColor = color;
    }
  }
  return closestColor?.name;
}

function deltaColor(rgb1: RGB, rgb2: RGB): number {
  const lab1 = rgbToLab(rgb1);
  const lab2 = rgbToLab(rgb2);

  const deltaL = lab1[0] - lab2[0];
  const deltaA = lab1[1] - lab2[1];
  const deltaB = lab1[2] - lab2[2];

  return Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB);
}

function rgbToLab(rgb: RGB): number[] {
  let r = rgb.r / 255;
  let g = rgb.g / 255;
  let b = rgb.b / 255;

  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  r *= 100;
  g *= 100;
  b *= 100;

  const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
  const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const z = r * 0.0193 + g * 0.1192 + b * 0.9505;

  let xR = x / 95.047;
  let yR = y / 100.0;
  let zR = z / 108.883;

  xR = xR > 0.008856 ? Math.pow(xR, 1 / 3) : 7.787 * xR + 16 / 116;
  yR = yR > 0.008856 ? Math.pow(yR, 1 / 3) : 7.787 * yR + 16 / 116;
  zR = zR > 0.008856 ? Math.pow(zR, 1 / 3) : 7.787 * zR + 16 / 116;

  const l = 116 * yR - 16;
  const a = 500 * (xR - yR);
  const bVal = 200 * (yR - zR);

  return [l, a, bVal];
}

type RGB = {
  r: number;
  g: number;
  b: number;
};

type Color = {
  name: string;
  rgb: RGB;
};

const colors: Color[] = [
  { name: "black", rgb: { r: 0, g: 0, b: 0 } },
  { name: "white", rgb: { r: 255, g: 255, b: 255 } },
  { name: "slate-50", rgb: { r: 248, g: 250, b: 252 } },
  { name: "slate-100", rgb: { r: 241, g: 245, b: 249 } },
  { name: "slate-200", rgb: { r: 226, g: 232, b: 240 } },
  { name: "slate-300", rgb: { r: 203, g: 213, b: 225 } },
  { name: "slate-400", rgb: { r: 148, g: 163, b: 184 } },
  { name: "slate-500", rgb: { r: 100, g: 116, b: 139 } },
  { name: "slate-600", rgb: { r: 71, g: 85, b: 105 } },
  { name: "slate-700", rgb: { r: 51, g: 65, b: 85 } },
  { name: "slate-800", rgb: { r: 30, g: 41, b: 59 } },
  { name: "slate-900", rgb: { r: 15, g: 23, b: 42 } },
  { name: "slate-950", rgb: { r: 2, g: 6, b: 23 } },
  { name: "gray-50", rgb: { r: 249, g: 250, b: 251 } },
  { name: "gray-100", rgb: { r: 243, g: 244, b: 246 } },
  { name: "gray-200", rgb: { r: 229, g: 231, b: 235 } },
  { name: "gray-300", rgb: { r: 209, g: 213, b: 219 } },
  { name: "gray-400", rgb: { r: 156, g: 163, b: 175 } },
  { name: "gray-500", rgb: { r: 107, g: 114, b: 128 } },
  { name: "gray-600", rgb: { r: 75, g: 85, b: 99 } },
  { name: "gray-700", rgb: { r: 55, g: 65, b: 81 } },
  { name: "gray-800", rgb: { r: 31, g: 41, b: 55 } },
  { name: "gray-900", rgb: { r: 17, g: 24, b: 39 } },
  { name: "gray-950", rgb: { r: 3, g: 7, b: 18 } },
  { name: "zinc-50", rgb: { r: 250, g: 250, b: 250 } },
  { name: "zinc-100", rgb: { r: 244, g: 244, b: 245 } },
  { name: "zinc-200", rgb: { r: 228, g: 228, b: 231 } },
  { name: "zinc-300", rgb: { r: 212, g: 212, b: 216 } },
  { name: "zinc-400", rgb: { r: 161, g: 161, b: 170 } },
  { name: "zinc-500", rgb: { r: 113, g: 113, b: 122 } },
  { name: "zinc-600", rgb: { r: 82, g: 82, b: 91 } },
  { name: "zinc-700", rgb: { r: 63, g: 63, b: 70 } },
  { name: "zinc-800", rgb: { r: 39, g: 39, b: 42 } },
  { name: "zinc-900", rgb: { r: 24, g: 24, b: 27 } },
  { name: "zinc-950", rgb: { r: 9, g: 9, b: 11 } },
  { name: "neutral-50", rgb: { r: 250, g: 250, b: 250 } },
  { name: "neutral-100", rgb: { r: 245, g: 245, b: 245 } },
  { name: "neutral-200", rgb: { r: 229, g: 229, b: 229 } },
  { name: "neutral-300", rgb: { r: 212, g: 212, b: 212 } },
  { name: "neutral-400", rgb: { r: 163, g: 163, b: 163 } },
  { name: "neutral-500", rgb: { r: 115, g: 115, b: 115 } },
  { name: "neutral-600", rgb: { r: 82, g: 82, b: 82 } },
  { name: "neutral-700", rgb: { r: 64, g: 64, b: 64 } },
  { name: "neutral-800", rgb: { r: 38, g: 38, b: 38 } },
  { name: "neutral-900", rgb: { r: 23, g: 23, b: 23 } },
  { name: "neutral-950", rgb: { r: 10, g: 10, b: 10 } },
  { name: "stone-50", rgb: { r: 250, g: 250, b: 249 } },
  { name: "stone-100", rgb: { r: 245, g: 245, b: 244 } },
  { name: "stone-200", rgb: { r: 231, g: 229, b: 228 } },
  { name: "stone-300", rgb: { r: 214, g: 211, b: 209 } },
  { name: "stone-400", rgb: { r: 168, g: 162, b: 158 } },
  { name: "stone-500", rgb: { r: 120, g: 113, b: 108 } },
  { name: "stone-600", rgb: { r: 87, g: 83, b: 78 } },
  { name: "stone-700", rgb: { r: 68, g: 64, b: 60 } },
  { name: "stone-800", rgb: { r: 41, g: 37, b: 36 } },
  { name: "stone-900", rgb: { r: 28, g: 25, b: 23 } },
  { name: "stone-950", rgb: { r: 12, g: 10, b: 9 } },
  { name: "red-50", rgb: { r: 254, g: 242, b: 242 } },
  { name: "red-100", rgb: { r: 254, g: 226, b: 226 } },
  { name: "red-200", rgb: { r: 254, g: 202, b: 202 } },
  { name: "red-300", rgb: { r: 252, g: 165, b: 165 } },
  { name: "red-400", rgb: { r: 248, g: 113, b: 113 } },
  { name: "red-500", rgb: { r: 239, g: 68, b: 68 } },
  { name: "red-600", rgb: { r: 220, g: 38, b: 38 } },
  { name: "red-700", rgb: { r: 185, g: 28, b: 28 } },
  { name: "red-800", rgb: { r: 153, g: 27, b: 27 } },
  { name: "red-900", rgb: { r: 127, g: 29, b: 29 } },
  { name: "red-950", rgb: { r: 69, g: 10, b: 10 } },
  { name: "orange-50", rgb: { r: 255, g: 247, b: 237 } },
  { name: "orange-100", rgb: { r: 255, g: 237, b: 213 } },
  { name: "orange-200", rgb: { r: 254, g: 215, b: 170 } },
  { name: "orange-300", rgb: { r: 253, g: 186, b: 116 } },
  { name: "orange-400", rgb: { r: 251, g: 146, b: 60 } },
  { name: "orange-500", rgb: { r: 249, g: 115, b: 22 } },
  { name: "orange-600", rgb: { r: 234, g: 88, b: 12 } },
  { name: "orange-700", rgb: { r: 194, g: 65, b: 12 } },
  { name: "orange-800", rgb: { r: 154, g: 52, b: 18 } },
  { name: "orange-900", rgb: { r: 124, g: 45, b: 18 } },
  { name: "orange-950", rgb: { r: 67, g: 20, b: 7 } },
  { name: "amber-50", rgb: { r: 255, g: 251, b: 235 } },
  { name: "amber-100", rgb: { r: 254, g: 243, b: 199 } },
  { name: "amber-200", rgb: { r: 253, g: 230, b: 138 } },
  { name: "amber-300", rgb: { r: 252, g: 211, b: 77 } },
  { name: "amber-400", rgb: { r: 251, g: 191, b: 36 } },
  { name: "amber-500", rgb: { r: 245, g: 158, b: 11 } },
  { name: "amber-600", rgb: { r: 217, g: 119, b: 6 } },
  { name: "amber-700", rgb: { r: 180, g: 83, b: 9 } },
  { name: "amber-800", rgb: { r: 146, g: 64, b: 14 } },
  { name: "amber-900", rgb: { r: 120, g: 53, b: 15 } },
  { name: "amber-950", rgb: { r: 69, g: 26, b: 3 } },
  { name: "yellow-50", rgb: { r: 254, g: 252, b: 232 } },
  { name: "yellow-100", rgb: { r: 254, g: 249, b: 195 } },
  { name: "yellow-200", rgb: { r: 254, g: 240, b: 138 } },
  { name: "yellow-300", rgb: { r: 253, g: 224, b: 71 } },
  { name: "yellow-400", rgb: { r: 250, g: 204, b: 21 } },
  { name: "yellow-500", rgb: { r: 234, g: 179, b: 8 } },
  { name: "yellow-600", rgb: { r: 202, g: 138, b: 4 } },
  { name: "yellow-700", rgb: { r: 161, g: 98, b: 7 } },
  { name: "yellow-800", rgb: { r: 133, g: 77, b: 14 } },
  { name: "yellow-900", rgb: { r: 113, g: 63, b: 18 } },
  { name: "yellow-950", rgb: { r: 66, g: 32, b: 6 } },
  { name: "lime-50", rgb: { r: 247, g: 254, b: 231 } },
  { name: "lime-100", rgb: { r: 236, g: 252, b: 203 } },
  { name: "lime-200", rgb: { r: 217, g: 249, b: 157 } },
  { name: "lime-300", rgb: { r: 190, g: 242, b: 100 } },
  { name: "lime-400", rgb: { r: 163, g: 230, b: 53 } },
  { name: "lime-500", rgb: { r: 132, g: 204, b: 22 } },
  { name: "lime-600", rgb: { r: 101, g: 163, b: 13 } },
  { name: "lime-700", rgb: { r: 77, g: 124, b: 15 } },
  { name: "lime-800", rgb: { r: 63, g: 98, b: 18 } },
  { name: "lime-900", rgb: { r: 54, g: 83, b: 20 } },
  { name: "lime-950", rgb: { r: 26, g: 46, b: 5 } },
  { name: "green-50", rgb: { r: 240, g: 253, b: 244 } },
  { name: "green-100", rgb: { r: 220, g: 252, b: 231 } },
  { name: "green-200", rgb: { r: 187, g: 247, b: 208 } },
  { name: "green-300", rgb: { r: 134, g: 239, b: 172 } },
  { name: "green-400", rgb: { r: 74, g: 222, b: 128 } },
  { name: "green-500", rgb: { r: 34, g: 197, b: 94 } },
  { name: "green-600", rgb: { r: 22, g: 163, b: 74 } },
  { name: "green-700", rgb: { r: 21, g: 128, b: 61 } },
  { name: "green-800", rgb: { r: 22, g: 101, b: 52 } },
  { name: "green-900", rgb: { r: 20, g: 83, b: 45 } },
  { name: "green-950", rgb: { r: 5, g: 46, b: 22 } },
  { name: "emerald-50", rgb: { r: 236, g: 253, b: 245 } },
  { name: "emerald-100", rgb: { r: 209, g: 250, b: 229 } },
  { name: "emerald-200", rgb: { r: 167, g: 243, b: 208 } },
  { name: "emerald-300", rgb: { r: 110, g: 231, b: 183 } },
  { name: "emerald-400", rgb: { r: 52, g: 211, b: 153 } },
  { name: "emerald-500", rgb: { r: 16, g: 185, b: 129 } },
  { name: "emerald-600", rgb: { r: 5, g: 150, b: 105 } },
  { name: "emerald-700", rgb: { r: 4, g: 120, b: 87 } },
  { name: "emerald-800", rgb: { r: 6, g: 95, b: 70 } },
  { name: "emerald-900", rgb: { r: 6, g: 78, b: 59 } },
  { name: "emerald-950", rgb: { r: 2, g: 44, b: 34 } },
  { name: "teal-50", rgb: { r: 240, g: 253, b: 250 } },
  { name: "teal-100", rgb: { r: 204, g: 251, b: 241 } },
  { name: "teal-200", rgb: { r: 153, g: 246, b: 228 } },
  { name: "teal-300", rgb: { r: 94, g: 234, b: 212 } },
  { name: "teal-400", rgb: { r: 45, g: 212, b: 191 } },
  { name: "teal-500", rgb: { r: 20, g: 184, b: 166 } },
  { name: "teal-600", rgb: { r: 13, g: 148, b: 136 } },
  { name: "teal-700", rgb: { r: 15, g: 118, b: 110 } },
  { name: "teal-800", rgb: { r: 17, g: 94, b: 89 } },
  { name: "teal-900", rgb: { r: 19, g: 78, b: 74 } },
  { name: "teal-950", rgb: { r: 4, g: 47, b: 46 } },
  { name: "cyan-50", rgb: { r: 236, g: 254, b: 255 } },
  { name: "cyan-100", rgb: { r: 207, g: 250, b: 254 } },
  { name: "cyan-200", rgb: { r: 165, g: 243, b: 252 } },
  { name: "cyan-300", rgb: { r: 103, g: 232, b: 249 } },
  { name: "cyan-400", rgb: { r: 34, g: 211, b: 238 } },
  { name: "cyan-500", rgb: { r: 6, g: 182, b: 212 } },
  { name: "cyan-600", rgb: { r: 8, g: 145, b: 178 } },
  { name: "cyan-700", rgb: { r: 14, g: 116, b: 144 } },
  { name: "cyan-800", rgb: { r: 21, g: 94, b: 117 } },
  { name: "cyan-900", rgb: { r: 22, g: 78, b: 99 } },
  { name: "cyan-950", rgb: { r: 8, g: 51, b: 68 } },
  { name: "sky-50", rgb: { r: 240, g: 249, b: 255 } },
  { name: "sky-100", rgb: { r: 224, g: 242, b: 254 } },
  { name: "sky-200", rgb: { r: 186, g: 230, b: 253 } },
  { name: "sky-300", rgb: { r: 125, g: 211, b: 252 } },
  { name: "sky-400", rgb: { r: 56, g: 189, b: 248 } },
  { name: "sky-500", rgb: { r: 14, g: 165, b: 233 } },
  { name: "sky-600", rgb: { r: 2, g: 132, b: 199 } },
  { name: "sky-700", rgb: { r: 3, g: 105, b: 161 } },
  { name: "sky-800", rgb: { r: 7, g: 89, b: 133 } },
  { name: "sky-900", rgb: { r: 12, g: 74, b: 110 } },
  { name: "sky-950", rgb: { r: 8, g: 47, b: 73 } },
  { name: "blue-50", rgb: { r: 239, g: 246, b: 255 } },
  { name: "blue-100", rgb: { r: 219, g: 234, b: 254 } },
  { name: "blue-200", rgb: { r: 191, g: 219, b: 254 } },
  { name: "blue-300", rgb: { r: 147, g: 197, b: 253 } },
  { name: "blue-400", rgb: { r: 96, g: 165, b: 250 } },
  { name: "blue-500", rgb: { r: 59, g: 130, b: 246 } },
  { name: "blue-600", rgb: { r: 37, g: 99, b: 235 } },
  { name: "blue-700", rgb: { r: 29, g: 78, b: 216 } },
  { name: "blue-800", rgb: { r: 30, g: 64, b: 175 } },
  { name: "blue-900", rgb: { r: 30, g: 58, b: 138 } },
  { name: "blue-950", rgb: { r: 23, g: 37, b: 84 } },
  { name: "indigo-50", rgb: { r: 238, g: 242, b: 255 } },
  { name: "indigo-100", rgb: { r: 224, g: 231, b: 255 } },
  { name: "indigo-200", rgb: { r: 199, g: 210, b: 254 } },
  { name: "indigo-300", rgb: { r: 165, g: 180, b: 252 } },
  { name: "indigo-400", rgb: { r: 129, g: 140, b: 248 } },
  { name: "indigo-500", rgb: { r: 99, g: 102, b: 241 } },
  { name: "indigo-600", rgb: { r: 79, g: 70, b: 229 } },
  { name: "indigo-700", rgb: { r: 67, g: 56, b: 202 } },
  { name: "indigo-800", rgb: { r: 55, g: 48, b: 163 } },
  { name: "indigo-900", rgb: { r: 49, g: 46, b: 129 } },
  { name: "indigo-950", rgb: { r: 30, g: 27, b: 75 } },
  { name: "violet-50", rgb: { r: 245, g: 243, b: 255 } },
  { name: "violet-100", rgb: { r: 237, g: 233, b: 254 } },
  { name: "violet-200", rgb: { r: 221, g: 214, b: 254 } },
  { name: "violet-300", rgb: { r: 196, g: 181, b: 253 } },
  { name: "violet-400", rgb: { r: 167, g: 139, b: 250 } },
  { name: "violet-500", rgb: { r: 139, g: 92, b: 246 } },
  { name: "violet-600", rgb: { r: 124, g: 58, b: 237 } },
  { name: "violet-700", rgb: { r: 109, g: 40, b: 217 } },
  { name: "violet-800", rgb: { r: 91, g: 33, b: 182 } },
  { name: "violet-900", rgb: { r: 76, g: 29, b: 149 } },
  { name: "violet-950", rgb: { r: 46, g: 16, b: 101 } },
  { name: "purple-50", rgb: { r: 250, g: 245, b: 255 } },
  { name: "purple-100", rgb: { r: 243, g: 232, b: 255 } },
  { name: "purple-200", rgb: { r: 233, g: 213, b: 255 } },
  { name: "purple-300", rgb: { r: 216, g: 180, b: 254 } },
  { name: "purple-400", rgb: { r: 192, g: 132, b: 252 } },
  { name: "purple-500", rgb: { r: 168, g: 85, b: 247 } },
  { name: "purple-600", rgb: { r: 147, g: 51, b: 234 } },
  { name: "purple-700", rgb: { r: 126, g: 34, b: 206 } },
  { name: "purple-800", rgb: { r: 107, g: 33, b: 168 } },
  { name: "purple-900", rgb: { r: 88, g: 28, b: 135 } },
  { name: "purple-950", rgb: { r: 59, g: 7, b: 100 } },
  { name: "fuchsia-50", rgb: { r: 253, g: 244, b: 255 } },
  { name: "fuchsia-100", rgb: { r: 250, g: 232, b: 255 } },
  { name: "fuchsia-200", rgb: { r: 245, g: 208, b: 254 } },
  { name: "fuchsia-300", rgb: { r: 240, g: 171, b: 252 } },
  { name: "fuchsia-400", rgb: { r: 232, g: 121, b: 249 } },
  { name: "fuchsia-500", rgb: { r: 217, g: 70, b: 239 } },
  { name: "fuchsia-600", rgb: { r: 192, g: 38, b: 211 } },
  { name: "fuchsia-700", rgb: { r: 162, g: 28, b: 175 } },
  { name: "fuchsia-800", rgb: { r: 134, g: 25, b: 143 } },
  { name: "fuchsia-900", rgb: { r: 112, g: 26, b: 117 } },
  { name: "fuchsia-950", rgb: { r: 74, g: 4, b: 78 } },
  { name: "pink-50", rgb: { r: 253, g: 242, b: 248 } },
  { name: "pink-100", rgb: { r: 252, g: 231, b: 243 } },
  { name: "pink-200", rgb: { r: 251, g: 207, b: 232 } },
  { name: "pink-300", rgb: { r: 249, g: 168, b: 212 } },
  { name: "pink-400", rgb: { r: 244, g: 114, b: 182 } },
  { name: "pink-500", rgb: { r: 236, g: 72, b: 153 } },
  { name: "pink-600", rgb: { r: 219, g: 39, b: 119 } },
  { name: "pink-700", rgb: { r: 190, g: 24, b: 93 } },
  { name: "pink-800", rgb: { r: 157, g: 23, b: 77 } },
  { name: "pink-900", rgb: { r: 131, g: 24, b: 67 } },
  { name: "pink-950", rgb: { r: 80, g: 7, b: 36 } },
  { name: "rose-50", rgb: { r: 255, g: 241, b: 242 } },
  { name: "rose-100", rgb: { r: 255, g: 228, b: 230 } },
  { name: "rose-200", rgb: { r: 254, g: 205, b: 211 } },
  { name: "rose-300", rgb: { r: 253, g: 164, b: 175 } },
  { name: "rose-400", rgb: { r: 251, g: 113, b: 133 } },
  { name: "rose-500", rgb: { r: 244, g: 63, b: 94 } },
  { name: "rose-600", rgb: { r: 225, g: 29, b: 72 } },
  { name: "rose-700", rgb: { r: 190, g: 18, b: 60 } },
  { name: "rose-800", rgb: { r: 159, g: 18, b: 57 } },
  { name: "rose-900", rgb: { r: 136, g: 19, b: 55 } },
  { name: "rose-950", rgb: { r: 76, g: 5, b: 25 } },
];
