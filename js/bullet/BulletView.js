export class BulletView{

    constructor(bulletController){
        this.controller = bulletController;
        this.element = this.createBulletElement();
    }

    render() {
        let positionLeft = bulletController.getPos().getX();
        let positionTop = bulletController.getPos().getY();
        return `<div class="bullet" style="left: ${positionLeft}px; top: ${positionTop}px;">
                </div>`;
    }

    createBulletElement() {
        let elem = document.createElement('template');
        elem.innerHTML = this.render().trim();
        return elem.content.firstChild;
    }

}