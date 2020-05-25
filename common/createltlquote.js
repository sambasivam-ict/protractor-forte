//import internalForm from "../pageobjects/InternalViewForm";

var CreateLTLQuote = function () {
  this.setDataInObject = function (testData, internalForm) {
    internalForm.setOrginzipcode(testData.Originzipcode);
    internalForm.setDestinationzipcode(testData.Destinationzipcode);
    internalForm.setClass(testData.Class);
    internalForm.setWeight(testData.Weight);
  };

  this.createLtlQuote = function (browser, internalForm) {
    internalForm.selectCompany();
    browser.sleep(2000);
    internalForm.enterOrginZipcode();
    internalForm.enterdestinationzipcode();

    internalForm.enterClass();
    browser.sleep(2000);
    internalForm.enterWeight();
    browser.sleep(3000);

    internalForm.clickAddBtn();

    browser.sleep(3000);
  };
};
module.exports = CreateLTLQuote;
