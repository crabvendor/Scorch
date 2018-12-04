import { Tank } from "./Tank";

export class TankController {
    constructor() {
    }
    
    createTank(name, position) {
        let tank = new Tank(name, position);
        return tank;
    }

    shoot() {
    }
}
