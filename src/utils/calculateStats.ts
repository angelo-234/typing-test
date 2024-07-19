export const calculateWPM = (wordCount: number, startTime: number | null, endTime: number | null): number => {
    if (!startTime || !endTime) return 0;
    const minutes = (endTime - startTime) / 60000;
    return wordCount / minutes;
  };
  
  export const calculateAccuracy = (correctChars: number, totalChars: number): number => {
    if (totalChars === 0) return 100;
    return (correctChars / totalChars) * 100;
  };