export const capitalize = (text: string): string => {
  const mySentence = text.toLowerCase();
  const words = mySentence.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(" ");
};
