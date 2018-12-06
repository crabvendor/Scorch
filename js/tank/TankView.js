export class TankView {
    constructor(tankController) {
        this.tankController = tankController;
        this.tankElement = this.createTankElement();
    }

    render() {
        let name = this.tankController.tank.getName();
        let positionLeft = this.tankController.tank.getPos().getX();

        let color = document.getElementById("color");;
        return `
        <div class=${color} id="${name}" style="left: ${positionLeft}px; top: calc(100% - 40px)"></div>

        let positionTop = this.tankController.tank.getPos().getY();
        `
    }

    createTankElement() {
        let elem = document.createElement('template');
        elem.innerHTML = this.render().trim();
        return elem.content.firstChild;
    }

    getController(){
        return this.tankController;
    }

}
