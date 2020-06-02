var LogisticsLoginPage = require("./pageobjects/LoginForm");

var InternalForm = require("./pageobjects/InternalViewForm");

var LocalStorageValues = require("./pageobjects/LocalStorateValues");

var LtlQuoteForm = require("./common/createltlquote");

var testDataInfo = require("./reddaway_testdata_rules.json");

var QuoteDetailForm = require('./pageobjects/QuoteDetailForm');

var masterDataAPDiscount = [];
var masterDataARDiscount = [];

var localStorageValues = new LocalStorageValues();
var quoteDetailForm = new QuoteDetailForm();

describe("Reddaway Quote Creation by admin for company that has rules", function () {
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

  it("Reddaway Regional In-Direct - Net Charge should be calculated properly with configured discounts", function () {
    browser.sleep(5000).then(function () {
      console.log("Reddaway Regional In Direct Net Charge should be proper");
      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();
      $("body").sendKeys(protractor.Key.ESCAPE);
      
      var dataObj = testDataInfo.data.reddaway_regional_indirect;
      console.log("regional origin zip", dataObj);

      internalForm.setCompanyName(dataObj.company_name);
      ltlQuoteForm.setDataInObject(dataObj, internalForm);
      ltlQuoteForm.createLtlQuoteRules(browser, internalForm);
      internalForm.clickGetQuote();

      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonReddaway();
        browser.sleep(2000);
        const quoteObj = internalForm.calculateNetCharge(
          dataObj.ar_gross_charge,
          dataObj.ar_discount,
          dataObj.ar_fuel_charge,
          dataObj.ar_amc
        );

        expect(quoteDetailForm.getReddawayApGrossCharge()).toEqual(
          "$" + dataObj.ap_gross_charge
        );
        expect(quoteDetailForm.getReddawayArGrossCharge()).toEqual(
          "$" + dataObj.ar_gross_charge
        );

        expect(quoteDetailForm.getReddawayArDiscountedRate()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(quoteDetailForm.getReddawayArNetCharge()).toEqual("$" + quoteObj.netCharge);
        expect(true).toEqual(true);
      });
    });
    browser.sleep(2000);
  });

  it("Reddaway Regional Direct  IntraState- Net Charge should be calculated properly with configured discounts", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "Reddaway Regional Direct  IntraState - Net Charge should be calculated properly"
      );
      
      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();
      $("body").sendKeys(protractor.Key.ESCAPE);
      var dataObj = testDataInfo.data.reddaway_regional_direct_intrastate;
      console.log("value for dataObj", dataObj);
      expect(true).toEqual(true);
      internalForm.setCompanyName(dataObj.company_name);
      ltlQuoteForm.setDataInObject(dataObj, internalForm);
      ltlQuoteForm.createLtlQuoteRules(browser, internalForm);
      internalForm.clickGetQuote();

      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonReddaway();
        browser.sleep(2000);

        const quoteObj = internalForm.calculateNetCharge(
          dataObj.ar_gross_charge,
          dataObj.ar_discount,
          dataObj.ar_fuel_charge,
          dataObj.ar_amc
        );

        expect(quoteDetailForm.getReddawayApGrossCharge()).toEqual(
          "$" + dataObj.ap_gross_charge
        );
        expect(quoteDetailForm.getReddawayArGrossCharge()).toEqual(
          "$" + dataObj.ar_gross_charge
        );

        expect(quoteDetailForm.getReddawayArDiscountedRate()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(quoteDetailForm.getReddawayArNetCharge()).toEqual("$" + quoteObj.netCharge);
        expect(true).toEqual(true);
      });
    });
    browser.sleep(2000);
  });



  it("Reddaway Special Rules All West to ZIP - Net Charge should be calculated properly with configured discounts", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "Reddaway Special Rules All-West to zip - Net Charge should be calculated properly"
      );
      $("body").sendKeys(protractor.Key.ESCAPE);
      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();


      var dataObj = testDataInfo.data.reddaway_spl_rules_allwest_zip;
      console.log("value for dataObj", dataObj);
      expect(true).toEqual(true);
      internalForm.setCompanyName(dataObj.company_name);
      ltlQuoteForm.setDataInObject(dataObj, internalForm);
      ltlQuoteForm.createLtlQuoteRules(browser, internalForm);
      internalForm.clickGetQuote();

      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonReddaway();
        browser.sleep(2000);
        const quoteObj = internalForm.calculateNetCharge(
          dataObj.ar_gross_charge,
          dataObj.ar_discount,
          dataObj.ar_fuel_charge,
          dataObj.ar_amc
        );
        

        expect(quoteDetailForm.getReddawayApGrossCharge()).toEqual(
          "$" + dataObj.ap_gross_charge
        );
        expect(quoteDetailForm.getReddawayArGrossCharge()).toEqual(
          "$" + dataObj.ar_gross_charge
        )

        expect(quoteDetailForm.getReddawayArDiscountedRate()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(quoteDetailForm.getReddawayArNetCharge()).toEqual("$" + quoteObj.netCharge);
        expect(true).toEqual(true);
      });
    });
    browser.sleep(2000);
  });
  it("Reddaway BayArea SFO Metro Terminal - Net Charge should be calculated properly with configured discounts", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "Reddaway BayArea SFO Metro Terminal - Net Charge should be calculated properly"
      );
      $("body").sendKeys(protractor.Key.ESCAPE);
      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();


      var dataObj = testDataInfo.data.reddaway_highcost_sfo_metro;
  
      expect(true).toEqual(true);
      internalForm.setCompanyName(dataObj.company_name);
      ltlQuoteForm.setDataInObject(dataObj, internalForm);
      ltlQuoteForm.createLtlQuoteRules(browser, internalForm);
      internalForm.clickGetQuote();

      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonReddaway();
        browser.sleep(2000);
        const quoteObj = internalForm.calculateNetCharge(
          dataObj.ar_gross_charge,
          dataObj.ar_discount,
          dataObj.ar_fuel_charge,
          dataObj.ar_amc
        );
        console.log('quoteObj', quoteObj);

        expect(quoteDetailForm.getReddawayApGrossCharge()).toEqual(
          "$" + dataObj.ap_gross_charge
        );
        expect(quoteDetailForm.getReddawayArGrossCharge()).toEqual(
          "$" + dataObj.ar_gross_charge
        );
       

        expect(quoteDetailForm.getReddawayArDiscountedRate()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(quoteDetailForm.getReddawayArNetCharge()).toEqual("$" + quoteObj.netCharge);
        expect(true).toEqual(true);
      });
    });
  });
});
