var LogisticsLoginPage = require("./pageobjects/login-page");

var InternalForm = require("./pageobjects/internalView-page");

var LocalStorageValues = require("./pageobjects/localStorageValues");

var LtlQuoteForm = require("./common/create_ltl_quote");

var testDataInfo = require("./TestData/fedex_testdata_rules.json");

var QuoteDetailForm = require("./pageobjects/quoteDetail-page");

var environment = require("./environment/env");

var masterDataAPDiscount = [];
var masterDataARDiscount = [];

var localStorageValues = new LocalStorageValues();
var quoteDetailForm = new QuoteDetailForm();

describe("Fedex Economy Quote Creation by admin for company that has rules", function () {
  beforeAll(function () {
    browser.ignoreSynchronization = true;
    if (environment.envType == "dev") {
      browser.get(environment.dev_url);
    } else if (environment.envType == "stage") { 
      browser.get(environment.stage_url);
    } else {
      browser.get(environment.prod_url);
    }
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
    var internalForm = new InternalForm();
    internalForm.clickOnWelcomeUser();
    browser.sleep(2000);
    internalForm.clickOnLogoutUser();
    browser.sleep(2000);
  });

  it("Fedex Regional Net Charge should be calculated properly with configured discounts", function () {
    browser.sleep(3000).then(function () {
      console.log(
        "Fedex Regional Net Charge should be calculated properly",
        localStorageValues.getArMasterDataByCompany().FEDEXECONOMY
      );
      $("body").sendKeys(protractor.Key.ESCAPE);
      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();

      var dataObj = testDataInfo.data.fedex_regional;
      console.log("regional data", dataObj);

      internalForm.setCompanyName(dataObj.company_name);
      ltlQuoteForm.setDataInObject(dataObj, internalForm);
      ltlQuoteForm.createLtlQuoteRules(browser, internalForm);
      internalForm.clickGetQuote();
      browser.sleep(2000);
      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonFedex();
        browser.sleep(2000);

        const quoteObj = internalForm.calculateNetCharge(
          dataObj.ar_gross_charge,
          dataObj.ar_discount,
          localStorageValues.getArMasterDataByCompany().FEDEXECONOMY
            .fuelsurcharge,
          dataObj.ar_amc
        );

        expect(quoteDetailForm.getFedexEcoApGrossCharge()).toEqual(
          "$" + dataObj.ap_gross_charge
        );
        expect(quoteDetailForm.getFedexEcoArGrossCharge()).toEqual(
          "$" + dataObj.ar_gross_charge
        );

        expect(quoteDetailForm.getFedexEcoArDiscountedRate()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(quoteDetailForm.getFedexEcoArNetCharge()).toEqual(
          "$" + quoteObj.netCharge
        );
      });
    });
    browser.sleep(3000);
  });

  it("Fedex InterRegional Net Charge should be calculated properly with configured discounts", function () {
    browser.sleep(3000).then(function () {
      console.log(
        "Fedex InterRegional  Net Charge should be calculated properly"
      );
      $("body").sendKeys(protractor.Key.ESCAPE);
      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();

      var dataObj = testDataInfo.data.fedex_interregional;

      internalForm.setCompanyName(dataObj.company_name);
      ltlQuoteForm.setDataInObject(dataObj, internalForm);
      ltlQuoteForm.createLtlQuoteRules(browser, internalForm);
      internalForm.clickGetQuote();
      browser.sleep(2000);
      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonFedex();
        browser.sleep(2000);

        const quoteObj = internalForm.calculateNetCharge(
          dataObj.ar_gross_charge,
          dataObj.ar_discount,
          localStorageValues.getArMasterDataByCompany().FEDEXECONOMY
            .fuelsurcharge,
          dataObj.ar_amc
        );

        expect(quoteDetailForm.getFedexEcoApGrossCharge()).toEqual(
          "$" + dataObj.ap_gross_charge
        );
        expect(quoteDetailForm.getFedexEcoArGrossCharge()).toEqual(
          "$" + dataObj.ar_gross_charge
        );

        expect(quoteDetailForm.getFedexEcoArDiscountedRate()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(quoteDetailForm.getFedexEcoArNetCharge()).toEqual(
          "$" + quoteObj.netCharge
        );
      });
    });
    browser.sleep(3000);
  });

  it("Fedex Special Rules Net Charge should be calculated properly with configured discounts for ALL to zip 30003", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "Fedex Special Rules - Net Charge should be calculated properly: ALL to zip(30003)"
      );
      $("body").sendKeys(protractor.Key.ESCAPE);
      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();

      var dataObj = testDataInfo.data.fedex_special_rules;
      console.log("value for dataObj", dataObj);
      var data_all_to_zip = dataObj.all_to_zip;

      internalForm.setCompanyName(data_all_to_zip.company_name);
      ltlQuoteForm.setDataInObject(data_all_to_zip, internalForm);
      ltlQuoteForm.createLtlQuoteRules(browser, internalForm);
      internalForm.clickGetQuote();
      browser.sleep(2000);
      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonFedex();
        browser.sleep(2000);

        const quoteObj = internalForm.calculateNetCharge(
          data_all_to_zip.ar_gross_charge,
          data_all_to_zip.ar_discount,
          localStorageValues.getArMasterDataByCompany().FEDEXPRIORITY
            .fuelsurcharge,
          data_all_to_zip.ar_amc
        );

        expect(quoteDetailForm.getFedexPriApGrossCharge()).toEqual(
          "$" + data_all_to_zip.ap_gross_charge
        );
        expect(quoteDetailForm.getFedexPriArGrossCharge()).toEqual(
          "$" + data_all_to_zip.ar_gross_charge
        );

        expect(quoteDetailForm.getFedexPriArDiscountedRate()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(quoteDetailForm.getFedexPriArNetCharge()).toEqual(
          "$" + quoteObj.netCharge
        );
      });
      browser.sleep(3000);
    });
  });
});
