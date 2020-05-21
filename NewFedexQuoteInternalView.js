var LogisticsLoginPage = require("./pageobjects/LoginForm");

var InternalForm = require("./pageobjects/InternalViewForm");

var LocalStorageValues = require("./pageobjects/LocalStorateValues");

var testDataInfo = require("./FedexTestData.json");

describe("Fedex Economy Quote Creation by admin testcases in Internal Page", function () {
  beforeAll(function () {
    //browser.manage().timeouts().implicitlyWait(3000);

    //Attn Deepak: example to read the json: am reading the test data frm testdata.json

    console.log("test data:", testDataInfo.data.Inter_regional.Class);

    browser.ignoreSynchronization = true;
    browser.get(testDataInfo.data.environment_url);

    var loginPageObj = new LogisticsLoginPage();

    //browser.manage().timeouts().implicitlyWait(3000);

    var credentials = testDataInfo.data.login_credentials_admin;
    loginPageObj.setUserName(credentials.user_name);
    loginPageObj.setPassWord(credentials.password);

    loginPageObj.enterUserName();
    loginPageObj.enterPassword();

    loginPageObj.clickSubmitButton();

    browser.driver.manage().window().maximize();
    browser.sleep(3000);
  });

  afterAll(function () {
    browser.close();
  });

  it("should calculate the net charge properly for Inter-Regional zipcodes", function () {
    browser.sleep(3000).then(function () {
      var internalForm = new InternalForm();

      browser.sleep(2000);

      internalForm.selectCompany();

      browser.sleep(2000);

      internalForm.setOrginzipcode(
        testDataInfo.data.Inter_regional.Originzipcode
      );
      internalForm.setDestinationzipcode(
        testDataInfo.data.Inter_regional.Destinationzipcode
      );
      internalForm.setClass(testDataInfo.data.Inter_regional.Class);
      internalForm.setWeight(testDataInfo.data.Inter_regional.Weight);

      internalForm.enterOrginZipcode();
      internalForm.enterdestinationzipcode();

      internalForm.enterClass();
      browser.sleep(2000);
      internalForm.enterWeight();
      browser.sleep(3000);

      internalForm.clickAddBtn();

      browser.sleep(3000);

      // to be moved to the last part later.

      //internalForm.clickSelectAccessorialMultiSelect();

      //end to be moved to the last part later

      internalForm.clickGetQuote();

      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonFedex();
        browser.sleep(2000);

        var FedexApGrossElem = element(by.id("economyAPtotalGrossCharge"));
        var FedexArGrossElem = element(by.id("economyARTotalGrossCharge"));

        var fedexArDiscountedRateElem = element(
          by.id("economyARDiscountedRate")
        );
        var fedexArNetRateElem = element(by.id("economyARNetCharge"));

        const quoteObj = internalForm.calculateNetCharge(
          testDataInfo.data.Inter_regional.ar_gross_charge,
          testDataInfo.data.ar_discount,
          testDataInfo.data.ar_fuel_charge
        );

        browser.actions().mouseMove(fedexArNetRateElem).perform();
        browser.sleep(1000);

        expect(FedexApGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.Inter_regional.ap_gross_charge
        );
        expect(FedexArGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.Inter_regional.ar_gross_charge
        );
        expect(fedexArDiscountedRateElem.getText()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(fedexArNetRateElem.getText()).toEqual("$" + quoteObj.netCharge);
      });
    });
  });

  it("should calculate the net charge properly for Regional inputs", function () {
    browser.sleep(3000).then(function () {
      console.log("inside the second scnerio..");
      // browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();

      browser.sleep(2000);

      internalForm.selectCompany();

      browser.sleep(2000);

      internalForm.setOrginzipcode(
        testDataInfo.data.Regional_quote.Originzipcode
      );
      internalForm.setDestinationzipcode(
        testDataInfo.data.Regional_quote.Destinationzipcode
      );
      internalForm.setClass(testDataInfo.data.Regional_quote.Class);
      internalForm.setWeight(testDataInfo.data.Regional_quote.Weight);

      internalForm.enterOrginZipcode();
      internalForm.enterdestinationzipcode();

      internalForm.enterClass();
      browser.sleep(2000);
      internalForm.enterWeight();
      browser.sleep(3000);

      internalForm.clickAddBtn();

      internalForm.clickGetQuote();

      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonFedex();
        browser.sleep(2000);
        var FedexApGrossElem = element(by.id("economyAPtotalGrossCharge"));
        var FedexArGrossElem = element(by.id("economyARTotalGrossCharge"));

        var fedexArDiscountedRateElem = element(
          by.id("economyARDiscountedRate")
        );
        var fedexArNetRateElem = element(by.id("economyARNetCharge"));

        const quoteObj = internalForm.calculateNetCharge(
          testDataInfo.data.Regional_quote.ar_gross_charge,
          testDataInfo.data.ar_discount,
          testDataInfo.data.ar_fuel_charge
        );

        browser.actions().mouseMove(fedexArNetRateElem).perform();
        browser.sleep(1000);

        expect(FedexApGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.Regional_quote.ap_gross_charge
        );
        expect(FedexArGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.Regional_quote.ar_gross_charge
        );
        expect(fedexArDiscountedRateElem.getText()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(fedexArNetRateElem.getText()).toEqual("$" + quoteObj.netCharge);
      });
    });
  });

  it("should calculate the net charge properly for California charge inputs", function () {
    browser.sleep(3000).then(function () {
      console.log("inside the third scnerio..");
      // browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();

      browser.sleep(2000);

      internalForm.selectCompany();

      browser.sleep(2000);

      internalForm.setOrginzipcode(testDataInfo.data.ca_quote.Originzipcode);
      internalForm.setDestinationzipcode(
        testDataInfo.data.ca_quote.Destinationzipcode
      );
      internalForm.setClass(testDataInfo.data.ca_quote.Class);
      internalForm.setWeight(testDataInfo.data.ca_quote.Weight);

      internalForm.enterOrginZipcode();
      internalForm.enterdestinationzipcode();

      internalForm.enterClass();
      browser.sleep(2000);
      internalForm.enterWeight();
      browser.sleep(3000);

      internalForm.clickAddBtn();

      internalForm.clickGetQuote();

      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonFedex();

        browser.sleep(2000);

        var FedexApGrossElem = element(by.id("economyAPtotalGrossCharge"));
        var FedexArGrossElem = element(by.id("economyARTotalGrossCharge"));

        var FedexApCaChargeElem = element(by.id("economyAPCACharge"));
        var FedexArCaChargeElem = element(by.id("economyARCACharge"));

        var fedexArDiscountedRateElem = element(
          by.id("economyARDiscountedRate")
        );
        var fedexArNetRateElem = element(by.id("economyARNetCharge"));

        const quoteObj = internalForm.calculateNetCharge(
          testDataInfo.data.ca_quote.ar_gross_charge,
          testDataInfo.data.ar_discount,
          testDataInfo.data.ar_fuel_charge
        );

        browser.actions().mouseMove(FedexArCaChargeElem).perform();
        browser.sleep(1000);

        expect(FedexApGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.ca_quote.ap_gross_charge
        );
        expect(FedexArGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.ca_quote.ar_gross_charge
        );

        expect(fedexArDiscountedRateElem.getText()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(fedexArNetRateElem.getText()).toEqual("$" + quoteObj.netCharge);

        expect(FedexApCaChargeElem.getText()).toEqual(
          "CA Charge - $" + testDataInfo.data.ca_quote.ca_charge
        );
        expect(FedexArCaChargeElem.getText()).toEqual(
          "CA Charge - $" + testDataInfo.data.ca_quote.ca_charge
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

      browser.sleep(2000);

      internalForm.selectCompany();

      browser.sleep(2000);

      internalForm.setOrginzipcode(
        testDataInfo.data.Highcost_quote.Originzipcode
      );
      internalForm.setDestinationzipcode(
        testDataInfo.data.Highcost_quote.Destinationzipcode
      );
      internalForm.setClass(testDataInfo.data.Highcost_quote.Class);
      internalForm.setWeight(testDataInfo.data.Highcost_quote.Weight);

      internalForm.enterOrginZipcode();
      internalForm.enterdestinationzipcode();

      internalForm.enterClass();
      browser.sleep(2000);
      internalForm.enterWeight();
      browser.sleep(3000);

      internalForm.clickAddBtn();

      internalForm.clickGetQuote();

      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonFedex();

        browser.sleep(1000);
        var FedexApGrossElem = element(by.id("economyAPtotalGrossCharge"));
        var FedexArGrossElem = element(by.id("economyARTotalGrossCharge"));

        var fedexArDiscountedRateElem = element(
          by.id("economyARDiscountedRate")
        );
        var fedexArNetRateElem = element(by.id("economyARNetCharge"));

        //var FedexApHighcostChargeElem = element(by.id("Nofedexid"));
        var FedexArHighcostChargeElem = element(by.id("economyARHighCost"));

        const quoteObj = internalForm.calculateNetCharge(
          testDataInfo.data.Highcost_quote.ar_gross_charge,
          testDataInfo.data.ar_discount,
          testDataInfo.data.ar_fuel_charge
        );

        browser.actions().mouseMove(fedexArNetRateElem).perform();
        browser.sleep(2000);

        expect(FedexApGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.Highcost_quote.ap_gross_charge
        );
        expect(FedexArGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.Highcost_quote.ar_gross_charge
        );

        expect(fedexArDiscountedRateElem.getText()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(fedexArNetRateElem.getText()).toEqual("$" + quoteObj.netCharge);

        expect(FedexArHighcostChargeElem.getText()).toEqual(
          "High Cost - $" + testDataInfo.data.Highcost_quote.highcostar_charge
        );
      });
    });
  });
});
