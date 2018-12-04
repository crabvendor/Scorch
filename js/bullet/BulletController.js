export class BulletController{
    constructor(bullet){
        this.bullet = bullet;      
    }

    moveBullet() {
        let x = this.bullet.offsetLeft;
        let interval = setInterval((x) => {
            x = this.bullet.offsetLeft;
            this.bullet.style.display = "block";
            this.bullet.style.left = x + 10 + "px";
            if (x > 1000) {
                clearInterval(interval);
                hideBullet();
            }
        }, 20);
    }
    


    hideBullet() {
        this.bullet.style.display = "none";
    }

    }