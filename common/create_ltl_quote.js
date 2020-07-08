var CreateLTLQuote = function () {
  this.setDataInObject = function (testData, internalForm) {
    console.log('createltlQuote', testData);
    internalForm.setOrginzipcode(testData.Originzipcode);
    internalForm.setDestinationzipcode(testData.Destinationzipcode);
    internalForm.setClass(testData.Class);
    internalForm.setWeight(testData.Weight);
    //internalForm.setAccessorials(testData.accessorials);
  };

  // this.setAccessorialsValues = function (testData, internalForm) {
  //   console.log('createltlQuote set assess', testData);
  //   internalForm.setAccessorials(testData.accessorials);
  // };
  this.createLtlQuote = function (browser, internalForm) {
    internalForm.selectCompany();
    browser.sleep(2000);
    internalForm.enterOrginZipcode();
    internalForm.enterdestinationzipcode();

    internalForm.enterClass();
    browser.sleep(3000);
    internalForm.enterWeight();
    browser.sleep(3000);

    internalForm.clickAddBtn();
    browser.sleep(6000);
    // internalForm.enterAccessorials();
    // browser.sleep(4000);
    browser.sleep(4000);
  };

  this.createLtlQuoteRules = function (browser, internalForm) {
    internalForm.selectCompanyForRules();
    browser.sleep(2000);
    internalForm.enterOrginZipcode();
    internalForm.enterdestinationzipcode();

    internalForm.enterClass();
    browser.sleep(3000);
    internalForm.enterWeight();
    browser.sleep(3000);

    internalForm.clickAddBtn();

    browser.sleep(6000);
    browser.sleep(4000);
  };
};

module.exports = CreateLTLQuote;
