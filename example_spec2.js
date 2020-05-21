/**
 * Created by sambu on 19-01-2016. Demonstration of PageObject pattern.
 */

var calculatePageObject = require('./pageobjects/calciobject');
describe('Protractor Demo App for multiple testcases', function() {

    var firstNumber = element(by.model('first'));
    var secondNumber = element(by.model('second'));
    var operationName = element(by.id('gobutton'));

    var latestCalc = element(by.binding('latest'));

    beforeAll(function() {
        browser.get('http://juliemr.github.io/protractor-demo/');
    });

    it('should add two numbers', function() {

        var calcPageObj = new calculatePageObject();

        calcPageObj.enterFirstNumber(10);
        calcPageObj.enterSecondNumber(14);

        //firstNumber.sendKeys(3);
        //secondNumber.sendKeys(-3);

        //operationName.click();
        calcPageObj.addNumbers();


        //expect(latestCalc.getText()).toEqual('24');
        expect("24").toEqual(calcPageObj.getResult());

        //expect(browser.getTitle()).toEqual('Super Calculator');
    });

    it('should multiply two numbers', function() {

        firstNumber.sendKeys(3);
        secondNumber.sendKeys(-3);

        element(by.cssContainingText('option', '*')).click();


        operationName.click();


        expect(latestCalc.getText()).toEqual('-9');

        //expect(browser.getTitle()).toEqual('Super Calculator');
    });

    it('should divide two numbers', function() {

        var calcPageObj = new calculatePageObject();

        calcPageObj.enterFirstNumber(20);
        calcPageObj.enterSecondNumber(10);

        calcPageObj.chooseOperation('/');

        calcPageObj.performOperation();

        expect(latestCalc.getText()).toEqual(calcPageObj.getResult());


    });

});