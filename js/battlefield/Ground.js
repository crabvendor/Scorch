import { BattlefieldParams, GroundConstants } from "../Constants.js";

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
            while (y<=BattlefieldParams.HEIGHT && i<=BattlefieldParams.WITDH){
                y = 0;
                for(let k = 0; k <= splittedEquation.length -1; k++){
                    let expression = splittedEquation[k].split("*");
                    let param;
                    
                    if(expression[GroundConstants.PARAM_INDEX].includes("(")){
                        
                        let value = expression[GroundConstants.PARAM_INDEX].substring(2, expression[GroundConstants.PARAM_INDEX].length -1);

                        param = -parseFloat(value);

                    } else{
                        param = parseFloat(expression[GroundConstants.PARAM_INDEX]);
                    }

                    if (expression[GroundConstants.X_INDEX] == "x"){
                        y += this.calculatePosition(param, GroundConstants.TO_POWER_ONE, i)
                        
                    } else if(expression.length == GroundConstants.SINGLE_CHAR){
                        y += param;
                    } else if (expression[GroundConstants.SECOND_ARRAY].includes("^")){
                        let xExpr = SECOND_ARRAY.split("^");
                        let power = xExpr[GroundConstants.SECOND_CHAR];
                        y += this.calculatePosition(param, power, i)
                    }

                }
                this.cordsArray.push([i,y]);
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