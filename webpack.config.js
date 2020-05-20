//
// Copyright (c) 2020, Vitalii Savinov, vitsavinov@gmail.com
// Licensed under the ISC License (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at https://www.isc.org/licenses/
//

const path = require('path');

module.exports = {
    entry: './js/app.js',
    output: {
      path: path.resolve(__dirname, './'),
      filename: 'memory-bundle.js'
    }
  };
