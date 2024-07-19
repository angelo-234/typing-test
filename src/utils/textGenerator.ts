import { wordList } from './wordList'

export const generateText = (wordCount: number): string[] => {
  const text: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    text.push(wordList[randomIndex]);
  }
  return text;
};