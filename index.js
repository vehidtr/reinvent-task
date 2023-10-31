const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Create an object to store synonyms
const synonyms = {
  strong: ["strong", "heavy", "active", "solid"],
  heavy: ["strong"],
  active: ["strong"],
  solid: ["strong"],
};

// Function to add a new word with its synonyms
const addSynonyms = (word, synonymsList) => {
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
};

function getSynonyms(wordList) {
  let synList = new Set();
  wordList?.forEach((syn) => {
    synList = new Set([...synList, ...synonyms[syn]]);
  });
  return [...synList] || [];
}

// Add a new word with its synonyms
app.post("/add", (req, res) => {
  const { word, synonymsList } = req.body;
  addSynonyms(word, synonymsList);
  res.json({ message: "Word and synonyms added." });
});

app.get("/synonyms/:word", (req, res) => {
  const word = req.params.word;
  const result = { word, synonyms: [] };
  if (synonyms[word]) {
    result.synonyms = getSynonyms(synonyms[word]);
  }
  res.json(result);
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
