export class Battlefield {
    
    constructor(tankControllers) {
        this.tankControllers = tankControllers;
    }

    getTanks() {
        return this.tankControllers;
    }
}
