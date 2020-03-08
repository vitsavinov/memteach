const express = require('express');
const port = 80;

var path = require('path');

const app = express();

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');    
});

app.listen(port, () => {
  console.log('Server is listening on port ' + port);
});
