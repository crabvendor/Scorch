export class BulletController{
    constructor(bulletObject){
        this.bullet = bulletObject;      
    }

    moveBullet() {
        let bulletElem = document.getElementsByClassName("bullet")[0];
        let angle = this.bullet.getAngle();
        let power = this.bullet.getPower();
        let trajectory = this.calulateTrajectory(power, angle, this.bullet.getPos());
        let interval = setInterval((x) => {
            x = bulletElem.offsetLeft;
            bulletElem.style.display = "block";
            bulletElem.style.left = x + 10 + "px";
            if (x > 1000) {
                clearInterval(interval);
                bulletElem.parentElement.removeChild(bulletElem);
            }
        }, 20);
    }

    calulateTrajectory(power, angle, startPoint){
        let angleRad = angle * 180/Math.PI
        let gravityAcceleration = 9.8;    
        let ySpeed = Math.sin(angleRad) * power;
        let xSpeed = Math.cos(angleRad) * power;
        let xStart = startPoint.getX();
        let yStart = startPoint.getY();
        let flyTime = Math.sqrt(2*(Math.pow(ySpeed, 2)/Math.pow(gravityAcceleration, 2) + yStart/gravityAcceleration));
        let distance = flyTime * xSpeed;
    }
}
