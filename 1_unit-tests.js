const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
    
    test('convertHandler should correctly read a whole number input', function(done) {
        let input = '32L';
        assert.equal(convertHandler.getNum(input), 32);
        done();
    });

    
    test('convertHandler should correctly read a decimal number input', function(done) {
        let input = '32.5L';
        assert.equal(convertHandler.getNum(input), 32.5);
        done();
    });

    
    test('convertHandler should correctly read a fractional input', function(done) {
        let input = '1/2L';
        assert.equal(convertHandler.getNum(input), 0.5);
        done();
    });

    
    test('convertHandler should correctly read a fractional input with a decimal', function(done) {
        let input = '5.5/2L';
        assert.equal(convertHandler.getNum(input), 2.75);
        done();
    });

   
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', function(done) {
        let input = '3/2/3L';
        assert.equal(convertHandler.getNum(input), 'invalid number');
        done();
    });

    
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function(done) {
        let input = 'L';
        assert.equal(convertHandler.getNum(input), 1);
        done();
    });

   
    test('convertHandler should correctly read each valid input unit', function(done) {
        var input =['gal', 'l', 'km', 'mi', 'lbs', 'kg'];
        var output =['gal', 'L', 'km', 'mi', 'lbs', 'kg'];
        input.forEach(function(ele, i) {
            assert.equal(convertHandler.getUnit(input[i]), output[i]);
        });
        done();
    });

    
    test('convertHandler should correctly return an error for an invalid input unit', function(done) {
        let input = '34kilograms';
        assert.equal(convertHandler.getUnit(input), 'invalid unit');
        done();
    });

   
    test('convertHandler should return the correct return unit for each valid input unit', function(done) {
        var input =['gal', 'l', 'km', 'mi', 'lbs', 'kg'];
        var expect =['L', 'gal', 'mi', 'km', 'kg', 'lbs'];
        input.forEach(function(ele, i) {
            assert.equal(convertHandler.getReturnUnit(input[i]), expect[i]);
        });
        done();
    });

   
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function(done) {
        var input =['gal', 'l', 'km', 'mi', 'lbs', 'kg'];
        var expect =['gallons', 'liters', 'kilometers', 'miles', 'pounds', 'kilograms'];
        input.forEach(function(ele, i) {
            assert.equal(convertHandler.spellOutUnit(input[i]), expect[i]);
        });
        done();
    });

   
    test('convertHandler should correctly convert gal to L', function(done) {
        let input = [5, 'gal'];
        let expected = 18.9271;
        assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); 
        done();
    });

    
    test('convertHandler should correctly convert L to gal', function(done) {
        let input = [5, 'L'];
        let expected = 1.32086;
        assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); 
        done();
    });

   
    test('convertHandler should correctly convert mi to km', function(done) {
        let input = [5, 'mi'];
        let expected = 8.0467;
        assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); 
        done();
    });

    
    test('convertHandler should correctly convert km to mi', function(done) {
        let input = [5, 'km'];
        let expected = 3.10686;
        assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); 
        done();
    });

    
    test('convertHandler should correctly convert lbs to kg', function(done) {
        let input = [5, 'lbs'];
        let expected = 2.26796;
        assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); 
        done();
    });

    
    test('convertHandler should correctly convert kg to lbs', function(done) {
        let input = [5, 'kg'];
        let expected = 11.0231;
        assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); 
        done();
    });
});