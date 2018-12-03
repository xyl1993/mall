const app = require('./app');
const fs = require('fs');
const path = require('path');
const HTTPS_PORT = process.env.PORT || 8443;
const PORT = process.env.PORT || 8002;
const jwtSecret = require('./config/environment').jwtEncryption;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});