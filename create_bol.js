var LogisticsLoginPage = require("./pageobjects/login-page");

var ExternalDashboardForm = require("./pageobjects/externalDashboard-page");

var LocalStorageValues = require("./pageobjects/localStorageValues");

var testDataInfo = require("./TestData/bol_testdata.json");

var CreateBolForm = require("./pageobjects/createBol-page");

var CreateBolQuote = require("./common/create_bol_quote");

var CreateBolSummaryForm = require("./pageobjects/createBolSummary-page");

var environment = require("./environment/env");

var masterDataAPDiscount = [];
var masterDataARDiscount = [];

var localStorageValues = new LocalStorageValues();
var createBolForm = new CreateBolForm();
var createBolQuote = new CreateBolQuote();
var createBolSummaryForm = new CreateBolSummaryForm();
describe("External Customer logs in for creating Bill of lading", function () {
  beforeAll(function () {
    browser.sleep(3000);
    browser.ignoreSynchronization = true;
    if (environment.isStage == false) {
      browser.get(environment.dev_url);
    } else {
      browser.get(environment.prod_url);
    }

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
    browser.close();
  });
  it("should move on to the Bol screen", function () {
    browser.sleep(2000);
    var externalDashboardForm = new ExternalDashboardForm();
    externalDashboardForm.clickOnCreateBol();

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
    browser.sleep(2000);
  });

  it("should create Bol for YRC carrier with NonItemized Shipment", function () {
    console.log("Yrc Bol creation");
    browser.sleep(5000).then(function () {
      var createBolForm = new CreateBolForm();
      var createBolQuote = new CreateBolQuote();
      var externalDashboardForm = new ExternalDashboardForm();
      var createBolSummaryForm = new CreateBolSummaryForm();
      $("body").sendKeys(protractor.Key.ESCAPE);
      var dataInput = testDataInfo.data.yrc_nonItemized;

      console.log("value for dataObj dataInput", dataInput);

      createBolQuote.setShipmentType(dataInput, createBolForm);
      createBolQuote.setDataInObject(dataInput, createBolForm);
      createBolQuote.createBolQuote(browser, createBolForm);

      browser.sleep(10000);

      browser.sleep(10000).then(function () {
        browser.sleep(4000);

        expect(createBolSummaryForm.getYrcOriginZip()).toEqual(
          dataInput.ShipperZip
        );
        expect(createBolSummaryForm.getYrcDestinationZip()).toEqual(
          dataInput.ConsigneeZip
        );
        expect(createBolSummaryForm.getYrcCarrier()).toEqual(
          dataInput.CarrierType
        );
        browser.sleep(4000);

        externalDashboardForm.clickOnGoToDashboard();
        browser.sleep(2000);
      });
    });
    browser.sleep(2000);
  });
  it("should create Bol for Fedex Economy carrier with NonItemized Shipment", function () {
    browser.sleep(5000).then(function () {
      var externalDashboardForm = new ExternalDashboardForm();
      var createBolForm = new CreateBolForm();
      var createBolSummaryForm = new CreateBolSummaryForm();
      externalDashboardForm.clickOnCreateBol();
      browser.sleep(2000);
      $("body").sendKeys(protractor.Key.ESCAPE);
      var dataInput = testDataInfo.data.fedexEco_nonItemized;

      console.log("value for dataObj dataInput", dataInput);

      createBolQuote.setShipmentType(dataInput, createBolForm);
      createBolQuote.setDataInObject(dataInput, createBolForm);
      createBolQuote.createBolQuote(browser, createBolForm);

      browser.sleep(10000);
      browser.sleep(10000).then(function () {
        browser.sleep(4000);
        expect(createBolSummaryForm.getFedexEcoOriginZip()).toEqual(
          dataInput.ShipperZip
        );
        expect(createBolSummaryForm.getFedexEcoDestinationZip()).toEqual(
          dataInput.ConsigneeZip
        );
        expect(createBolSummaryForm.getFedexEcoCarrier()).toEqual(
          dataInput.CarrierType
        );
        browser.sleep(4000);

        externalDashboardForm.clickOnGoToDashboard();
        browser.sleep(2000);
      });
    });
  });

  it("should create Bol for Reddaway carrier with NonItemized Shipment", function () {
    browser.sleep(5000).then(function () {
      var externalDashboardForm = new ExternalDashboardForm();
      var createBolForm = new CreateBolForm();
      var createBolSummaryForm = new CreateBolSummaryForm();
      externalDashboardForm.clickOnCreateBol();
      browser.sleep(2000);
      $("body").sendKeys(protractor.Key.ESCAPE);
      var dataInput = testDataInfo.data.reddaway_nonItemized;

      console.log("value for dataObj dataInput", dataInput);

      createBolQuote.setShipmentType(dataInput, createBolForm);
      createBolQuote.setDataInObject(dataInput, createBolForm);
      createBolQuote.createBolQuote(browser, createBolForm);

      browser.sleep(10000);
      browser.sleep(10000).then(function () {
        browser.sleep(4000);

        expect(createBolSummaryForm.getReddawayOriginZip()).toEqual(
          dataInput.ShipperZip
        );
        expect(createBolSummaryForm.getReddawayDestinationZip()).toEqual(
          dataInput.ConsigneeZip
        );
        expect(createBolSummaryForm.getReddawayCarrier()).toEqual(
          dataInput.CarrierType
        );
        browser.sleep(4000);

        externalDashboardForm.clickOnGoToDashboard();
        browser.sleep(2000);
      });
    });
  });

  it("should create Bol for YRC carrier with Itemized Shipment", function () {
    console.log("Yrc quote creation");
    browser.sleep(5000).then(function () {
      var createBolForm = new CreateBolForm();
      var createBolQuote = new CreateBolQuote();
      var externalDashboardForm = new ExternalDashboardForm();
      var createBolSummaryForm = new CreateBolSummaryForm();
      externalDashboardForm.clickOnCreateBol();
      browser.sleep(2000);
      $("body").sendKeys(protractor.Key.ESCAPE);
      var dataInput = testDataInfo.data.yrc_Itemized;

      console.log("value for dataObj dataInput", dataInput);
      createBolQuote.setShipmentType(dataInput, createBolForm);
      createBolQuote.setDataInObject(dataInput, createBolForm);
      createBolQuote.createBolQuote(browser, createBolForm, dataInput);

      browser.sleep(10000);
      browser.sleep(10000).then(function () {
        browser.sleep(4000);

        expect(createBolSummaryForm.getYrcOriginZip()).toEqual(
          dataInput.ShipperZip
        );
        expect(createBolSummaryForm.getYrcDestinationZip()).toEqual(
          dataInput.ConsigneeZip
        );
        expect(createBolSummaryForm.getYrcCarrier()).toEqual(
          dataInput.CarrierType
        );
        browser.sleep(4000);

        externalDashboardForm.clickOnGoToDashboard();
        browser.sleep(2000);
      });
    });
    browser.sleep(2000);
  });

  it("should create Bol for Fedex Economy carrier with Itemized Shipment", function () {
    browser.sleep(5000).then(function () {
      var externalDashboardForm = new ExternalDashboardForm();
      var createBolForm = new CreateBolForm();
      var createBolSummaryForm = new CreateBolSummaryForm();
      externalDashboardForm.clickOnCreateBol();
      browser.sleep(2000);
      $("body").sendKeys(protractor.Key.ESCAPE);
      var dataInput = testDataInfo.data.fedexEco_Itemized;

      console.log("value for dataObj dataInput", dataInput);
      createBolQuote.setShipmentType(dataInput, createBolForm);
      createBolQuote.setDataInObject(dataInput, createBolForm);
      createBolQuote.createBolQuote(browser, createBolForm, dataInput);

      browser.sleep(10000);
      browser.sleep(10000).then(function () {
        browser.sleep(4000);
        expect(createBolSummaryForm.getFedexEcoOriginZip()).toEqual(
          dataInput.ShipperZip
        );
        expect(createBolSummaryForm.getFedexEcoDestinationZip()).toEqual(
          dataInput.ConsigneeZip
        );
        expect(createBolSummaryForm.getFedexEcoCarrier()).toEqual(
          dataInput.CarrierType
        );
        browser.sleep(4000);
        externalDashboardForm.clickOnGoToDashboard();
        browser.sleep(2000);
      });
    });
  });

  it("should create Bol for Reddaway carrier with Itemized Shipment", function () {
    console.log("Yrc quote creation");
    browser.sleep(5000).then(function () {
      var createBolForm = new CreateBolForm();
      var createBolQuote = new CreateBolQuote();
      var externalDashboardForm = new ExternalDashboardForm();
      var createBolSummaryForm = new CreateBolSummaryForm();
      externalDashboardForm.clickOnCreateBol();
      browser.sleep(2000);
      $("body").sendKeys(protractor.Key.ESCAPE);
      var dataInput = testDataInfo.data.reddaway_Itemized;

      console.log("value for dataObj dataInput", dataInput);
      createBolQuote.setShipmentType(dataInput, createBolForm);
      createBolQuote.setDataInObject(dataInput, createBolForm);
      createBolQuote.createBolQuote(browser, createBolForm, dataInput);

      browser.sleep(10000);
      browser.sleep(10000).then(function () {
        browser.sleep(4000);

        expect(createBolSummaryForm.getReddawayOriginZip()).toEqual(
          dataInput.ShipperZip
        );
        expect(createBolSummaryForm.getReddawayDestinationZip()).toEqual(
          dataInput.ConsigneeZip
        );
        expect(createBolSummaryForm.getReddawayCarrier()).toEqual(
          dataInput.CarrierType
        );
        browser.sleep(4000);

        externalDashboardForm.clickOnGoToDashboard();
        browser.sleep(2000);
      });
    });
    browser.sleep(2000);
  });

  it("should create Bol for YRC carrier with Multi Class Shipment", function () {
    console.log("Yrc quote creation");
    browser.sleep(5000).then(function () {
      var createBolForm = new CreateBolForm();
      var createBolQuote = new CreateBolQuote();
      var externalDashboardForm = new ExternalDashboardForm();
      var createBolSummaryForm = new CreateBolSummaryForm();
      externalDashboardForm.clickOnCreateBol();
      browser.sleep(2000);
      $("body").sendKeys(protractor.Key.ESCAPE);
      var dataInput = testDataInfo.data.yrc_MultiClass;

      console.log("value for dataObj dataInput", dataInput);
      createBolQuote.setShipmentType(dataInput, createBolForm);
      createBolQuote.setDataInObject(dataInput, createBolForm);
      createBolQuote.createBolQuote(browser, createBolForm, dataInput);

      browser.sleep(10000);
      browser.sleep(10000).then(function () {
        browser.sleep(4000);

        expect(createBolSummaryForm.getYrcOriginZip()).toEqual(
          dataInput.ShipperZip
        );
        expect(createBolSummaryForm.getYrcDestinationZip()).toEqual(
          dataInput.ConsigneeZip
        );
        expect(createBolSummaryForm.getYrcCarrier()).toEqual(
          dataInput.CarrierType
        );
        browser.sleep(4000);

        externalDashboardForm.clickOnGoToDashboard();
        browser.sleep(2000);
      });
    });
    browser.sleep(2000);
  });

  it("should create Bol for Fedex Economy carrier with Multi class Shipment", function () {
    browser.sleep(5000).then(function () {
      var externalDashboardForm = new ExternalDashboardForm();
      var createBolForm = new CreateBolForm();
      var createBolSummaryForm = new CreateBolSummaryForm();
      externalDashboardForm.clickOnCreateBol();
      browser.sleep(2000);
      $("body").sendKeys(protractor.Key.ESCAPE);
      var dataInput = testDataInfo.data.fedexEco_MultiClass;

      console.log("value for dataObj dataInput", dataInput);
      createBolQuote.setShipmentType(dataInput, createBolForm);
      createBolQuote.setDataInObject(dataInput, createBolForm);
      createBolQuote.createBolQuote(browser, createBolForm, dataInput);

      browser.sleep(10000);
      browser.sleep(10000).then(function () {
        browser.sleep(4000);
        expect(createBolSummaryForm.getFedexEcoOriginZip()).toEqual(
          dataInput.ShipperZip
        );
        expect(createBolSummaryForm.getFedexEcoDestinationZip()).toEqual(
          dataInput.ConsigneeZip
        );
        expect(createBolSummaryForm.getFedexEcoCarrier()).toEqual(
          dataInput.CarrierType
        );
        browser.sleep(4000);

        externalDashboardForm.clickOnGoToDashboard();
        browser.sleep(2000);
      });
    });
  });

  it("should create Bol for Reddaway carrier with Multi Class Shipment", function () {
    console.log("Yrc quote creation");
    browser.sleep(5000).then(function () {
      var createBolForm = new CreateBolForm();
      var createBolQuote = new CreateBolQuote();
      var externalDashboardForm = new ExternalDashboardForm();
      var createBolSummaryForm = new CreateBolSummaryForm();
      externalDashboardForm.clickOnCreateBol();
      browser.sleep(2000);
      $("body").sendKeys(protractor.Key.ESCAPE);
      var dataInput = testDataInfo.data.reddaway_MultiClass;

      console.log("value for dataObj dataInput", dataInput);
      createBolQuote.setShipmentType(dataInput, createBolForm);
      createBolQuote.setDataInObject(dataInput, createBolForm);
      createBolQuote.createBolQuote(browser, createBolForm, dataInput);

      browser.sleep(10000);

      browser.sleep(10000).then(function () {
        browser.sleep(4000);

        expect(createBolSummaryForm.getReddawayOriginZip()).toEqual(
          dataInput.ShipperZip
        );
        expect(createBolSummaryForm.getReddawayDestinationZip()).toEqual(
          dataInput.ConsigneeZip
        );
        expect(createBolSummaryForm.getReddawayCarrier()).toEqual(
          dataInput.CarrierType
        );
        browser.sleep(4000);

        // externalDashboardForm.clickOnGoToDashboard();
        browser.sleep(2000);
      });
    });
    browser.sleep(2000);
  });
});
