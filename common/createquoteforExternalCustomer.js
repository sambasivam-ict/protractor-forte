//import internalForm from "../pageobjects/InternalViewForm";

var CreateLTLQuoteForExternalCustomer = function () {
    this.setDataInObject = function (testData, customerViewForm) {
      console.log('customerviewForm 1', customerViewForm, testData);
      customerViewForm.setOrginzipcode(testData.Originzipcode);
      customerViewForm.setDestinationzipcode(testData.Destinationzipcode);
      customerViewForm.setClass(testData.Class);
      customerViewForm.setWeight(testData.Weight);
      customerViewForm.setCarrier(testData.Carrier);
    };
  
    // this.createLtlQuote = function (browser, internalForm) {
    //   internalForm.selectCompany();
    //   browser.sleep(2000);
    //   internalForm.enterOrginZipcode();
    //   internalForm.enterdestinationzipcode();
  
    //   internalForm.enterClass();
    //   browser.sleep(2000);
    //   internalForm.enterWeight();
    //   browser.sleep(3000);
  
    //   internalForm.clickAddBtn();
  
    //   browser.sleep(3000);
    // };
  
    this.createLtlQuoteCreationForExternalCustomer = function (browser, customerViewForm) {
      console.log('customerviewForm 2', customerViewForm);
      // internalForm.selectCompanyForRules();
      browser.sleep(2000);
      customerViewForm.enterOrginZipcode();
      customerViewForm.enterdestinationzipcode();
  
      customerViewForm.enterClass();
  //    browser.sleep(2000);
      customerViewForm.enterWeight();
      browser.sleep(3000);
  
      customerViewForm.clickAddBtn();
  
      browser.sleep(3000);
      //customerViewForm.setCarrier();
      customerViewForm.selectCarrier();
      browser.sleep(2000);

    };
  };
  
  module.exports = CreateLTLQuoteForExternalCustomer;
  