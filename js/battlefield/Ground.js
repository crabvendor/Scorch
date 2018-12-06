import { BattlefieldParams } from "../Constants.js";

export class Ground{
    constructor(equation){
        this.equation = equation;
        this.cordsArray = new Array();
        this.parseEquation();
        
    }

    parseEquation(){
            let i = 0;
            let splittedEquation = this.equation.split("+");
            let y = 0;
            while (i<=BattlefieldParams.WITDH){
                for(let k = 0; k <= splittedEquation.length -1; k++){
                    let expression = splittedEquation[k].split("*"); 
                    let param = parseFloat(expression[0]);
                    if (expression[1] == "x"){
                        y += this.calculatePosition(param, 1, 1)
                    } else if(expression.length == 1){
                        y += param, 10;
                    } else {
                        let xExpr = expression[1].split("^");
                        let power = xExpr[1];
                        y += this.calculatePosition(param, power, i)
                    }

                }
                this.cordsArray.push([i,y]);
                console.log(i + " " + y);
                i++;
            }
            
    }

    calculatePosition(param, power, i){
        return param * Math.pow(i, power);
    }

    getCordsArray(){
        return this.cordsArray;
    }
}