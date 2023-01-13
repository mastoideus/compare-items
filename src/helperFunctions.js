export function compareCounterFun(itemsLength) {
  let compareCounter = 0;
  for (let i = 0; i < itemsLength; i++) {
    compareCounter += itemsLength - (i + 1);
  }
  return compareCounter;
}

const invalidPair = (first, second, pairs, pair) => {
  return (
    first === second ||
    pairs.includes(pair) ||
    pairs.includes(pair.split("-").reverse().join("-"))
  );
};

export const findTwoDiffItems = (state) => {
  const firstItem = state.items[Math.trunc(Math.random() * state.items.length)];
  const secondItem =
    state.items[Math.trunc(Math.random() * state.items.length)];
  const pair = firstItem.name + "-" + secondItem.name;

  if (state.compareCounter < 1) {
    return ["", ""];
  }
  if (invalidPair(firstItem.name, secondItem.name, state.comparedPairs, pair)) {
    return findTwoDiffItems(state);
  }

  return [firstItem, secondItem];
};
