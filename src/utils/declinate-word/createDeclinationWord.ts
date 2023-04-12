export const createDeclinationWord = (words: [string, string, string]) => {
  return (count: number) => {
    if (count % 100 > 10 && count % 100 < 20) {
      return words[2];
    }
    switch (count % 10) {
      case 1:
        return words[0];
      case 2:
      case 3:
      case 4:
        return words[1];
      default:
        return words[2];
    }
  };
};
