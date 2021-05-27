"use strict";

const { promptFor, pressReturn, cenText } = require('./helper');

// TODO: get player name from user input
const getPlayerInfo = () => {


}


// TODO: place individual player ships on game grid
const placeShip = () => {

}


// prompt current player for shot using game grid coordinates
const callShot = (validShotCallback) => {
   let shot = '';
   let loop = true;
   while (loop) {
      shot = promptFor('Enter Shot (ex. F4, A1): ').toUpperCase();
      if (shot.length === 2 && validShotCallback(shot) ) {
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

callShot(isValidShotCoords);     // call shot and validate player selection is valid