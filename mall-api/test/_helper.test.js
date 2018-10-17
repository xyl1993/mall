const mongoose = require('mongoose');
const DatabaseCleaner = require('database-cleaner');
const databaseCleaner = new DatabaseCleaner('mongodb');
const {mongo} = require('../src/config/environment/test');

const MONGODB_URL = mongo.uri;

mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect(MONGODB_URL, { useNewUrlParser: true });
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);
  mongoose.connection
    .once('open', done)
    .on('error', error => {
      console.warn('MongoDB connection error:', error)
    });
});

beforeEach(done => {
  databaseCleaner.clean(mongoose.connection.db, done);  
});

after(done => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(done);
  });
});
