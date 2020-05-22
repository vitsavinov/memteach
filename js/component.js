//
// Copyright (c) 2020, Vitalii Savinov, vitsavinov@gmail.com
// Licensed under the ISC License (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at https://www.isc.org/licenses/
//

'use strict';

export default class Component {
  constructor(element) {
    this._element = element;
  }

  // open card on the table
  cardShow(curElement) {
    curElement.classList.remove('hide');
  }

  // hide card on the table
  cardHide(curElement) {
    curElement.classList.add('hide');
  }

  // drop card from the table
  cardDrop(curElement) {
    while ( curElement.lastChild.classList.length > 0 ) { 
      curElement.removeChild(curElement.lastChild); 
    } 
  }

  on(curElement, eventName, handler) {
    curElement.addEventListener(eventName, handler);
  }

  trigger(curElement, eventName) {
    let myEvent = new CustomEvent(eventName, {
      detail: curElement,
    });

    curElement.dispatchEvent(myEvent);
  }
}