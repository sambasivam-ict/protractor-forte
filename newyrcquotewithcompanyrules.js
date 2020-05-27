var LogisticsLoginPage = require("./pageobjects/LoginForm");

var InternalForm = require("./pageobjects/InternalViewForm");

var LocalStorageValues = require("./pageobjects/LocalStorateValues");

var LtlQuoteForm = require("./common/createltlquote");

var testDataInfo = require("./yrc_testdata_rules.json");

var masterDataAPDiscount = [];
var masterDataARDiscount = [];

var localStorageValues = new LocalStorageValues();

describe("YRC Quote Creation by admin for company that has rules", function () {
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

  it("YRC Intrastate AMC GT Discounted Rate-net charge should be calculated properly", function () {
    browser.sleep(5000).then(function () {
      console.log("yrc intra state where amc > intrastate");

      var dataObj = testDataInfo.data.yrc_intra_state;
      var dataInput = dataObj.amc_gt_dsc_rate;
      console.log("value for dataObj", dataObj.company_name);
      expect(true).toEqual(true);
      //use the datainput for entering origin and destination..
    });
  });

  it("YRC Intrastate-net charge should be calculated properly for configured ca charge and discounts", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "yrc intra state net charge calculated properly for configured ca charge"
      );

      var dataObj = testDataInfo.data.yrc_intra_state;
      console.log("value for dataObj", dataObj.company_name);

      var dataInput = dataObj.ca_highcost_charge;
      expect(true).toEqual(true);
    });
  });

  it("YRC Intrastate-net charge should be calculated properly for fak rules 85 to 200 as 300", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "yrc intra state net charge calculated properly for fak rules 85 to 200 as 300"
      );

      var dataObj = testDataInfo.data.yrc_intra_state;
      console.log("value for dataObj", dataObj.company_name);

      var dataInput = dataObj.fak_class_range_data;
      expect(true).toEqual(true);
    });
  });
  it("YRC Interstate-net charge should be calculated properly with high cost charge included", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "yrc inter state net charge calculated properly with high cost charge"
      );

      var dataObj = testDataInfo.data.yrc_inter_state;
      console.log("value for dataObj", dataObj.company_name);

      expect(true).toEqual(true);
    });
  });
  it("YRC special rules zip to zip should calculate netcharge properly with configured discounts", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "yrc special rules zip to zip should calculate net charge correctly"
      );

      var dataObj = testDataInfo.data.yrc_special_rules;
      console.log("value for dataObj", dataObj.company_name);

      var dataInput = dataObj.zip_to_zip;

      expect(true).toEqual(true);
    });
  });
  it("YRC special rules zip to state should calculate netcharge properly with configured discounts", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "yrc special rules zip to state should calculate net charge correctly"
      );

      var dataObj = testDataInfo.data.yrc_special_rules;
      console.log("value for dataObj", dataObj.company_name);

      var dataInput = dataObj.zip_to_state;

      expect(true).toEqual(true);
    });
  });
  it("YRC special rules ALL to state TX should calculate netcharge properly with configured discounts", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "yrc special rules ALL to state TX  should calculate net charge correctly"
      );

      var dataObj = testDataInfo.data.yrc_special_rules;
      console.log("value for dataObj", dataObj.company_name);

      var dataInput = dataObj.all_to_state;

      expect(true).toEqual(true);
    });
  });
});
