// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet(newTweet, callback) {
      db.collection('tweets').insertOne(newTweet);
      callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets(callback) {
      const sortNewestFirst = (a, b) => b.created_at - a.created_at;
      // searches Mongo DB for all tweets and returns them as an array
      db.collection('tweets').find().toArray((err, result) => {
        if (err) {
          throw err;
        }
        callback(null, result.sort(sortNewestFirst));
      });
    },

  };
};
