type ICalculateReadingTime = {
  text: string;
  wordsPerMinute: number;
};

function calculateReadingTime({ text, wordsPerMinute }: ICalculateReadingTime) {
  const wordCount = text.split(' ').length;
  const readingTime = wordCount / wordsPerMinute;
  return Math.ceil(readingTime);
}

export { calculateReadingTime };
