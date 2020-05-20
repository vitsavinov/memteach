//
// Copyright (c) 2020, Vitalii Savinov, vitsavinov@gmail.com
// Licensed under the ISC License (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at https://www.isc.org/licenses/
//

'use strict';

const HttpService = {
  get(url) {
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url, true);

      xhr.onload = () => {
        if (xhr.status == 200) {
          let data = JSON.parse(xhr.responseText);
          resolve(data);
        } else {
          reject(Error(xhr.statusText));
        }
      };

      xhr.onerror = function() {
        reject(Error(xhr.statusText));
      };

      xhr.send();
    });
  } 
};

export default HttpService;
