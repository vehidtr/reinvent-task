const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const synonyms = require("./routes/SynonymRouter.js");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/', synonyms);
app.use(express.json());

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;