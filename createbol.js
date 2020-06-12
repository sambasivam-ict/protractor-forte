var LogisticsLoginPage = require("./pageobjects/LoginForm");

var ExternalDashboardForm = require("./pageobjects/ExternalDashboardForm");

var LocalStorageValues = require("./pageobjects/LocalStorateValues");

var testDataInfo = require("./createBolTestdata.json");

var CreateBolForm = require("./pageobjects/CreateBolForm");

var CreateBolQuote = require("./common/createBolquote");

var CreateBolSummaryForm = require("./pageobjects/CreateBolSummaryForm");

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
    browser.get(testDataInfo.data.environment_url);

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

  it("should create Bol for YRC carrier with Non-Itemized Shipment", function () {
    console.log("Yrc Bol creation");
    browser.sleep(5000).then(function () {
      var createBolForm = new CreateBolForm();
      var createBolQuote = new CreateBolQuote();
      var externalDashboardForm = new ExternalDashboardForm();
      var createBolSummaryForm = new CreateBolSummaryForm();
      $("body").sendKeys(protractor.Key.ESCAPE);
      var dataInput = testDataInfo.data.yrc_nonItemized;

      console.log("value for dataObj dataInput", dataInput);
      createBolQuote.setDataInObject(dataInput, createBolForm);
      createBolQuote.createBolQuote(browser, createBolForm);

      browser.sleep(2000);
      expect(true).toEqual(true);
      browser.sleep(10000).then(function () {
        browser.sleep(2000);

        expect(createBolSummaryForm.getYrcOriginZip()).toEqual(
          dataInput.ShipperZip
        );
        expect(createBolSummaryForm.getYrcDestinationZip()).toEqual(
          dataInput.ConsigneeZip
        );
        expect(createBolSummaryForm.getYrcCarrier()).toEqual(
          dataInput.CarrierType
        );
        browser.sleep(2000);

        externalDashboardForm.clickOnGoToDashboard();
        browser.sleep(2000);
      });
    });
    browser.sleep(2000);
  });
  it("should create Bol for Fedex Economy carrier with Non-Itemized Shipment", function () {
    browser.sleep(5000).then(function () {
      var externalDashboardForm = new ExternalDashboardForm();
      var createBolForm = new CreateBolForm();
      var createBolSummaryForm = new CreateBolSummaryForm();
      externalDashboardForm.clickOnCreateBol();
      browser.sleep(2000);
      $("body").sendKeys(protractor.Key.ESCAPE);
      var dataInput = testDataInfo.data.fedexEco_nonItemized;

      console.log("value for dataObj dataInput", dataInput);
      createBolQuote.setDataInObject(dataInput, createBolForm);
      createBolQuote.createBolQuote(browser, createBolForm);

      browser.sleep(2000);
      expect(true).toEqual(true);
      browser.sleep(10000).then(function () {
        browser.sleep(2000);
        expect(createBolSummaryForm.getFedexEcoOriginZip()).toEqual(
          dataInput.ShipperZip
        );
        expect(createBolSummaryForm.getFedexEcoDestinationZip()).toEqual(
          dataInput.ConsigneeZip
        );
        expect(createBolSummaryForm.getFedexEcoCarrier()).toEqual(
          dataInput.CarrierType
        );
        browser.sleep(2000);

        externalDashboardForm.clickOnGoToDashboard();
        browser.sleep(2000);
      });
    });
  });

  it("should create Bol for Reddaway carrier with Non-Itemized Shipment", function () {
    browser.sleep(5000).then(function () {
      $("body").sendKeys(protractor.Key.ESCAPE);
      browser.sleep(2000);
    });
    browser.sleep(2000);
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

      browser.sleep(2000);
      expect(true).toEqual(true);
      browser.sleep(10000).then(function () {
        browser.sleep(2000);

        expect(createBolSummaryForm.getYrcOriginZip()).toEqual(
          dataInput.ShipperZip
        );
        expect(createBolSummaryForm.getYrcDestinationZip()).toEqual(
          dataInput.ConsigneeZip
        );
        expect(createBolSummaryForm.getYrcCarrier()).toEqual(
          dataInput.CarrierType
        );
        browser.sleep(2000);

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

      browser.sleep(2000);
      expect(true).toEqual(true);
      browser.sleep(10000).then(function () {
        browser.sleep(2000);
        expect(createBolSummaryForm.getFedexEcoOriginZip()).toEqual(
          dataInput.ShipperZip
        );
        expect(createBolSummaryForm.getFedexEcoDestinationZip()).toEqual(
          dataInput.ConsigneeZip
        );
        expect(createBolSummaryForm.getFedexEcoCarrier()).toEqual(
          dataInput.CarrierType
        );
        browser.sleep(2000);
      });
    });
  });
});
