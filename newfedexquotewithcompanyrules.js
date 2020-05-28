var LogisticsLoginPage = require("./pageobjects/LoginForm");

var InternalForm = require("./pageobjects/InternalViewForm");

var LocalStorageValues = require("./pageobjects/LocalStorateValues");

var LtlQuoteForm = require("./common/createltlquote");

var testDataInfo = require("./fedex_testdata_rules.json");

var masterDataAPDiscount = [];
var masterDataARDiscount = [];

var localStorageValues = new LocalStorageValues();

describe("Fedex Economy Quote Creation by admin for company that has rules", function () {
  beforeAll(function () {
    browser.ignoreSynchronization = true;
    browser.get(testDataInfo.data.environment_url);

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
    browser.close();
  });

  it("Fedex Regional - Net Charge should be calculated properly with configured discounts", function () {
    browser.sleep(5000).then(function () {
      console.log("Fedex Regional - Net Charge should be calculated properly");

      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();

      var dataObj = testDataInfo.data.fedex_regional;
      console.log("value for dataObj", testDataInfo.data.company_name);
      console.log("regional origin zip", dataObj.Originzipcode);

      internalForm.setCompanyName(testDataInfo.data.company_name);
      ltlQuoteForm.setDataInObject(dataObj, internalForm);
      ltlQuoteForm.createLtlQuoteRules(browser, internalForm);
      internalForm.clickGetQuote();

      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonFedex();
        browser.sleep(2000);
      });
      //use the dataObj for entering origin and destination..
      expect(true).toEqual(true);
    });
  });

  it("Fedex Inter-Regional - Net Charge should be calculated properly with configured discounts", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "Fedex Inter-Regional - Net Charge should be calculated properly"
      );

      var dataObj = testDataInfo.data.fedex_interregional;
      console.log("value for dataObj", testDataInfo.data.company_name);
      console.log("regional origin zip", dataObj.Originzipcode);
      //use the dataObj for entering origin and destination..
      expect(true).toEqual(true);
    });
  });

  it("Fedex Special Rules - Net Charge should be calculated properly with configured discounts for ALL to zip - 30003", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "Fedex Special Rules - Net Charge should be calculated properly: ALL to zip(30003)"
      );

      var dataObj = testDataInfo.data.fedex_special_rules;
      console.log("value for dataObj", dataObj.company_name);
      var data_all_to_zip = dataObj.all_to_zip;
      console.log("regional origin zip", data_all_to_zip.Originzipcode);
      //use the dataObj for entering origin and destination..
      expect(true).toEqual(true);
    });
  });
});
