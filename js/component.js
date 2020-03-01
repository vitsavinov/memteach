'use strict';

export default class Component {
  constructor(element) {
    this._element = element;
  }

  cardShow(curElement) {
    curElement.classList.remove('hide');
  }

  cardHide(curElement) {
    curElement.classList.add('hide');
  }

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