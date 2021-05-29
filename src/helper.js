const prompt = require('prompt-sync')();
const chalk = require('chalk');


const appTitle = 'BATTLESHIP';

// ui color definitions
const colorBanner = chalk.black.bgWhite;
const colorPrimary = chalk.white;
const colorPrimaryHighlight = chalk.black.bgWhite;
const colorSecondary = chalk.green;
const colorSecondaryHighlight = chalk.black.bgGreen;
const colorInline = chalk.white;
const colorHitShot = chalk.black.bgRed;
const colorMissShot = chalk.black.bgWhite;
const colorShipNode = chalk.black.bgGreen;



// wait for user to press return to continue
function pressReturn(msg = 'Press RETURN...') {
   prompt(`\n\t\t${msg}`);
}


// prompt for standard data entry
function promptFor(label) {
   return prompt(`${label}`);
}


// prompt for gesture entry
function promptGesture(label) {
   return prompt(`\t\t${label}`, { echo: '*' });
}

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


function cenText(text, width = 50) {
   let padding = 0;
   if (text.length <= width) {
      padding = (width - text.length) / 2;
      return ' '.repeat(padding) + text + ' '.repeat(padding)
   }
   return text;   // omit text centering
}


function indentText(text) {
   return (`\t\t${text}`);
}

async function wait(msg='', secs=3) {
   await new Promise(r => setTimeout(r, secs * 1000));
   console.log(msg);
}


// application banner
function appBanner(appTitle) {
   console.clear();
   console.log(colorBanner('\n\n\n\t\t' + ' '.repeat(46)));
   console.log(colorBanner('\t\t' + ' '.repeat(46)));
   console.log(colorBanner('\t\t' + cenText(appTitle, 46)));
   console.log(colorBanner('\t\t' + ' '.repeat(46)));
   console.log(colorBanner('\t\t' + ' '.repeat(46)));

}

function playGameBanner() {
   appBanner(appTitle);
   console.log(colorPrimary('\n\n\t\t' + cenText('*** PLAY GAME ***\n', 46)));

}

function setupGameBanner() {
   appBanner(appTitle);
   console.log(colorPrimary('\n\n\t\t' + cenText('*** GAME SETUP ***\n', 48)));

}


module.exports.cenText = cenText;
module.exports.indentText = indentText;
module.exports.promptGesture = promptGesture;
module.exports.promptFor = promptFor;
module.exports.promptForPlayerName = promptForPlayerName;
module.exports.pressReturn = pressReturn;
module.exports.appBanner = appBanner;
module.exports.playGameBanner = playGameBanner;
module.exports.setupGameBanner = setupGameBanner;
module.exports.wait = wait;
module.exports.appTitle = appTitle;
module.exports.colorBanner = colorBanner;
module.exports.colorPrimary = colorPrimary;
module.exports.colorPrimaryHighlight = colorPrimaryHighlight;
module.exports.colorSecondary = colorSecondary;
module.exports.colorSecondaryHighlight = colorSecondaryHighlight;
module.exports.colorInline = colorInline;
module.exports.colorShipNode = colorShipNode;
module.exports.colorHitShot = colorHitShot;
module.exports.colorMissShot = colorMissShot;
