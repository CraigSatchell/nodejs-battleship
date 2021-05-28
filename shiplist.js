"use strict";

const shipList1 = "USS Arleigh Burke,USS Arlington,USS Asheville,USS Ashland,USS Blue Ridge,USS Boise,USS Boxer,USS Bulkeley,USS Bunker Hill,USS Chancellorsville,USS Decatur,USS Delaware,USS Delbert D. Black,USS Detroit,USS Dwight D. Eisenhower,USS Emory S. Land,USS Essex,USS Farragut,USS Firebolt,USS Fitzgerald,USS Florida,USS Gabrielle Giffords,USS George Washington,USS John S. McCain,USS John Warner,USS Kansas City,USS Kearsarge,USS Lewis B. Puller,USS Leyte Gulf,USS Little Rock,USS Louisiana,USS Mahan,USS Maine,USS Makin Island,USS Manchester,USS Maryland,USS Mason,USS McCampbell,USS New York,USS Newport News,USS Nimitz,USS Nitze,USS Normandy,USS North Carolina,USS Pinckney,USS Pioneer,USS Port Royal,USS Porter,USS Portland,USS Preble,USS Roosevelt,USS San Jacinto,USS San Juan,USS Santa Fe,USS Tempest,USS Tennessee,USS Texas,USS The Sullivans,USS Vicksburg,USS Virginia,USS Warrior,USS Washington,USS Wasp,USS Wayne E. Meyer,USS Whirlwind";

const shipList2 = "USS Abraham Lincoln,USS Alabama,USS Annapolis,USS Antietam,USS Anzio,USS California,USS Cape St. George,USS Carl Vinson,USS Carney,USS Carter Hall,USS Chafee,USS Gunston Hall,USS Halsey,USS Hampton,USS Harpers Ferry,USS Higgins,USS Hopper,USS McFaul,USS Minnesota,USS Monsoon,USS Nebraska,USS Nevada,USS New Hampshire,USS New Mexico,USS New Orleans,USS North Dakota,USS O'Kane,USS Oak Hill,USS Oakland,USS Ohio,USS Oklahoma City,USS Omaha,USS Oscar Austin,USS Pasadena,USS Patriot,USS Pennsylvania,USS Philippine Sea,USS Ross,USS Rushmore,USS Russell,USS Sampson,USS San Antonio,USS San Diego,USS Theodore Roosevelt,USS Thomas Hudner,USS Vella Gulf,USS Vermont,USS Howard,USS Hue City,USS Hurricane,USS Illinois,USS Independence,USS Jackson,USS John Finn,USS John P. Murtha,USS John Paul Jones,USS George H.W. Bush,USS Green Bay,USS Greeneville,USS Gridley,USS William P. Lawrence,USS Winston S. Churchill,USS Zumwalt";


const randShipName = (shipList) => {

   const ships = shipList.split(',');
   let index = Math.floor(Math.random() * ships.length);
   return ships[index]; // random ship name
}

console.log(randShipName(shipList1));