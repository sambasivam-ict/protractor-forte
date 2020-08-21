var LogisticsLoginPage = require("./pageobjects/login-page");

var HeaderForm = require("./pageobjects/header-page");

var LocalStorageValues = require("./pageobjects/localStorageValues");

var testDataInfo = require("./TestData/workbook_testdata.json");

var WorkbookPageForm = require("./pageobjects/workbook-page");

var WorkbookQuoteForm = require("./common/create_workbook_quote");

var environment = require("./environment/env");

var masterDataAPDiscount = [];
var masterDataARDiscount = [];

var localStorageValues = new LocalStorageValues();

describe("Workbook implementation", function () {
  beforeAll(function () {
 

    browser.ignoreSynchronization = true;
    browser.get(environment.url);

    var loginPageObj = new LogisticsLoginPage();

    var credentials = testDataInfo.data.login_credentials_admin;
    loginPageObj.setUserName(credentials.user_name);
    loginPageObj.setPassWord(credentials.password);

    loginPageObj.enterUserName();
    loginPageObj.enterPassword();

    loginPageObj.clickSubmitButton();

    browser.driver.manage().window().maximize();
    browser.sleep(3000);
    localStorageValues
      .getApMasterDataLocalStorage()
      .then(function (returnData) {
        masterDataAPDiscount = returnData;
      });

    localStorageValues
      .getArMasterDataLocalStorage()
      .then(function (returnData) {
        masterDataARDiscount = returnData;
      });
  });

  afterAll(function () {
    browser.sleep(2000);
    // var headerForm = new HeaderForm();
    // headerForm.clickOnWelcomeMenu();
    // browser.sleep(2000);
    // headerForm.clickOnLogoutUser();
    browser.sleep(2000);
  });

  it("Navigating from internalview to workbook screen", function () {
    browser.sleep(3000).then(function () {
      var headerForm = new HeaderForm();
      headerForm.clickOnSales();
      browser.sleep(2000);
      headerForm.clickOnWorkbook();
      browser.sleep(2000);
    });
  });
  it("Creating new company and moving on next screen", function () {
    browser.sleep(3000).then(function() {
        var workbookPageForm = new WorkbookPageForm();
        var workbookQuoteForm = new WorkbookQuoteForm();
        const testData = testDataInfo.data.company_creation;
        workbookQuoteForm.setDataInObjectForCustomerInfo(testData, workbookPageForm);
        workbookQuoteForm.createWorkbookCompanyCreation(browser,workbookPageForm);
        browser.sleep(2000);
    });
  });
  it("Importing excel sheet", function () {
    browser.sleep(3000).then(function() {
      var workbookPageForm = new WorkbookPageForm();
      browser.sleep(2000);
      workbookPageForm.selectSheet();
    });
  });
});
