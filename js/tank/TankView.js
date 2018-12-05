export class TankView {
    constructor(tankController) {
        this.tankController = tankController;
        this.tankElement = this.createTankElement();
        this.registerEventListeners();
    }

    render() {
        let name = this.tankController.tank.getName();
        let positionLeft = this.tankController.tank.getPos().getX();
        return `
        <div class="tank" id="${name}" style="left: ${positionLeft}px; top: 460px"></div>
        `
    }

    createTankElement() {
        let elem = document.createElement('template');
        elem.innerHTML = this.render().trim();
        return elem.content.firstChild;
    }

    registerEventListeners() {
        document.addEventListener("keydown", this.tankController.changeShotParams.bind(this.tankController));
    }

    getController(){
        return this.tankController;
    }

}
