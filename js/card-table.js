//
// Copyright (c) 2020, Vitalii Savinov, vitsavinov@gmail.com
// Licensed under the ISC License (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at https://www.isc.org/licenses/
//

'use strict';

import Component from './component.js';
import CardService from './services/card-service.js';
import HttpService from './services/http-service.js';

export default class CardTable extends Component {
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
        this._cardservice = new CardService();

        // get the cards from the server
        HttpService.get( `./data/cards.json` )
        .then(
            (cards) => {
              this._cardslist = cards;

              this._shuffle(this._layout, this._cardslist);
              this._fillTable();
              this._bindAuthButtons();
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

              // place this card in the random cell
              curIndex = this._getRandomInRange(0, curLen-1);
              curKey = tmpTable[curIndex];
              table[curKey] = curCard;
              tmpTable.splice(curIndex, 1); // delete this cell from the list
              curLen = tmpTable.length;

              // place the "twin" of this card in the another random cell
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

            // bind the click handler to the each card on the table
            this.on(curTD, 'click', (event) => {
            this._cardservice.cardCheck(event.currentTarget, this._layout); // check the state of the table
            });
        }
    }

    //=====================================================
    // bind the click handler to the register and login buttons
    _bindAuthButtons() {
        //  bind the click handler to the Login button
        let logBtn = this._element.querySelector("#btnLogin");
        this.on(logBtn, 'click', (event) => {
              this._cardservice.openLoginForm(event.currentTarget, this._element);
         });

        //  bind the click handler to the Register button
        let regBtn = this._element.querySelector("#btnRegister");
        this.on(regBtn, 'click', (event) => {
              this._cardservice.openRegisterForm(event.currentTarget, this._element);
        });

        //  bind the click handler to the Enter button in the Login form
        let entrLogBtn = this._element.querySelector("#btnEnterLogin");
        this.on(entrLogBtn, 'click', (event) => {
              this._cardservice.closeLoginForm(event.currentTarget, this._element);
        });

        //  bind the click handler to the Enter button in the Register form
        let entrRegBtn = this._element.querySelector("#btnEnterRegister");
        this.on(entrRegBtn, 'click', (event) => {
              this._cardservice.closeRegisterForm(event.currentTarget, this._element);
        });
    }
  
}