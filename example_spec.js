// spec.js
describe('Calculator Functions Testing', function() {
    it('should add two numbers', function() {
        browser.get('http://juliemr.github.io/protractor-demo/');

        element(by.model('first')).sendKeys(4);
        element(by.model('second')).sendKeys(8);

        element(by.id('gobutton')).click();

        expect(element(by.binding('latest')).getText()).toEqual('12');

        //expect(browser.getTitle()).toEqual('Super Calculator');
    });

    it('should multiple two numbers', function() {
        browser.get('http://juliemr.github.io/protractor-demo/');

        element(by.model('first')).sendKeys(4);
        element(by.model('second')).sendKeys(8);

        element(by.cssContainingText('option', '*')).click();

        element(by.id('gobutton')).click();

        expect(element(by.binding('latest')).getText()).toEqual('32');

        //expect(browser.getTitle()).toEqual('Super Calculator');
    });

});