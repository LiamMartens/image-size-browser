import fs from "node:fs";
import path from "node:path";
import { detector, imageSize } from "../src/index.js";
import { expect, test } from "bun:test";

test("tiff example", () => {
  const filePath = path.resolve(import.meta.dir, "./example.tiff");
  const buff = fs.readFileSync(filePath);
  expect(detector(buff)).toEqual("tiff");
  expect(imageSize(buff)).toEqual({
    type: "tiff",
    width: 800,
    height: 200,
  });
});
