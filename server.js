const express = require('express');
const port = 80;

const app = express();
app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');    
});

app.listen(port, () => {
  console.log('Server is listening on port ' + port);
});
