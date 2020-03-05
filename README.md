Name       : Memteach  
Version    : 1.0.0  
Description: Yet another memory-card game  
Author     : Vitalii Savinov  
License    : ISC (see LICENSE.md)  


OBJECT OF THE GAME
==================
The object of the game is to remove all the memory-cards from the table with the minimal amount of clicks.

PLAYING MEMTEACH
================
The player clicks a card on a table and turns it over. Then clicks another card and turns it over. 
If these two cards are a matching pair they are removed from the table.

If these cards are not a match the player clicks a third card on a table, both previous cards are turned back over and the player searches the next matching card.
When all the cards are removed from the table click-counter is stopped.



REQUIREMENTS
============
First of all you need to have a Node.js programming platfom, NPM packets manager and Webpack module bundler installed on your computer.
You will also need to install a Node.js's framework "Express" and a Node.js's module "serve-favicon".

For Debian & Ubuntu
-------------------
1. To upgrade the installed packages to their latest versions run: sudo apt update
2. To install Node.js programming platfom run: sudo apt install nodejs
3. To install packets manager NPM run: sudo apt install npm
4. To install module bundler Webpack run: npm install webpack
5. To install framework Express run: npm install express
6. To install module "serve-favicon" run: npm install serve-favicon


INSTALLATION
============
First of all you need to have a Git client installed on your computer.

1. Clone Memteach from the Github by running a command: git clone https://github.com/vitsavinov/memteach
2. To generate a bundle "memory-bundle.js" run a command: npm run build
   You will see a new file "memory-bundle.js" in the directory
 

HOW TO START ON A LOCAL HOST
============================
1. Start a game server by running: sudo node server.js
   You will see a message "Server is listening on port 8000"
2. Run your browser and type in the addres field: localhost:8000

Find the matching pairs of the cards and cleat the table!