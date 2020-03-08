const express = require('express');
const port = 80;

var path         = require('path');
var favicon      = require('serve-favicon');

const app = express();

app.use(express.static(__dirname));
app.use(favicon(path.join(__dirname,'favicon.png')));

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');    
});

app.listen(port, () => {
  console.log('Server is listening on port ' + port);
});
