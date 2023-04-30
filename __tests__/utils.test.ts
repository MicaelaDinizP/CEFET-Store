// Arquivo: utils.test.ts

import { sum } from "../app/src/utils";

test("sum function should add two numbers", () => {
  expect(sum(1, 2)).toBe(3);
});
