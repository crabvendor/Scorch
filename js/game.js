"use-strict";

import {TankController} from "./tank/TankController.js";
import {Position} from "./position/Position.js";
import {TankView} from "./tank/TankView.js";
import {Tank} from "./tank/Tank.js"; 
import {Battlefield} from "./battlefield/Battlefield.js";
import {BattlefieldController} from "./battlefield/BattlefieldController.js";
import {BattlefieldView} from "./battlefield/BattlefieldView.js";


export const gravityAcceleration = 9.8;

export const KeyCodes = {
    LEFT:   37,
    UP:     38,
    RIGHT:  39,
    DOWN:   40
  };

let tankPosition = new Position(0,0);
let tank = new Tank("franek", tankPosition);
let franekControler = new TankController(tank);
let franekView = new TankView(franekControler);

let tank2Position = new Position(180,0);
let tank2 = new Tank("bob", tank2Position);
let tank2Controler = new TankController(tank2);
let tank2View = new TankView(tank2Controler);

let newBattlefield = new Battlefield([franekControler, tank2Controler]);
let battlefieldController = new BattlefieldController(newBattlefield);
let battlefieldView = new BattlefieldView(battlefieldController);

document.body.appendChild(battlefieldView.battlefieldElement);
document.getElementById("battlefield").appendChild(franekView.tankElement);
document.getElementById("battlefield").appendChild(tank2View.tankElement);
document.getElementById("battlefield-interface").appendChild(battlefieldView.battlefieldInterfaceElement);

function renderInterface() {
    document.getElementById("top-bar").remove();
    document.getElementById("battlefield-interface").appendChild(battlefieldView.battlefieldInterfaceElement);
}

document.addEventListener("click", renderInterface);