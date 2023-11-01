const express = require("express");
const router = express.Router();

const SynonymService = require("../controllers/SynonymController.js");

  // Add a new word with its synonyms
router.post("/add", SynonymService.addSynonyms);
  //get synonyms for a word
router.get("/synonyms/:word", SynonymService.getSynonyms);

module.exports = router;