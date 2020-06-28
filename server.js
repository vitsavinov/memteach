//
// Copyright (c) 2020, Vitalii Savinov, vitsavinov@gmail.com
// Licensed under the ISC License (the "License").
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at https://www.isc.org/licenses/
//

const firebase = require('firebase');
const fb_admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const express = require('express');
const port = 80;

// Initialize Firebase
fb_admin.initializeApp({
  credential: fb_admin.credential.cert(serviceAccount),
  databaseURL: "https://memteach-project-95558.firebaseio.com"
});

// Initialize Express
const app = express();
app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');    
});

// Start server listening
app.listen(port, () => {
  console.log('Server is listening on port ' + port);
});
