export class BulletController{
    constructor(bulletObject){
        this.bullet = bulletObject;      
    }

    moveBullet() {
        let bulletElem = document.getElementsByClassName("bullet")[0];
        let angle = this.bullet.getAngle();
        let power = this.bullet.getPower();
        let trajectory = this.calulateTrajectory(power, angle, this.bullet.getPos());
        let bulletElem = document.getElementById("bullet");
        let x = bulletElem.offsetLeft;
        bulletElem.style.display = "block";
        let interval = setInterval((x) => {
            x = bulletElem.offsetLeft;
            for (let i = 0; i >= trajectory.length; i ++){
                bulletElem.style.left = trajectory[i][0];
                bulletElem.style.top = trajectory[i][1];
            }
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
        
        let TrajTable = [];
        
        for (let i = 0; i<flyTime; i += 0.2){
            let yValue = yStart + ySpeed * i - gravityAcceleration/2 * Math.pow(i, 2);
            let xValue = xSpeed * i + xStart;
            TrajTable.push([xValue, yValue]);
        }


        return TrajTable;
    }
}
