export class BattlefieldController {

    constructor(battlefield) {
        this.battlefield = battlefield;
        this.currentTankId = 0;
        this.currentTank = this.battlefield.getTanks()[this.currentTankId].getController();
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
        console.log(this.currentTankId);
    }
}
