var CreateWorkbookQuoteForm = function () {
    this.setDataInObjectForCustomerInfo = function (testData, workbookForm) {
      console.log('1', workbookForm, testData);
      customerViewForm.setTypeOfUser(testData.TypeOfUser);
      customerViewForm.setCompanyName(testData.CompanyName);
      customerViewForm.setCompanyZip(testData.CompanyZip);
    };
  
    this.createWorkbookCompanyCreation = function (browser, customerViewForm) {
      browser.sleep(2000);
      customerViewForm.enterTypeOfUser();
      customerViewForm.enterCompanyName();
      browser.sleep(3000);
      customerViewForm.enterCompanyZip();
      
      browser.sleep(3000);
  
      customerViewForm.clickOnSaveBtn();
    };
  };
  
  module.exports = CreateWorkbookQuoteForm;
  