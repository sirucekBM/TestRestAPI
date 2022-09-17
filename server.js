const express = require("express");
const app = express();

app.listen(3000);
console.log("server běží na portě 3000")
app.use(express.json({
    type: ['application/json', 'text/plain']
}));

