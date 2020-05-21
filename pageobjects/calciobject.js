/**
 * Created by sambu on 19-01-2016.
 */

var CalculatePage = function() {
    this.firstNumber = element(by.model('first'));
    this.secondNumber = element(by.model('second'));
    this.operation = element(by.id('gobutton'));

    this.operationName = element(by.cssContainingText('option', '+'));

    this.result = element(by.binding('latest'));

    this.expectedResult = '';


    this.enterFirstNumber = function(number1) {
        this.firstNumber.sendKeys(number1);
    };

    this.enterSecondNumber = function(number2) {
        this.secondNumber.sendKeys(number2);
    };


    this.addNumbers = function() {
        this.operation.click();
        this.expectedResult = this.result.getText();
    };

    this.getResult = function() {

        return this.expectedResult;
    }

    this.chooseOperation = function(opName) {

        this.operationName = element(by.cssContainingText('option', opName));
        this.operationName.click();
    }

    this.performOperation = function() {
        this.operation.click();
        this.expectedResult = this.result.getText();
    };

};
module.exports = CalculatePage;