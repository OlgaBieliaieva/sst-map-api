import fs from 'fs';
import { createCanvas, loadImage } from 'canvas';
import {
  BINARY_DIMENSION_X,
  BINARY_DIMENSION_Y,
} from '../constants/sstFileConstants.js';

const colorizeMap = async (
  baseMapPath: string,
  temperaturesArray: number[][],
  outputFilePath: string,
): Promise<{ newMapPath: string }> => {
  const baseMap = await loadImage(baseMapPath);
  const canvas = createCanvas(BINARY_DIMENSION_X, BINARY_DIMENSION_Y);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(baseMap, 0, 0, BINARY_DIMENSION_X, BINARY_DIMENSION_Y);

  const imageData = ctx.getImageData(
    0,
    0,
    BINARY_DIMENSION_X,
    BINARY_DIMENSION_Y,
  );
  const data = imageData.data;

  for (let y = 0; y < temperaturesArray.length; y++) {
    for (let x = 0; x < temperaturesArray[y].length; x++) {
      const index = (y * BINARY_DIMENSION_X + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];

      if (r >= 10 && r <= 80 && g >= 30 && g <= 100 && b >= 60 && b <= 150) {
        const tempFahrenheit = temperaturesArray[y][x];
        const color = temperatureToColor(tempFahrenheit);

        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  return new Promise((resolve, reject) => {
    const out = fs.createWriteStream(outputFilePath);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => resolve({ newMapPath: outputFilePath }));
    out.on('error', reject);
  });
};

function interpolateColor(
  color1: [number, number, number],
  color2: [number, number, number],
  factor: number,
): [number, number, number] {
  const result: [number, number, number] = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    result[i] = Math.round(color1[i] + factor * (color2[i] - color1[i]));
  }
  return result;
}

function temperatureToColor(tempFahrenheit: number): string {
  const tempCelsius = ((tempFahrenheit - 32) * 5) / 9;

  const blue: [number, number, number] = [0, 0, 255];
  const green: [number, number, number] = [0, 255, 0];
  const red: [number, number, number] = [255, 0, 0];

  let color: [number, number, number];

  if (tempCelsius <= 0) {
    color = blue;
  } else if (tempCelsius > 0 && tempCelsius <= 20) {
    const factor = (tempCelsius - 0) / 20;
    color = interpolateColor(blue, green, factor);
  } else {
    const factor = (tempCelsius - 20) / 30;
    color = interpolateColor(green, red, Math.min(factor, 1));
  }

  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

export default colorizeMap;
