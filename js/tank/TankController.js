import { Bullet } from "../bullet/Bullet";
import { BulletController } from "../bullet/BulletController";

export class TankController {
    constructor(tank) {
        this.tank = tank;
    }

    shoot(e) {
        let bullet = new Bullet(this.tank);
        let bulletController = new BulletController(bullet);
        let bulletView = new bulletView(bulletController);
        bulletController.moveBullet();
    }
}
