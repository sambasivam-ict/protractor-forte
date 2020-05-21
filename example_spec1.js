/**
 * Created by sambu on 19-01-2016.
 */
describe('Protractor Demo App for multiple testcases', function() {

    var firstNumber = element(by.model('first'));
    var secondNumber = element(by.model('second'));
    var resultButton = element(by.id('gobutton'));

    var latestCalc = element(by.binding('latest'));

    beforeEach(function() {
        browser.get('http://juliemr.github.io/protractor-demo/');
    });

    it('should add two numbers', function() {

        firstNumber.sendKeys(3);
        secondNumber.sendKeys(-3);

        resultButton.click();


        expect(latestCalc.getText()).toEqual('0');

        //expect(browser.getTitle()).toEqual('Super Calculator');
    });

    it('should multiply two numbers', function() {

        firstNumber.sendKeys(3);
        secondNumber.sendKeys(-3);

        element(by.cssContainingText('option', '*')).click();

        resultButton.click();


        expect(latestCalc.getText()).toEqual('-9');

        //expect(browser.getTitle()).toEqual('Super Calculator');
    });

});