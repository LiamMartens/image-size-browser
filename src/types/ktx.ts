import type { IImage } from "./interface.js";
import { toUTF8String, readUInt32LE } from "./utils.js";

export const KTX: IImage = {
  validate: (input) => toUTF8String(input, 1, 7) === 'KTX 11',

  calculate: (input) => ({
    height: readUInt32LE(input, 40),
    width: readUInt32LE(input, 36),
  }),
}
