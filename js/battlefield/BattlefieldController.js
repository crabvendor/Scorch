import {KeyCodes, BulletParams, TankParams} from "../Constants.js";
import { Position } from "../position/Position.js";

export class BattlefieldController {
    
    constructor(battlefield) {
        this.battlefield = battlefield;
        this.currentTankId = 0;
        this.currentTank = this.battlefield.getTanks()[this.currentTankId].getController();
        this.bulletView;
        this.tankViewList = this.battlefield.getTanks();
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
                reject(alert("Something went awry"))
                }
            });
            getBullet.then(
                result => this.currentTank.getTank().setPos(new Position(this.currentTank.getTank().getxStart(), this.currentTank.getTank().getyStart()))
            );
        }

    }

    async moveAndTrackBullet(){
        let hitSomething = this.bulletView.getController().moveBullet();
        let hitTank = false;
        do{ 
            
            let currentPos = this.bulletView.getController().getBullet().getPos();
            hitSomething.then(
                result => hitSomething = result
            );
            //console.log(currentPos.getX())
            //console.log(currentPos.getY())
            for (let i = 0; i<= this.tankViewList.length - 1; i++){
                let tank = this.tankViewList[i].getController().getTank();
                let tankElem = document.getElementById(tank.getName());
                let tankPos = tank.getPos();
                hitTank = this.isCollide(currentPos, tankPos);

                if (hitTank){
                    console.log(currentPos.getX() + " " + currentPos.getY());
                    console.log(tankPos.getX() + " " + tankPos.getY());  
                    console.log(tank.getName())    
                }
            }
            
            
            await this.sleep(20);
        }while(hitSomething)
        
        
    }

    isCollide(bulletPos, tankPos) {
        return !(
            ((bulletPos.getY() + BulletParams.HEIGHT) < (tankPos.getY())) ||
            (bulletPos.getY() > (tankPos.getY() + TankParams.HEIGHT)) ||
            ((bulletPos.getX() + BulletParams.WITDH) < tankPos.getX()) ||
            (bulletPos.getX() > (tankPos.getX() + TankParams.WITDH))
        );
    }


    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

