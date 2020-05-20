//
// Copyright (c) 2020, Vitalii Savinov, vitsavinov@gmail.com
// Licensed under the ISC License (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at https://www.isc.org/licenses/
//

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
