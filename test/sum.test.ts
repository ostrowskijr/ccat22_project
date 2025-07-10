import { sum } from "../src/sum";

test('sum function', () => {
  expect(sum(2, 2)).toBe(4);
});