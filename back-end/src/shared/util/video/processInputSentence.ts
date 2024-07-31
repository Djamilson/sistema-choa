const natural = require('natural');
const Sentiment = require('sentiment');

const sentiment = new Sentiment();

const tokenizer = new natural.WordTokenizer();

function processInputSentence(sentence: any) {
  console.log('   sentence', sentence);

  const tokens = tokenizer.tokenize(sentence);
  console.log('   tokens', tokens);
  const sentimentScore = sentiment.analyze(sentence).score;
  console.log('   sentimentScore', sentimentScore);
  const entities = natural.NamedEntityRecognizer.getEntities(sentence);
  console.log('   entities', entities);

  return {
    tokens,
    sentimentScore,
    entities,
  };
}

export { processInputSentence };
