import {KeyCodes} from "../Constants.js";
import { Position } from "../position/Position.js";

export class BattlefieldController {
    
    constructor(battlefield) {
        this.battlefield = battlefield;
        this.currentTankId = 0;
        this.currentTank = this.battlefield.getTanks()[this.currentTankId].getController();
        this.bulletView;
    }

    getCurrentTank() {
        return this.currentTank;
    }

    nextTurn(e) {
        if (e.keyCode == KeyCodes.ENTER) {
            this.currentTankId++;
            if (this.currentTankId >= this.battlefield.getTanks().length) {
                this.currentTankId = 0;
            }
            this.currentTank = this.battlefield.getTanks()[this.currentTankId].getController();
        }
    }

    shoot(e) {
        if(e.keyCode == KeyCodes.ENTER) {
            const getBullet = new Promise((resolve, reject) => {
                this.bulletView = this.currentTank.createBullet();
                if (this.bulletView){
                resolve((this.moveAndTrackBullet()
                ));
                } else{
                reject(alert("dupa"))
                }
            });
            getBullet.then(
                result => this.currentTank.getTank().setPos(this.currentTank.getTank())
            );
        }
        
    }

    moveAndTrackBullet(){
        this.bulletView.getController().moveBullet();
        let counter = 0;
        do{ 
            console.log(this.currentTank.getTank().getPos());
            counter++;
        }while(counter < 100)
        
        
    }

    isCollide(a, b) {
        return !(
            ((a.y + a.height) < (b.y)) ||
            (a.y > (b.y + b.height)) ||
            ((a.x + a.width) < b.x) ||
            (a.x > (b.x + b.width))
        );
    }
}

