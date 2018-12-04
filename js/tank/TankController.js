import { Tank } from "./Tank";

export class TankController {
    constructor(name, position) {
        this.tank = this.createTank(name, position);
    }

    createTank(name, position) {
        let tank = new Tank(name, position);
        return tank;
    }

    shoot() {
    }
}
