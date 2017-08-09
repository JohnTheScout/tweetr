// Basic express setup:

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const PORT = 8080;
const MONGODB_URI = 'mongodb://localhost:27017/tweetr';
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// load the Mongo database
MongoClient.connect(MONGODB_URI, (err, db) => {
  // DataHelpers function, gets bound to db so we don't have to pass it in all the time
  const DataHelpers = require('./lib/data-helpers.js')(db);

  // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = require('./routes/tweets')(DataHelpers);

  // Mount the tweets routes at the '/tweets' path prefix:
  app.use('/tweets', tweetsRoutes);

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
});
