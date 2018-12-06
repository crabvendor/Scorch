import {KeyCodes, BulletParams, TankParams, BattlefieldParams} from "../Constants.js";
import { Position } from "../position/Position.js";

export class BattlefieldController {
    
    constructor(battlefield, groundCords) {
        this.battlefield = battlefield;
        this.currentTankId = 0;
        this.currentTank = this.battlefield.getTanks()[this.currentTankId].getController();
        this.bulletView;
        this.tankViewList = this.battlefield.getTanks();
        this.buttonNotPressed = true;
        this.groundCords = groundCords;

    }

    getCurrentTank() {
        return this.currentTank;
    }

    nextTurn() {
        this.currentTankId++;
        if (this.currentTankId >= this.battlefield.getTanks().length) {
            this.currentTankId = 0;
        }
        this.currentTank = this.battlefield.getTanks()[this.currentTankId].getController();
    }

    shoot(e) {
        if(e.keyCode == KeyCodes.ENTER && this.buttonNotPressed ) {
            this.buttonNotPressed = false;
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
            ).then(
                result => this.nextTurn()
            ).then(
                result => this.buttonNotPressed = !result
            );
        }

    }

    async moveAndTrackBullet(){
        let hitSomething = this.bulletView.getController().moveBullet();
        let hitTank = false;
        let hitGround = false;
        do{ 
            
            let currentPos = this.bulletView.getController().getBullet().getPos();
            
            hitSomething.then(
                result => hitSomething = result
            );
            for (let i = 0; i<= this.tankViewList.length - 1; i++){
                let tank = this.tankViewList[i].getController().getTank();
                let tankElem = document.getElementById(tank.getName());
                let tankPos = tank.getPos();
                hitTank = this.isCollideTank(currentPos, tankPos);

                if (hitTank){
                    hitSomething = !hitTank;
                    tankElem.parentNode.removeChild(tankElem);
                    let bulletElem = document.getElementsByClassName("bullet")[0];
                    bulletElem.parentNode.removeChild(bulletElem);
                    this.tankViewList.splice(i, 1)         
                    break;    
                }
            }
            
            let currentX = parseInt(currentPos.getX());
            let xCord = this.groundCords[currentX][0];
            let yCord = this.groundCords[currentX][1];
            let mapPos = new Position(xCord, yCord);
            hitGround = this.isCollideGround(currentPos, mapPos)
            
            if(hitGround){
                hitSomething = !hitGround;
                let bulletElem = document.getElementsByClassName("bullet")[0];
                bulletElem.parentNode.removeChild(bulletElem);
            }
          await this.sleep(20);
        }while(hitSomething)
        
        
    }

    isCollideTank(bulletPos, tankPos) {
        return !(
            ((bulletPos.getY() + BulletParams.HEIGHT) < (tankPos.getY())) ||
            (bulletPos.getY() > (tankPos.getY() + TankParams.HEIGHT)) ||
            ((bulletPos.getX() + BulletParams.WITDH) < tankPos.getX()) ||
            (bulletPos.getX() > (tankPos.getX() + TankParams.WITDH))
        );
    }

    isCollideGround(bulletPos, mapPos) {
        return !(
            ((bulletPos.getY() + BulletParams.HEIGHT) < (mapPos.getY())) ||
            (bulletPos.getY() > (mapPos.getY() + BattlefieldParams.HEIGHT)) ||
            ((bulletPos.getX() + BulletParams.WITDH) < mapPos.getX()) ||
            (bulletPos.getX() > (mapPos.getX() + BattlefieldParams.WITDH))
        );
    }


    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

