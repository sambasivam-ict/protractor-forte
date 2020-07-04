var CreateLTLQuoteForExternalCustomer = function () {
    this.setDataInObject = function (testData, customerViewForm) {
      console.log('customerviewForm 1', customerViewForm, testData);
      customerViewForm.setOrginzipcode(testData.Originzipcode);
      customerViewForm.setDestinationzipcode(testData.Destinationzipcode);
      customerViewForm.setClass(testData.Class);
      customerViewForm.setWeight(testData.Weight);
      customerViewForm.setCarrier(testData.Carrier);
    };
  
    this.createLtlQuoteCreationForExternalCustomer = function (browser, customerViewForm) {
      browser.sleep(2000);
      customerViewForm.enterOrginZipcode();
      customerViewForm.enterdestinationzipcode();
  
      customerViewForm.enterClass();
      browser.sleep(3000);
      customerViewForm.enterWeight();
      browser.sleep(3000);
  
      customerViewForm.clickAddBtn();
  
      browser.sleep(10000);
      customerViewForm.selectCarrier();
      browser.sleep(2000);

    };
  };
  
  module.exports = CreateLTLQuoteForExternalCustomer;
  