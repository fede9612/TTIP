const express = require('express');
var cors = require('cors');
const app = express();
const path = require('path');
const port = process.env.PORT || 3001

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods: GET");
    next();
});
app.use(cors());
app.use('/', express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });

app.listen(port, () => console.log("Listening on Port", port));