import { getCoordinateListDifferences } from "../utility.js";

test("Get difference between two arrays of slightly different coordinates", () => {
  expect(
    getCoordinateListDifferences(
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [2, 2],
      ],
    ),
  ).toEqual([[1, 1]]);
});

test("Get difference between two arrays of exactly same coordinates", () => {
  expect(
    getCoordinateListDifferences(
      [
        [0, 0],
        [2, 2],
      ],
      [
        [0, 0],
        [2, 2],
      ],
    ),
  ).toEqual([]);
});

test("Get difference between two arrays of very different coordinates", () => {
  expect(
    getCoordinateListDifferences(
      [
        [5, 8],
        [4, 8],
        [3, 8],
      ],
      [
        [3, 8],
        [4, 8],
        [5, 8],
        [6, 8],
      ],
    ),
  ).toEqual([]);
});
