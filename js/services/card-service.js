//
// Copyright (c) 2020, Vitalii Savinov, vitsavinov@gmail.com
// Licensed under the ISC License (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at https://www.isc.org/licenses/
//

'use strict';

import Component from '../component.js';

//================================================================
// This service remembers opened cards and checks the state of the table.
// Depending of results of checking it closes the cards or takes them off from the table.
export default class CardService extends Component {
  
    constructor() {
        super();

        this._cardsRegistry = [];
        this.counter = 36;
        this.clicks = 0;

        this.startFlag = false;
        this.stopFlag  = false;

        this.clickCounter = document.querySelector('[data-component="counter"]');
        this.clickCounter.innerText = "Clicks: " + this.clicks.toString();

        this.logName = document.querySelector('[data-component="login-name"]');
        this.logPass = document.querySelector('[data-component="login-password"]');

        this.regName = document.querySelector('[data-component="register-name"]');
        this.regEmail = document.querySelector('[data-component="register-email"]');
        this.regCountry = document.querySelector('[data-component="register-country"]');
        this.regPass1 = document.querySelector('[data-component="register-password1"]');
        this.regPass2 = document.querySelector('[data-component="register-password2"]');
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
                this.clickCounter.innerText = "Clicks: " + this.clicks.toString();
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

    //===================================================================
    // handle click on Login button
    openLoginForm(curTarget, curElement) {
        // hide counter and auth buttons and show the Login form
        curElement.querySelector('[data-component="counter"]').style.display='none';
        curElement.querySelector('[data-component="auth-buttons"]').style.display='none';
        curElement.querySelector('[data-component="login-form"]').style.display='inline-block';
    }

    //===================================================================
    // handle click on Register button
    openRegisterForm(curTarget, curElement) {
        // hide counter and auth buttons and show the Register form
        curElement.querySelector('[data-component="counter"]').style.display='none';
        curElement.querySelector('[data-component="auth-buttons"]').style.display='none';
        curElement.querySelector('[data-component="register-form"]').style.display='inline-block';
    }

    //===================================================================
    // handle click on Enter button in the Login form
    closeLoginForm(curTarget, curElement) {
        // ===================================
        // Process the login data
        //

        console.log('Login form was forced');
        console.log('Name: ', this.logName.innerText);
        console.log('Password: ', this.logPass.innerText);

        //
        // ===================================

        // hide the Login form and show counter and logout or auth buttons
        curElement.querySelector('[data-component="login-form"]').style.display='none';
        curElement.querySelector('[data-component="counter"]').style.display='inline-block';
        curElement.querySelector('[data-component="auth-buttons"]').style.display='inline-block';
    }

    //===================================================================
    // handle click on Enter button in the Register form
    closeRegisterForm(curTarget, curElement) {
        // ===================================
        // Process the register data
        //

        console.log('Register form was forced');
        console.log('Name: ', this.regName.innerText);
        console.log('Email: ', this.regEmail.innerText);
        console.log('Country: ', this.regCountry.innerText);
        console.log('Password 1: ', this.regPass1.innerText);
        console.log('Password 2: ', this.regPass2.innerText);

        //
        // ===================================

        // hide the Login form and show counter and logout or auth buttons
        curElement.querySelector('[data-component="register-form"]').style.display='none';
        curElement.querySelector('[data-component="counter"]').style.display='inline-block';
        curElement.querySelector('[data-component="auth-buttons"]').style.display='inline-block';
    }

}