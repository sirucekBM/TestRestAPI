require('dotenv').config();
const express = require("express");
const config = require('./src/config/config');
const app = express();

app.listen(config.app_port);
console.log(`server běží na portě: ${config.app_port}.`);

app.use(express.json({
    type: ['application/json', 'text/plain']
}));

