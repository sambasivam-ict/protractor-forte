var LogisticsLoginPage = require("./pageobjects/login-page");

var InternalForm = require("./pageobjects/internalView-page");

var LocalStorageValues = require("./pageobjects/localStorageValues");

var testDataInfo = require("./TestData/fedex_testData.json");
var QuoteDetailForm = require("./pageobjects/quoteDetail-page");
var LtlQuoteForm = require("./common/create_ltl_quote");
var environment = require("./environment/env");
var ExternalDashboardForm = require("./pageobjects/externalDashboard-page");
var quoteDetailForm = new QuoteDetailForm();

var localStorageValues = new LocalStorageValues();
describe("Fedex Economy Quote Creation by admin testcases in Internal Page", function () {
  beforeAll(function () {
    //Attn Deepak: example to read the json: am reading the test data frm testdata.json

    console.log("test data:", testDataInfo.data.Inter_regional.Class);

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

  it("should calculate the net charge properly for InterRegional zipcodes", function () {
    browser.sleep(3000).then(function () {
      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();
      var dataObj = testDataInfo.data;
      var dataInput = dataObj.Inter_regional;

      browser.sleep(2000);

      internalForm.setCompanyName(dataInput.company_name);
      ltlQuoteForm.setDataInObject(dataInput, internalForm);
      ltlQuoteForm.createLtlQuote(browser, internalForm);
      internalForm.clickGetQuote();

      // to be moved to the last part later.

      //internalForm.clickSelectAccessorialMultiSelect();

      //end to be moved to the last part later

      browser.sleep(2000);

      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonFedex();
        browser.sleep(2000);

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          localStorageValues.getARMasterDataForFedexEco().discount,
          localStorageValues.getARMasterDataForFedexEco().fuelsurcharge,
          localStorageValues.getARMasterDataForFedexEco().amc
        );

        expect(quoteDetailForm.getFedexEcoApGrossCharge()).toEqual(
          "$" + dataInput.ap_gross_charge
        );
        expect(quoteDetailForm.getFedexEcoArGrossCharge()).toEqual(
          "$" + dataInput.ar_gross_charge
        );
        expect(quoteDetailForm.getFedexEcoArDiscountedRate()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(quoteDetailForm.getFedexEcoArNetCharge()).toEqual(
          "$" + quoteObj.netCharge
        );
      });
    });
  });

  it("should calculate the net charge properly for Regional inputs", function () {
    browser.sleep(3000).then(function () {
      console.log("inside the second scnerio..");
      // browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();
      var dataObj = testDataInfo.data;
      var dataInput = dataObj.Regional_quote;
      browser.sleep(2000);

      internalForm.setCompanyName(dataInput.company_name);
      ltlQuoteForm.setDataInObject(dataInput, internalForm);
      ltlQuoteForm.createLtlQuote(browser, internalForm);
      internalForm.clickGetQuote();
      browser.sleep(2000);
      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonFedex();
        browser.sleep(2000);

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          localStorageValues.getARMasterDataForFedexEco().discount,
          localStorageValues.getARMasterDataForFedexEco().fuelsurcharge,
          localStorageValues.getARMasterDataForFedexEco().amc
        );

        expect(quoteDetailForm.getFedexEcoApGrossCharge()).toEqual(
          "$" + dataInput.ap_gross_charge
        );
        expect(quoteDetailForm.getFedexEcoArGrossCharge()).toEqual(
          "$" + dataInput.ar_gross_charge
        );
        expect(quoteDetailForm.getFedexEcoArDiscountedRate()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(quoteDetailForm.getFedexEcoArNetCharge()).toEqual(
          "$" + quoteObj.netCharge
        );
      });
    });
  });

  it("should calculate the net charge properly for California charge inputs", function () {
    browser.sleep(3000).then(function () {
      console.log("inside the third scnerio..");
      // browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();
      var dataObj = testDataInfo.data;
      var dataInput = dataObj.ca_quote;
      browser.sleep(2000);

      internalForm.setCompanyName(dataInput.company_name);
      ltlQuoteForm.setDataInObject(dataInput, internalForm);
      ltlQuoteForm.createLtlQuote(browser, internalForm);

      internalForm.clickGetQuote();
      browser.sleep(2000);
      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonFedex();

        browser.sleep(2000);

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          localStorageValues.getARMasterDataForFedexEco().discount,
          localStorageValues.getARMasterDataForFedexEco().fuelsurcharge,
          localStorageValues.getARMasterDataForFedexEco().amc
        );

        expect(quoteDetailForm.getFedexEcoApGrossCharge()).toEqual(
          "$" + dataInput.ap_gross_charge
        );
        expect(quoteDetailForm.getFedexEcoArGrossCharge()).toEqual(
          "$" + dataInput.ar_gross_charge
        );

        expect(quoteDetailForm.getFedexEcoArDiscountedRate()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(quoteDetailForm.getFedexEcoArNetCharge()).toEqual(
          "$" + quoteObj.netCharge
        );

        expect(quoteDetailForm.getFedexEcoApCaCharge()).toEqual(
          "CA Charge - $" + dataInput.ca_charge
        );
        expect(quoteDetailForm.getFedexEcoArCaCharge()).toEqual(
          "CA Charge - $" + dataInput.ca_charge
        );
      });
    });
  });

  it("should calculate the net charge properly for High cost charge inputs", function () {
    browser.sleep(3000).then(function () {
      console.log("inside the fourth scnerio..");
      // browser.actions().sendKeys(protractor.Key.ESCAPE).perform();

      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();
      var dataObj = testDataInfo.data;
      var dataInput = dataObj.Highcost_quote;
      browser.sleep(2000);

      internalForm.setCompanyName(dataInput.company_name);
      ltlQuoteForm.setDataInObject(dataInput, internalForm);
      ltlQuoteForm.createLtlQuote(browser, internalForm);

      browser.sleep(2000);

      internalForm.clickGetQuote();
      browser.sleep(2000);
      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonFedex();

        browser.sleep(1000);

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          localStorageValues.getARMasterDataForFedexEco().discount,
          localStorageValues.getARMasterDataForFedexEco().fuelsurcharge,
          localStorageValues.getARMasterDataForFedexEco().amc
        );

        expect(quoteDetailForm.getFedexEcoApGrossCharge()).toEqual(
          "$" + dataInput.ap_gross_charge
        );
        expect(quoteDetailForm.getFedexEcoArGrossCharge()).toEqual(
          "$" + dataInput.ar_gross_charge
        );

        expect(quoteDetailForm.getFedexEcoArDiscountedRate()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(quoteDetailForm.getFedexEcoArNetCharge()).toEqual(
          "$" + quoteObj.netCharge
        );

        expect(quoteDetailForm.getFedexEcoArHighCost()).toEqual(
          "High Cost - $" + dataInput.highcostar_charge
        );
      });
    });
  });
});
