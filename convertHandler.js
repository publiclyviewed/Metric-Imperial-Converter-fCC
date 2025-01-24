'use strict';

function numberStringSplitter(input) {
    let number = input.match(/[^a-zA-Z]+/g)?.[0] || "1";
    let string = input.match(/[a-zA-Z]+/g)?.[0];
    return [number, string];
}

function checkDiv(possibleFraction) {
    let nums = possibleFraction.split("/");
    if (nums.length > 2) {
        return false; 
    }
    return nums;
}

function ConvertHandler() {
    this.getNum = function (input) {
        let result = numberStringSplitter(input)[0];
        let nums = checkDiv(result);

        if (!nums) {
            return 'invalid number'; 
        }

        let num1 = nums[0];
        let num2 = nums[1] || "1"; 

        if (isNaN(num1) || isNaN(num2)) {
            return null; 
        }

        result = parseFloat(num1) / parseFloat(num2);
        return parseFloat(result.toFixed(5)); 
    };

    this.getUnit = function (input) {
        let result = numberStringSplitter(input)[1]?.toLowerCase();
        let validUnits = ["km", "gal", "lbs", "mi", "l", "kg"];
        return validUnits.includes(result) ? (result === "l" ? "L" : result) : 'invalid unit';
    };

    this.getReturnUnit = function (initUnit) {
        const unitMapping = {
            km: "mi",
            mi: "km",
            gal: "L",
            l: "gal", 
            L: "gal",
            lbs: "kg",
            kg: "lbs"
        };
        return unitMapping[initUnit] ?? 'invalid unit';
    };
    
    

    this.spellOutUnit = function (unit) {
        const spellOutMapping = {
            km: "kilometers",
            mi: "miles",
            gal: "gallons",
            l: "liters", 
            L: "liters",
            lbs: "pounds",
            kg: "kilograms"
        };
        return spellOutMapping[unit] ?? 'invalid unit';
    };
    
    

    this.convert = function (initNum, initUnit) {
        const conversionRates = {
            galToL: 3.78541,
            lbsToKg: 0.453592,
            miToKm: 1.60934
        };

        let result;
        switch (initUnit) {
            case "gal": result = initNum * conversionRates.galToL; break;
            case "L": result = initNum / conversionRates.galToL; break;
            case "lbs": result = initNum * conversionRates.lbsToKg; break;
            case "kg": result = initNum / conversionRates.lbsToKg; break;
            case "mi": result = initNum * conversionRates.miToKm; break;
            case "km": result = initNum / conversionRates.miToKm; break;
            default: result = null;
        }

        return result !== null ? parseFloat(result.toFixed(5)) : null;
    };

    this.getString = function (initNum, initUnit, returnNum, returnUnit) {
        return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    };
}

module.exports = ConvertHandler;