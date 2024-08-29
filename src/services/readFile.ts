import fs from 'fs';
import {
  BINARY_DIMENSION_X,
  BINARY_DIMENSION_Y,
} from '../constants/sstFileConstants.js';

const readFile = (filePath: string): number[][] => {
  const buffer = fs.readFileSync(filePath);
  const temperaturesArray: number[][] = [];
  let index = 0;

  for (let i = 0; i < BINARY_DIMENSION_Y; i++) {
    const row: number[] = [];
    for (let j = 0; j < BINARY_DIMENSION_X; j++) {
      const tempFahrenheit = buffer[index++];
      row.push(tempFahrenheit);
    }

    temperaturesArray.push(row);
  }

  return temperaturesArray;
};

export default readFile;
