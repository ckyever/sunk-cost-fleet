export function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function getCoordinateListDifferences(list1, list2) {
  return list1.filter((coordinate1) => {
    const isFound = list2.some((coordinate2) => {
      return (
        coordinate1[0] === coordinate2[0] && coordinate1[1] === coordinate2[1]
      );
    });
    return !isFound;
  });
}
