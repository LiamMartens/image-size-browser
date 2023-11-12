import { ISizeCalculationResult } from "./types/interface.js";
import { detector } from "./detector.js";
import { typeHandlers } from "./types/index.js";

/**
 * Return size information based on an Uint8Array
 *
 * @param {Uint8Array} input
 * @returns {Object}
 */
function lookup(input: Uint8Array): ISizeCalculationResult {
  // detect the file type.. don't rely on the extension
  const type = detector(input);

  if (typeof type !== "undefined") {
    // find an appropriate handler for this file type
    if (type in typeHandlers) {
      const size = typeHandlers[type].calculate(input);
      if (size !== undefined) {
        size.type = type;
        return size;
      }
    }
  }

  // throw up, if we don't understand the file
  throw new TypeError("unsupported file type: " + type);
}

export default imageSize;

/**
 * @param {Uint8Array|string} input - Uint8Array or relative/absolute path of the image file
 */
export function imageSize(input: Uint8Array): ISizeCalculationResult {
  return lookup(input);
}

export const types = Object.keys(typeHandlers);
export { detector };
