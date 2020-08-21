var LogisticsLoginPage = require("./pageobjects/login-page");

var InternalForm = require("./pageobjects/internalView-page");

var ExternalDashboardForm = require("./pageobjects/externalDashboard-page");

var RateQuoteSelectForm = require("./pageobjects/rateQuoteSelect-page");

var LocalStorageValues = require("./pageobjects/localStorageValues");

var testDataInfo = require("./TestData/external_customer_testdata.json");
var QuoteDetailForm = require("./pageobjects/quoteDetail-page");
var LtlQuoteFormForExternalCustomer = require("./common/create_quoteforExternalcustomerquote");
var CustomerViewForm = require("./pageobjects/customerView-page");
var QuoteDetailCustomerViewForm = require("./pageobjects/quoteDetail_customerView-page");
var environment = require("./environment/env");

var masterDataAPDiscount = [];
var masterDataARDiscount = [];

var localStorageValues = new LocalStorageValues();

var quoteDetailForm = new QuoteDetailForm();

describe("External Customer logs in for creating external quotes", function () {
  beforeAll(function () {
    browser.sleep(3000);
    browser.ignoreSynchronization = true;
   browser.get(environment.url);

    var loginPageObj = new LogisticsLoginPage();

    var credentials = testDataInfo.data.login_credentials_customer;
    loginPageObj.setUserName(credentials.user_name);
    loginPageObj.setPassWord(credentials.password);

    loginPageObj.enterUserName();
    loginPageObj.enterPassword();
    browser.sleep(3000);
    loginPageObj.clickSubmitButton();

    browser.driver.manage().window().maximize();
    browser.sleep(3000);
  });
  afterAll(function () {
    browser.sleep(2000);
    var externalDashboardForm = new ExternalDashboardForm();
    externalDashboardForm.clickOnWelcomeUser();
    browser.sleep(2000);
    externalDashboardForm.clickOnLogoutUser();
    browser.sleep(2000);
  });
  it("should move from Dashboard to Request a rate quote", function () {
    browser.sleep(2000);
    var externalDashboardForm = new ExternalDashboardForm();
    externalDashboardForm.clickOnExternalDashboard();
    browser.sleep(2000);
  });

  it("should move from Request a rate quote to Ltl quote", function () {
    browser.sleep(2000);
    var rateQuoteSelectForm = new RateQuoteSelectForm();
    rateQuoteSelectForm.clickOnLtlQuote();
    browser.sleep(5000);
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

  it("should create quote for YRC carrier", function () {
    console.log("Yrc quote creation");
    browser.sleep(5000).then(function () {
      var customerViewForm = new CustomerViewForm();
      var ltlQuoteFormForExternalCustomer = new LtlQuoteFormForExternalCustomer();
      var quoteDetailCustomerViewForm = new QuoteDetailCustomerViewForm();
      $("body").sendKeys(protractor.Key.ESCAPE);
      var dataInput = testDataInfo.data.yrc_intrastate;

      console.log("value for dataObj dataInput", dataInput);

      customerViewForm.setCompanyName(dataInput.company_name);
      customerViewForm.setCarrier(dataInput.Carrier);
      ltlQuoteFormForExternalCustomer.setDataInObject(
        dataInput,
        customerViewForm
      );
      ltlQuoteFormForExternalCustomer.createLtlQuoteCreationForExternalCustomer(
        browser,
        customerViewForm
      );
      
      browser.sleep(2000);
      customerViewForm.clickGetQuote();
      browser.sleep(10000).then(function () {
        browser.sleep(2000);
        const quoteObj = customerViewForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataInput.ar_discount,
          localStorageValues.getArMasterDataByCompany().YRC.fuelsurcharge,
          dataInput.ar_amc
        );
        browser.sleep(5000);

        expect(quoteDetailCustomerViewForm.getGrossCharge()).toEqual(
          "$" + dataInput.ar_gross_charge
        );
        expect(quoteDetailCustomerViewForm.getHighCost()).toEqual(
          "High Cost - $" + dataInput.high_cost
        );
        expect(quoteDetailCustomerViewForm.getCaCharge()).toEqual(
          "CA Charge - $" + dataInput.ca_charge
        );

      });
    });
  });

  it("should create quote for fedex Economy carrier", function () {
    console.log("Fedex Economy quote creation");
    browser.sleep(5000).then(function () {
      var customerViewForm = new CustomerViewForm();
      var ltlQuoteFormForExternalCustomer = new LtlQuoteFormForExternalCustomer();
      var quoteDetailCustomerViewForm = new QuoteDetailCustomerViewForm();
      $("body").sendKeys(protractor.Key.ESCAPE);
      var dataInput = testDataInfo.data.fedex_Economy_Regional;

      console.log("value for dataObj dataInput", dataInput);

      customerViewForm.setCompanyName(dataInput.company_name);
      customerViewForm.setCarrier(dataInput.Carrier);
      ltlQuoteFormForExternalCustomer.setDataInObject(
        dataInput,
        customerViewForm
      );
      ltlQuoteFormForExternalCustomer.createLtlQuoteCreationForExternalCustomer(
        browser,
        customerViewForm
      );
      browser.sleep(2000);
      customerViewForm.clickGetQuote();
      browser.sleep(10000).then(function () {
        browser.sleep(2000);
        const quoteObj = customerViewForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataInput.ar_discount,
          localStorageValues.getArMasterDataByCompany().FEDEXECONOMY
            .fuelsurcharge,
          dataInput.ar_amc
        );
        browser.sleep(5000);
        expect(quoteDetailCustomerViewForm.getGrossCharge()).toEqual(
          "$" + dataInput.ar_gross_charge
        );
        expect(quoteDetailCustomerViewForm.getFedexShipType()).toEqual(
          "Regional"
        );
        
      });
    });
  });
  it("should create quote for reddaway carrier", function () {
    console.log("Reddaway quote creation");
    browser.sleep(5000).then(function () {
      var customerViewForm = new CustomerViewForm();
      var ltlQuoteFormForExternalCustomer = new LtlQuoteFormForExternalCustomer();
      var quoteDetailCustomerViewForm = new QuoteDetailCustomerViewForm();
      $("body").sendKeys(protractor.Key.ESCAPE);
      var dataInput = testDataInfo.data.reddaway_spl_rule;

      console.log("value for dataObj dataInput", dataInput);

      customerViewForm.setCompanyName(dataInput.company_name);
      customerViewForm.setCarrier(dataInput.Carrier);
      ltlQuoteFormForExternalCustomer.setDataInObject(
        dataInput,
        customerViewForm
      );
      ltlQuoteFormForExternalCustomer.createLtlQuoteCreationForExternalCustomer(
        browser,
        customerViewForm
      );
      browser.sleep(2000);
      customerViewForm.clickGetQuote();
      browser.sleep(10000).then(function () {
        browser.sleep(2000);
        const quoteObj = customerViewForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataInput.ar_discount,
          localStorageValues.getArMasterDataByCompany().REDDAWAY.fuelsurcharge,
          dataInput.ar_amc
        );

        browser.sleep(5000);
        expect(quoteDetailCustomerViewForm.getGrossCharge()).toEqual(
          "$" + dataInput.ar_gross_charge
        );
        expect(quoteDetailCustomerViewForm.getCaCharge()).toEqual(
          "CA Charge - $" + dataInput.ca_charge
        );
        expect(quoteDetailCustomerViewForm.getFedexShipType()).toEqual(
          "Direct"
        );
        
      });
    });
  });
  it("should create quote for yrc interstate carrier will result a error message", function () {
    console.log("yrc intrastate quote creation");
    browser.sleep(5000).then(function () {
      var customerViewForm = new CustomerViewForm();
      var ltlQuoteFormForExternalCustomer = new LtlQuoteFormForExternalCustomer();
      var quoteDetailCustomerViewForm = new QuoteDetailCustomerViewForm();
      $("body").sendKeys(protractor.Key.ESCAPE);
      var dataInput = testDataInfo.data.yrc_intrastate;

      console.log("value for dataObj dataInput", dataInput);

      customerViewForm.setCompanyName(dataInput.company_name);
      customerViewForm.setCarrier(dataInput.Carrier);
      ltlQuoteFormForExternalCustomer.setDataInObject(
        dataInput,
        customerViewForm
      );
      ltlQuoteFormForExternalCustomer.createLtlQuoteCreationForExternalCustomer(
        browser,
        customerViewForm
      );
      browser.sleep(2000);
      // expect(quoteDetailCustomerViewForm.getReddawayNoService()).toEqual(
      //   "Service is not available for these zipcodes"
      // );
      browser.sleep(2000);
      customerViewForm.clickGetQuote();
      browser.sleep(10000);
    });
  });
});
