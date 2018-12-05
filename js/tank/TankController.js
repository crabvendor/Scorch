import {Bullet} from "../bullet/Bullet.js";
import {BulletView} from "../bullet/BulletView.js";
import {BulletController} from "../bullet/BulletController.js";
import { ShotParameter } from "./ShotParameter.js";
import { KeyCodes} from "../game.js";

export class TankController {
    constructor(tank) {
        this.tank = tank;
        this.shotParams = new ShotParameter(45,50);
    }

    changeShotParams(e){
        if (event.keyCode == KeyCodes.right){
            this.shotParams.incrementPower();
        }
        if (event.keyCode == KeyCodes.UP){
            this.shotParams.incrementAngle();
        }

        console.log(this.shotParams.getAngle() + "   " + this.shotParams.getPower);
    } 

    shoot(e) {
        let bullet = new Bullet(this.tank, this.shotParams);
        let bulletController = new BulletController(bullet);
        let bulletView = new BulletView(bulletController);
        document.getElementById(`${this.tank.getName()}`).appendChild(bulletView.element);
        bulletController.moveBullet();
    }
}
    