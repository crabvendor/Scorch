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
    DOWN:   40,
    ENTER: 13,
  };

let tankViewList = new Array()


addTank(0, 0, "bob")

addTank(180, 0, "franek");


let battlefieldView = createBattlefield();


document.body.appendChild(battlefieldView.battlefieldElement);

for (let i = 0; i <= tankViewList.length; i++ ){
    console.log(tankViewList[i].tankElement);
    
    document.getElementById("battlefield").appendChild(tankViewList[i].tankElement);
}

document.getElementById("battlefield-interface").appendChild(battlefieldView.battlefieldInterfaceElement);

function renderInterface(e) {
    document.getElementById("top-bar").remove();
    document.getElementById("battlefield-interface").appendChild(battlefieldView.battlefieldInterfaceElement);
}

function addTank(xPos, Ypos, name){
    let tankPosition = new Position(xPos, Ypos);
    let tank = new Tank(name, tankPosition);
    let tankController = new TankController(tank);
    let tankView = new TankView(tankController)
    tankViewList.push(tankView);
}

function createBattlefield(){
    let newBattlefield = new Battlefield(tankViewList);
    let battlefieldController = new BattlefieldController(newBattlefield);
    let battlefieldView = new BattlefieldView(battlefieldController);
    return battlefieldView;
}


document.addEventListener("keydown", renderInterface);
