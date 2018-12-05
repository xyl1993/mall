const app = require('./app');
const PORT = process.env.PORT || 8002;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});



// Schedule setup for data statistics
const schedule = require('./utils/schedule');
schedule.scheduleSetup();
