import typingParseDictionary from "./romanTypingParseDictionary.json";

const parseMap = typingParseDictionary.reduce(
  (map, { Pattern, TypePattern }) => map.set(Pattern, TypePattern),
  new Map<string, string[]>()
);

const getSlicedStrList = (sentence: string, index: number) =>
  [3, 2, 1].map((n) =>
    index + n - 1 < sentence.length ? sentence.slice(index, index + n) : ""
  );

export const makeTypeingChecker = (sentence: string) => {
  let index = 0;
  // 一つのひらがなに対して、どんなローマ字の入力を受け付けることができるかのリスト
  // checkersがromanTypingParseDictionaryのTypePatternにあたり、
  // slicesStentencesがPatternにあたる
  const checkers = [];
  const slicedSentences = [];

  while (index < sentence.length) {
    const slicedStrList = getSlicedStrList(sentence, index);
    const foundTypeListIndex = slicedStrList.findIndex((str) =>
      parseMap.has(str)
    );
    const foundPattern = slicedStrList[foundTypeListIndex];

    index += 3 - foundTypeListIndex;
    slicedSentences.push(foundPattern);
    checkers.push(parseMap.get(foundPattern) as string[]);
  }

  return {
    checkers,
    slicedSentences,
  };
};
