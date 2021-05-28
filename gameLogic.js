"use strict";

const { promptFor, pressReturn, cenText, indentText, appBanner, setupGameBanner, appTitle } = require('./helper');
const AI = require('./classes/player/AI');
const Human = require('./classes/player/human');


// Prompt for player name from user input
const promptForPlayerName = (currPlayerName) => {
   let playerName = '';
   appBanner(appTitle);
   console.log('\n\n');
   playerName = promptFor(`\t\tEnter ${currPlayerName} name: `);
   if (playerName != '') {
      return playerName;
   }
   return currPlayerName;    // return string
}


// Run application and game simulation
const runApplication = () => {
   let player1;
   let player2;
   setupGame(player1, player2);

}


// Setup game parameters (ex. game grid, player info, solo or two player)
const setupGame = (player1, player2) => {
   let loop = true;
   while (loop) {
      setupGameBanner();
      console.log(indentText("Do you wish to player solo or another person"));
      let gameMode = promptFor(indentText("Enter 'S' for solo or 'P' for another person: ")).toUpperCase();
      if (gameMode === 'P' || gameMode === 'S') {  // create AI and human player instances as required
         if (gameMode === 'S') {
            player1 = new Human('Player 1');
            player2 = new AI('AI Player');
         } else {
            player1 = new Human('Player 1');
            player2 = new Human('Player 2');
         }
         loop = false;
      }
   }

   player1.name = promptForPlayerName(player1.name);    // get name for player 1
   if (player2.isHuman) {
      player2.name = promptForPlayerName(player2.name);    // get name for player 2
   }

   console.log('\n' + indentText('E100 >> Player 1:') , player1, '\n\t\tE100 >> Player 2:', player2);

}



// TODO: place individual player ships on game grid
const placeShip = () => {

}


// Prompt current player for shot using game grid coordinates
const callShot = (validShotCallback) => {
   let shot = '';
   let loop = true;
   while (loop) {
      shot = promptFor('Enter Shot (ex. F4, A1): ').toUpperCase();
      if (shot.length === 2 && validShotCallback(shot)) {
         console.log(shot);
         loop = false;
      }
   }
}


// Check if player entered valid shot coordinates
const isValidShotCoords = (shotCoords) => {
   let gridRows = 'A B C D E F G H I J K L M N O P Q R S T'.split(' ');
   let gridCols = 20;
   let rowValue = shotCoords[0];
   let colValue = parseInt(shotCoords[1]);

   if (gridRows.includes(rowValue) && (colValue >= 1 && colValue <= gridCols)) {
      return true;
   }
   return false;  // return boolean
}



// TODO: convert shot coordinates into game grid coordinates
const convertShotCoords = (shotCoords) => {  // 
   return 
}


// TODO: check if player shot was a hit on opponent's game grid
const checkForHit = () => {

}


// TODO: mark shot as hit on opponent's game grid
const markHit = () => {


}


// TODO: mark shot as miss on opponent's game grid
const markMiss = () => {

}

// TODO: display current game statistics (i.e, hits, misses, ships sunk, ships damaged, etc)
const displayGameStats = () => {

}

// TODO: Check for game winner after each shot inwhich there was a hit.
const checkForWinner = () => {

}


// TODO: show relavent event message after each shot whether hit, missed, ship sunk or damaged
const showCommentary = () => {

}


// TODO: show game grid for selected player
const showGameGrid = () => {

}


// TODO: hide game grid for selected player
const hideGameGrid = () => {

}


// TODO: build game grid with relavent markings and status indicators
const buildGameGrid = () => {

}

// TODO: randomly place ships on game grid.
const randPlaceShips = () => {

}



// TODO: check if ship has been sunk
const checkShipSunk = () => {

}


/********************************
 *  run code
 */
//callShot(isValidShotCoords);     // call shot and validate player selection is valid
runApplication()