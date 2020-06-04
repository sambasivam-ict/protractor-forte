var LogisticsLoginPage = require("./pageobjects/LoginForm");

var InternalForm = require("./pageobjects/InternalViewForm");

var LocalStorageValues = require("./pageobjects/LocalStorateValues");

var QuoteDetailForm = require("./pageobjects/QuoteDetailForm");

var LtlQuoteForm = require("./common/createltlquote");

var QuoteDetailForm = require('./pageobjects/QuoteDetailForm');

var testDataInfo = require("./testdata.json");

var masterDataAPDiscount = [];
var masterDataARDiscount = [];

var localStorageValues = new LocalStorageValues();
var quoteDetailForm = new QuoteDetailForm();

describe("YRC Quote Creation by admin testcases", function () {
  beforeAll(function () {

    console.log("test data:", testDataInfo.data.venilla_quote.Class);

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

  it("should calculate the net charge properly for vanilla inputs", function () {
    browser.sleep(5000).then(function () {
      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();

      var dataObj = testDataInfo.data.venilla_quote;
      internalForm.setCompanyName(dataObj.company_name);
      ltlQuoteForm.setDataInObject(dataObj, internalForm);
      ltlQuoteForm.createLtlQuote(browser, internalForm);
      internalForm.clickGetQuote();

      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonYrc();

        browser.sleep(2000);

        const quoteObj = internalForm.calculateNetCharge(
          dataObj.ar_gross_charge,
          localStorageValues.getArMasterDataForYRC().discount,
          localStorageValues.getArMasterDataForYRC().fuelsurcharge,
          localStorageValues.getArMasterDataForYRC().amc
        );

        browser
          .actions()
          .mouseMove(quoteDetailForm.yrcArNetChargeElem)
          .perform();
        browser.sleep(1000);

        expect(quoteDetailForm.getYrcApGrossCharge()).toEqual(
          "$" + dataObj.ap_gross_charge
        );
        expect(quoteDetailForm.getYrcArGrossCharge()).toEqual(
          "$" + dataObj.ar_gross_charge
        );
        expect(quoteDetailForm.getYrcArDiscountedRate()).toEqual(
          "$" + quoteObj.discountedRate
        );
        expect(quoteDetailForm.getYrcArNetCharge()).toEqual(
          "$" + quoteObj.netCharge
        );
      });
    });

    browser.sleep(3000);
  });

  it("should calculate the net charge properly for either ORIGIN or DESTINATION BEING CA", function () {
    browser.sleep(3000).then(function () {
      console.log("inside the second scnerio..");
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();

      browser.sleep(2000);

      var dataObj = testDataInfo.data.ca_quote;
      internalForm.setCompanyName(dataObj.company_name);
      ltlQuoteForm.setDataInObject(dataObj, internalForm);
      ltlQuoteForm.createLtlQuote(browser, internalForm);
      internalForm.clickGetQuote();

      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonYrc();
        browser.sleep(2000);

        const quoteObj = internalForm.calculateNetCharge(
          dataObj.ar_gross_charge,
          localStorageValues.getArMasterDataForYRC().discount,
          localStorageValues.getArMasterDataForYRC().fuelsurcharge,
          localStorageValues.getArMasterDataForYRC().amc
        );

        expect(quoteDetailForm.getYrcApGrossCharge()).toEqual("$" + dataObj.ap_gross_charge);
        expect(quoteDetailForm.getYrcArGrossCharge()).toEqual("$" + dataObj.ar_gross_charge);

        expect(quoteDetailForm.getYrcApCaCharge()).toEqual(
          "CA Charge - $" + localStorageValues.getApMasterDataForYRC().caCharge
        );
        expect(quoteDetailForm.getYrcArCaCharge()).toEqual(
          "CA Charge - $" + localStorageValues.getArMasterDataForYRC().caCharge
        );
        expect(quoteDetailForm.getYrcArDiscountedRate()).toEqual(
          "$" + quoteObj.discountedRate
        );
        expect(quoteDetailForm.getYrcArNetCharge()).toEqual("$" + quoteObj.netCharge);
      });
    });
    browser.sleep(3000);
  });

  it("should calculate the net charge properly for Yrc Quote creations by non direct", function () {
    browser.sleep(5000).then(function () {
      console.log("inside the third  scanerio ..");
      $("body").sendKeys(protractor.Key.ESCAPE);
      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();
      browser.sleep(2000);

      var dataObj = testDataInfo.data;
      var dataInput = dataObj.non_direct_zip;
      internalForm.setCompanyName(dataInput.company_name);
      ltlQuoteForm.setDataInObject(dataObj, internalForm);
      ltlQuoteForm.createLtlQuote(browser, internalForm);
      internalForm.clickGetQuote();

      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonYrc();

        browser.sleep(2000);

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataObj.ar_nondirect_discount,
          localStorageValues.getArMasterDataForYRC().fuelsurcharge,
          localStorageValues.getArMasterDataForYRC().amc
        );

        quoteDetailForm.getYrcShipTypes().then(function (text) {
          expect(text).toEqual(dataInput.ship_type);
        });

        expect(quoteDetailForm.getYrcApGrossCharge()).toEqual("$" + dataInput.ap_gross_charge);
        expect(quoteDetailForm.getYrcArGrossCharge()).toEqual("$" + dataInput.ar_gross_charge);

        expect(quoteDetailForm.getYrcApCaCharge()).toEqual(
          "CA Charge - $" + localStorageValues.getApMasterDataForYRC().caCharge
        );
        expect(quoteDetailForm.getYrcArCaCharge()).toEqual(
          "CA Charge - $" + localStorageValues.getArMasterDataForYRC().caCharge
        );

        expect(quoteDetailForm.getYrcArDiscountedRate()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(quoteDetailForm.getYrcArNetCharge()).toEqual("$" + quoteObj.netCharge);
      });
    });
    browser.sleep(2000);
  });

  it("should calculate the net charge properly for Yrc quote creation for Highcost related to Min charge", function () {
    browser.sleep(3000).then(function () {
      console.log("inside the fourth scnerio..");
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();
      browser.sleep(2000);

      var dataObj = testDataInfo.data
      var dataInput = dataObj.highcost_min;
      internalForm.setCompanyName(dataInput.company_name);
      ltlQuoteForm.setDataInObject(dataInput, internalForm);
      ltlQuoteForm.createLtlQuote(browser, internalForm);
      internalForm.clickGetQuote();


      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonYrc();

        browser.sleep(2000);

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataObj.ar_nondirect_discount,
          dataObj.ar_fuel_charge,
          localStorageValues.getArMasterDataForYRC().amc
        );

        expect(quoteDetailForm.getYrcApGrossCharge()).toEqual(
          "$" + dataInput.ap_gross_charge
        );
        expect(quoteDetailForm.getYrcArGrossCharge()).toEqual(
          "$" + dataInput.ar_gross_charge
        );

        expect(quoteDetailForm.getYrcApCaCharge()).toEqual(
          "CA Charge - $" + dataInput.ca_charge
        );
        expect(quoteDetailForm.getYrcArCaCharge()).toEqual(
          "CA Charge - $" + dataInput.ca_charge
        );

        // for high cost.
        expect(quoteDetailForm.getYrcApHighCost()).toEqual(
          "High Cost - $" + dataInput.high_cost_charge
        );
        expect(quoteDetailForm.getYrcArHighCost()).toEqual(
          "High Cost - $" + dataInput.high_cost_charge
        );

        expect(quoteDetailForm.getYrcArDiscountedRate()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(quoteDetailForm.getYrcArNetCharge()).toEqual("$" + quoteObj.netCharge);
      });
    });
    browser.sleep(4000);
  });

  it("should calculate the net charge properly for  Yrc Quote creation for Highcost zip with no min charge", function () {
    browser.sleep(5000).then(function () {
      console.log("inside the fifth scnerio..");
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();

      var ltlQuoteForm = new LtlQuoteForm();
      browser.sleep(2000);

      var dataObj = testDataInfo.data;
      var dataInput = dataObj.highcost_no_min;
      internalForm.setCompanyName(dataInput.company_name);
      ltlQuoteForm.setDataInObject(dataInput, internalForm);
      ltlQuoteForm.createLtlQuote(browser, internalForm);
      internalForm.clickGetQuote();
      browser.sleep(3000);

      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonYrc();

        browser.sleep(2000);

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataObj.ar_discount,
          dataObj.ar_fuel_charge,
          localStorageValues.getArMasterDataForYRC().amc
        );

        expect(quoteDetailForm.getYrcApGrossCharge()).toEqual(
          "$" + dataInput.ap_gross_charge
        );
        expect(quoteDetailForm.getYrcArGrossCharge()).toEqual(
          "$" + dataInput.ar_gross_charge
        );

        expect(quoteDetailForm.getYrcApCaCharge()).toEqual(
          "CA Charge - $" + dataInput.ca_charge
        );
        expect(quoteDetailForm.getYrcArCaCharge()).toEqual(
          "CA Charge - $" + dataInput.ca_charge
        );

        // for high cost.
        expect(quoteDetailForm.getYrcApHighCost()).toEqual(
          "High Cost - $" + dataInput.high_cost_charge
        );
        expect(quoteDetailForm.getYrcArHighCost()).toEqual(
          "High Cost - $" + dataInput.high_cost_charge
        );

        expect(quoteDetailForm.getYrcArDiscountedRate()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(quoteDetailForm.getYrcArNetCharge()).toEqual("$" + quoteObj.netCharge);
      });
    });
    browser.sleep(4000);
  });

  /*
  it("should calculate the net charge properly for Yrc Quote creation for Accessorial Quote of LiftGate", function () {
    browser.sleep(5000).then(function () {
      console.log("inside the sixth scnerio..");
      // browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();

      internalForm.setOrginzipcode(
        testDataInfo.data.accssorial_quote_lg.Originzipcode
      );
      internalForm.setDestinationzipcode(
        testDataInfo.data.accssorial_quote_lg.Destinationzipcode
      );
      internalForm.setClass(testDataInfo.data.accssorial_quote_lg.Class);
      internalForm.setWeight(testDataInfo.data.accssorial_quote_lg.Weight);

      internalForm.enterOrginZipcode();
      internalForm.enterdestinationzipcode();

      internalForm.enterClass();
      browser.sleep(2000);
      internalForm.enterWeight();
      browser.sleep(3000);

      internalForm.clickAddBtn();

      browser.sleep(3000);

      internalForm.clickGetQuote();

      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonYrc();

        var yrcApGrossElem = element(by.id("yrcAPGrosscharge"));
        var yrcArGrossElem = element(by.id("yrcARGross"));

        var yrcApLGElem = element(by.id("yrcAPAccessorail"));
        var yrcArLGElem = element(by.id("yrcARAccessorial"));

        expect(yrcApGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.accssorial_quote_lg.ap_gross_charge
        );
        expect(yrcArGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.accssorial_quote_lg.ar_gross_charge
        );

        // for accessorial Charge
        expect(yrcApLGElem.getText()).toEqual(
          "LiftGate Service - $" +
            testDataInfo.data.accssorial_quote_lg.ap_accessorial_charge
        );
        expect(yrcArLGElem.getText()).toEqual(
          "LiftGate Service - $" +
            testDataInfo.data.accssorial_quote_lg.ar_accessorial_charge
        );
      });
    });
    browser.sleep(4000);
  });
  */
});
