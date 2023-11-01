const synonyms = require("../startup/db");

// Function to add a new word with its synonyms
exports.addSynonyms = (req, res) => {
    const { word, synonymsList } = req.body;
    if (!synonyms[word]) {
      synonyms[word] = new Set();
    }
  
    synonyms[word].add(word); // Include the word itself
    synonymsList.forEach((synonym) => {
      if (!synonyms[synonym]) {
        synonyms[synonym] = new Set();
      }
      synonyms[word].add(synonym);
      synonyms[synonym].add(word);
    });
    res.json({ message: "Word and synonyms added." });
  };
  
  exports.getSynonyms = (req, res) => {
  const word = req.params.word;
  const result = { word, synonyms: [] };
  if (synonyms[word]) {
    result.synonyms = getSynonyms(synonyms[word]);
  }
  res.json(result);
};

  getSynonyms = (wordList) => {
    let synList = new Set();
    wordList?.forEach((syn) => {
      synList = new Set([...synList, ...synonyms[syn]]);
    });
    return [...synList] || [];
  }