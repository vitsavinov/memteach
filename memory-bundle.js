/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Component {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Component;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__card_table_js__ = __webpack_require__(2);




new __WEBPACK_IMPORTED_MODULE_0__card_table_js__["a" /* default */]({
  element: document.querySelector('[data-component="card-table"]'),
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_card_service_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_http_service_js__ = __webpack_require__(4);






class CardTable extends __WEBPACK_IMPORTED_MODULE_0__component_js__["a" /* default */] {
  
  constructor({ element }) {
    super(element);
    this._element = element;
    
    // init layout
    this._cardslist = [];
    this._layout = {
      "cell-1": {},"cell-2": {},"cell-3": {},"cell-4": {},"cell-5": {},"cell-6": {},
      "cell-7": {},"cell-8": {},"cell-9": {},"cell-10": {},"cell-11": {},"cell-12": {},
      "cell-13": {},"cell-14": {},"cell-15": {},"cell-16": {},"cell-17": {},"cell-18": {},
      "cell-19": {},"cell-20": {},"cell-21": {},"cell-22": {},"cell-23": {},"cell-24": {},
      "cell-25": {},"cell-26": {},"cell-27": {},"cell-28": {},"cell-29": {},"cell-30": {},
      "cell-31": {},"cell-32": {},"cell-33": {},"cell-34": {},"cell-35": {},"cell-36": {}
    };
    this._cardservice = new __WEBPACK_IMPORTED_MODULE_1__services_card_service_js__["a" /* default */]();
    
    // get the cards from the server
    __WEBPACK_IMPORTED_MODULE_2__services_http_service_js__["a" /* default */].get( `./data/cards.json` )
    .then(
        (cards) => { 
          this._cardslist = cards; 

          this._shuffle(this._layout, this._cardslist);
          this._fillTable();
        },
        (error) => { console.log(error); }
    );

  }

  //====================================================
  // get random int from the range min - max
  _getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //====================================================
  // shuffle the cards on the table
  _shuffle(table, cards) {
    let tmpTable = [];
    let tmpCards = [];

    // create an auxilary array of cells
    for (let key in table) {
      tmpTable.push(key);
    }

    // create an auxiliary array of cards
    cards.forEach( (item) => {
      tmpCards.push(item);
    });
    

    // fill the layout with cards randomly
    let curLen = tmpTable.length;
    while (curLen) { 
      let curCard = tmpCards.pop(); // take the first card and delete it from the list
      let curIndex = 0;
      let curKey = "";

      // place this card in the randome cell
      curIndex = this._getRandomInRange(0, curLen-1);
      curKey = tmpTable[curIndex];
      table[curKey] = curCard;
      tmpTable.splice(curIndex, 1); // delete this cell from the list
      curLen = tmpTable.length;

      // place the "twin" of this card in the another randome cell
      curIndex = this._getRandomInRange(0, curLen-1);
      curKey = tmpTable[curIndex];
      table[curKey] = curCard;
      tmpTable.splice(curIndex, 1); // delete this cell from the list
      curLen = tmpTable.length;
    }
  }

  //=====================================================
  // fill the table with cards from the filled layout
  _fillTable() {
    let newImg = "";
    let curTD = {};

	for (let key in this._layout) {
      // draw the card
      newImg = `<img class="card-face hide" src="${this._layout[key].imagePath}">`;
      curTD = this._element.querySelector("#"+key);

      curTD.innerHTML +=  newImg;

      // bind the click handler to the each card
      this.on(curTD, 'click', (event) => {
        this._cardservice.cardCheck(event.currentTarget, this._layout); // check the state of the table
      });
    }
  }
  
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CardTable;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_js__ = __webpack_require__(0);




//================================================================
// This service remembers opened cards and checks the state of the table.
// Depending of results of checking it closes the cards or takes them off from the table.
class CardService extends __WEBPACK_IMPORTED_MODULE_0__component_js__["a" /* default */] {
  
  constructor() {
    super();

    this._cardsRegistry = [];
	this.counter = 36;
	this.clicks = 0;
	
	this.startFlag = false;
	this.stopFlag  = false;
	
	this.stopwatch = document.querySelector('[data-component="counter"]');
	this.stopwatch.innerText = "Clicks: " + this.clicks.toString();
  }

  //===================================================================
  // check the current state of the table and make actions
  cardCheck(curElement, curLayout) {
    if ( !this.startFlag ) {
	  	this.startFlag = true;
	}
	if ( curElement.innerHTML !== '<img src="./img/card-empty.jpg">' ) {   					  // check if this cell is empty already 
		if ( !this.stopFlag ) {
	  		this.clicks++;
			this.stopwatch.innerText = "Clicks: " + this.clicks.toString();
		}

		// this cell is not empty - make actions
	    if (this._cardsRegistry.length === 0) {   // if the registry is empty already 
		  this._cardsRegistry.push(curElement); // push the card to the registry
		  this.cardShow(curElement.lastChild); // open this card
		} 
		else if (this._cardsRegistry.length === 1) {      // if there is one opened card in the registry already
		  if ( this._cardsRegistry[0] !== curElement ) {  // forbid two clicks on the one card
			this._cardsRegistry.push(curElement);
			this.cardShow(curElement.lastChild); // open card

			// check two cards from the registry for coincidence
			if ( curLayout[this._cardsRegistry[0].id].id === curLayout[this._cardsRegistry[1].id].id ) {
			  let card_1 = this._cardsRegistry[0];
			  let card_2 = this._cardsRegistry[1];
			  this._cardsRegistry.length = 0;   // clean the registry

			  setTimeout( () => {
				this.cardDrop(card_1); 			// remove these cards from the table
				this.cardDrop(card_2);  		// 
				
				this.counter -= 2;
				if ( this.counter === 0 ) {
					this.stopFlag = true;
				}
			  }, 200);
			}
		  }
		}
		else if (this._cardsRegistry.length === 2) {    // if there are two non-equals opened cards in the registry already
		  this.cardHide(this._cardsRegistry[0].lastChild); 
		  this.cardHide(this._cardsRegistry[1].lastChild); // close these cards
		  this._cardsRegistry.length = 0;

		  this.cardShow(curElement.lastChild); // open new card
		  this._cardsRegistry.push(curElement);     // push this card to the registry
		}
	}

  }            // end cardCheck()
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CardService;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


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

/* harmony default export */ __webpack_exports__["a"] = (HttpService);


/***/ })
/******/ ]);