"use strict";

const { promptFor, pressReturn, cenText, appBanner, appTitle } = require('./helper');
const AI = require('./classes/player/AI');
const Human = require('./classes/player/Human');


// initialize 

// Get player name from user input
const getPlayerName = () => {
   appBanner(appTitle);
   console.log('\n\n');

   let playerName = promptFor("\t\tEnter player's name: ").toUpperCase();
   return playerName;
}


// TODO: run application and game simulation
const runApplication = () => {
   let player1;
   let player2;
   let loop = true;
   while (loop) {
      appBanner(appTitle);
      console.log('\n\n');

      console.log("\t\tDo you wish to player another person or")
      let gameMode = promptFor("\t\tsolo? Enter 'P' for person or 'S' for solo: ").toUpperCase();
      if (gameMode === 'P' || gameMode === 'S') {
         if (gameMode === 'P') {
            player1 = new Human('Player 1');
            player2 = new AI('AI Player');
         } else {
            player1 = new Human('Player 1');
            player2 = new Human('Player 2');

         }
         loop = false;
      }
   }
   getPlayerName(); ////////////TODO
}


// TODO: Setup game parameters (ex. game grid, player info, solo or two player)
const setupGame = () => {


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
const isValidShotCoords = (arrShotCoords) => {
   let gridRows = 'A B C D E F G H I J K L M N O P Q R S T'.split(' ');
   let gridCols = 20;
   let rowValue = arrShotCoords[0];
   let colValue = parseInt(arrShotCoords[1]);

   if (gridRows.includes(rowValue) && (colValue >= 1 && colValue <= gridCols)) {
      return true;
   }
   return false;
}



// TODO: convert shot coordinates into game grid coordinates
const convertShotCoords = (arrShotCoords) => {   // array

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

//callShot(isValidShotCoords);     // call shot and validate player selection is valid
runApplication()