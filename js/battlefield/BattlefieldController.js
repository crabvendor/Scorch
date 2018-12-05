import {KeyCodes} from "../Constants.js";

export class BattlefieldController {

    constructor(battlefield) {
        this.battlefield = battlefield;
        this.currentTankId = 0;
        this.currentTank = this.battlefield.getTanks()[this.currentTankId].getController();
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
                this.bullet = this.currentTank.createBullet();
                if (this.bullet){
                resolve((this.bullet.getController().moveBullet()
                ));
                } else{
                reject(alert("dupa"))
                }
            });
            
        }
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

