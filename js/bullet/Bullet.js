export class Bullet{
 constructor(tank, shotParameters){
    this.tank = tank;
    this.pos = tank.getPos();
    this.angle = shotParameters.getAngle();
    this.power = shotParameters.getShotPower();
 }
    getPos(){
        return this.pos;
    }

    setPos(position){
        this.pos = position;
    }

    getShotAngle(){
        return this.angle;
    }

    getShotPower(){
        return this.power;
    }
}