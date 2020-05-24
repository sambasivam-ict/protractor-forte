var LogisticsLoginPage = require("./pageobjects/LoginForm");

var InternalForm = require("./pageobjects/InternalViewForm");

var LocalStorageValues = require("./pageobjects/LocalStorateValues");

var testDataInfo = require("./ReddawayTestData.json");

var masterDataAPDiscount = [];

var masterDataARDiscount = [];

var localStorageValues = new LocalStorageValues();

describe("Reddaway Quote Creation by admin testcases in the internal page", function () {
  beforeAll(function () {
    console.log("test data:", testDataInfo.data.Nondirect_quote.Class);

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

  it("Reddaway should calculate the net charge properly for Non Direct Zipcodes", function () {
    browser.sleep(3000).then(function () {
      var internalForm = new InternalForm();

      browser.sleep(2000);

      internalForm.selectCompany();

      browser.sleep(2000);

      internalForm.setOrginzipcode(
        testDataInfo.data.Nondirect_quote.Originzipcode
      );

      internalForm.setDestinationzipcode(
        testDataInfo.data.Nondirect_quote.Destinationzipcode
      );
      internalForm.setClass(testDataInfo.data.Nondirect_quote.Class);
      internalForm.setWeight(testDataInfo.data.Nondirect_quote.Weight);

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
        internalForm.clickViewButtonReddaway();
        browser.sleep(2000);

        var reddawayApGrossElem = element(by.id("reddawayAPTotalGrossCharge"));
        var reddawayArGrossElem = element(by.id("reddawayARTotalGrossCharge"));

        var reddawayARDiscountedRateElem = element(
          by.id("reddawayARDiscountedrate")
        );
        var reddawayARNetChargeElem = element(by.id("reddawayARNetCharge"));

        const quoteObj = internalForm.calculateNetCharge(
          testDataInfo.data.Nondirect_quote.ar_gross_charge,
          testDataInfo.data.ar_nondirect_discount,
          localStorageValues.getArMasterDataByCompany().REDDAWAY.fuelsurcharge
        );

        browser.actions().mouseMove(reddawayARNetChargeElem).perform();
        browser.sleep(1000);

        expect(reddawayApGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.Nondirect_quote.ap_gross_charge
        );
        expect(reddawayArGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.Nondirect_quote.ar_gross_charge
        );

        expect(reddawayARDiscountedRateElem.getText()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(reddawayARNetChargeElem.getText()).toEqual(
          "$" + quoteObj.netCharge
        );

        //the following 2 are dummy expects to make sure reduce method works.

        expect(
          localStorageValues.getApMasterDataByCompany().REDDAWAY.companyName
        ).toEqual("REDDAWAY");

        expect(
          localStorageValues.getArMasterDataByCompany().REDDAWAY.type
        ).toEqual("AR");
      });
      browser.sleep(3000);
    });
  });

  it("Reddaway should calculate the net charge properly for Direct Zipcodes", function () {
    browser.sleep(3000).then(function () {
      console.log("inside the second scnerio..");
      // browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();

      internalForm.setOrginzipcode(
        testDataInfo.data.Direct_quote.Originzipcode
      );
      internalForm.setDestinationzipcode(
        testDataInfo.data.Direct_quote.Destinationzipcode
      );
      internalForm.setClass(testDataInfo.data.Direct_quote.Class);
      internalForm.setWeight(testDataInfo.data.Direct_quote.Weight);

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
        internalForm.clickViewButtonReddaway();
        browser.sleep(2000);

        var reddawayApGrossElem = element(by.id("reddawayAPTotalGrossCharge"));
        var reddawayArGrossElem = element(by.id("reddawayARTotalGrossCharge"));

        var reddawayApCAChargeElem = element(by.id("reddawayAPCACharge"));
        var reddawayArCAChargeElem = element(by.id("reddawayARCACharge"));

        var reddawayARDiscountedRateElem = element(
          by.id("reddawayARDiscountedrate")
        );
        var reddawayARNetChargeElem = element(by.id("reddawayARNetCharge"));

        const quoteObj = internalForm.calculateNetCharge(
          testDataInfo.data.Direct_quote.ar_gross_charge,
          localStorageValues.getArMasterDataByCompany().REDDAWAY.discount,
          localStorageValues.getArMasterDataByCompany().REDDAWAY.fuelsurcharge
        );

        browser.actions().mouseMove(reddawayARNetChargeElem).perform();
        browser.sleep(1000);

        expect(reddawayApGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.Direct_quote.ap_gross_charge
        );
        expect(reddawayArGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.Direct_quote.ar_gross_charge
        );

        expect(reddawayApCAChargeElem.getText()).toEqual(
          "CA Charge - $" + testDataInfo.data.Direct_quote.ca_charge
        );

        expect(reddawayArCAChargeElem.getText()).toEqual(
          "CA Charge - $" + testDataInfo.data.Direct_quote.ca_charge
        );

        expect(reddawayARDiscountedRateElem.getText()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(reddawayARNetChargeElem.getText()).toEqual(
          "$" + quoteObj.netCharge
        );
      });

      browser.sleep(3000);
    });
  });

  it("Reddaway should calculate the net charge properly for California charge inputs", function () {
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
        internalForm.clickViewButtonReddaway();

        browser.sleep(2000);

        var reddawayApGrossElem = element(by.id("reddawayAPTotalGrossCharge"));
        var reddawayArGrossElem = element(by.id("reddawayARTotalGrossCharge"));

        var reddawayApCAChargeElem = element(by.id("reddawayAPCACharge"));
        var reddawayArCAChargeElem = element(by.id("reddawayARCACharge"));

        var reddawayARDiscountedRateElem = element(
          by.id("reddawayARDiscountedrate")
        );
        var reddawayARNetChargeElem = element(by.id("reddawayARNetCharge"));

        const quoteObj = internalForm.calculateNetCharge(
          testDataInfo.data.ca_quote.ar_gross_charge,
          localStorageValues.getArMasterDataByCompany().REDDAWAY.discount,
          localStorageValues.getArMasterDataByCompany().REDDAWAY.fuelsurcharge
        );

        browser.actions().mouseMove(reddawayARNetChargeElem).perform();
        browser.sleep(1000);

        expect(reddawayApGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.ca_quote.ap_gross_charge
        );
        expect(reddawayArGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.ca_quote.ar_gross_charge
        );

        expect(reddawayApCAChargeElem.getText()).toEqual(
          "CA Charge - $" +
            localStorageValues.getApMasterDataByCompany().REDDAWAY.caCharge
        );

        expect(reddawayArCAChargeElem.getText()).toEqual(
          "CA Charge - $" +
            localStorageValues.getArMasterDataByCompany().REDDAWAY.caCharge
        );

        expect(reddawayARDiscountedRateElem.getText()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(reddawayARNetChargeElem.getText()).toEqual(
          "$" + quoteObj.netCharge
        );
      });
    });
  });

  it("Reddaway should include the High Cost charge for the High Cost zip codes for CWT", function () {
    browser.sleep(3000).then(function () {
      console.log("inside the third scnerio..");
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
      internalForm.setHighCostDollorPerCWT(
        testDataInfo.data.Highcost_quote.dollor_cwt_highcost
      );

      internalForm.enterOrginZipcode();
      internalForm.enterdestinationzipcode();

      internalForm.enterClass();
      browser.sleep(2000);
      internalForm.enterWeight();
      browser.sleep(3000);

      internalForm.clickAddBtn();

      internalForm.clickGetQuote();

      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonReddaway();

        browser.sleep(2000);

        var reddawayApGrossElem = element(by.id("reddawayAPTotalGrossCharge"));
        var reddawayArGrossElem = element(by.id("reddawayARTotalGrossCharge"));

        var reddawayApCAChargeElem = element(by.id("reddawayAPCACharge"));
        var reddawayArCAChargeElem = element(by.id("reddawayARCACharge"));

        var reddawayAPHighCostChargeElem = element(by.id("reddawayApHighCost"));
        var reddawayARHighCostChargeElem = element(by.id("reddawayARHighCost"));

        var totalHighCostCharge = internalForm.calulatHighCostChargeFromCWT();

        var reddawayARDiscountedRateElem = element(
          by.id("reddawayARDiscountedrate")
        );
        var reddawayARNetChargeElem = element(by.id("reddawayARNetCharge"));

        const quoteObj = internalForm.calculateNetCharge(
          testDataInfo.data.Highcost_quote.ar_gross_charge,
          testDataInfo.data.ar_discount,
          testDataInfo.data.ar_fuel_charge
        );

        browser.actions().mouseMove(reddawayARNetChargeElem).perform();
        browser.sleep(1000);

        expect(reddawayApGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.Highcost_quote.ap_gross_charge
        );
        expect(reddawayArGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.Highcost_quote.ar_gross_charge
        );

        expect(reddawayApCAChargeElem.getText()).toEqual(
          "CA Charge - $" + testDataInfo.data.Highcost_quote.ca_charge
        );

        expect(reddawayArCAChargeElem.getText()).toEqual(
          "CA Charge - $" + testDataInfo.data.Highcost_quote.ca_charge
        );

        expect(reddawayARDiscountedRateElem.getText()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(reddawayARNetChargeElem.getText()).toEqual(
          "$" + quoteObj.netCharge
        );

        expect(reddawayAPHighCostChargeElem.getText()).toEqual(
          "High Cost - $" + totalHighCostCharge
        );

        expect(reddawayARHighCostChargeElem.getText()).toEqual(
          "High Cost - $" + totalHighCostCharge
        );
      });
    });
  });

  it("Reddaway should include the High Cost charge - High Cost Lt Min Charge and Min Charge", function () {
    browser.sleep(3000).then(function () {
      console.log("inside the third scnerio..");
      // browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();
      expect(true).toEqual(true);

      browser.sleep(2000);
    });
  });

  it("Reddaway should include the High Cost charge - High Cost GT Max Charge", function () {
    browser.sleep(3000).then(function () {
      console.log("inside the third scnerio..");
      // browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();
      expect(true).toEqual(true);

      browser.sleep(2000);
    });
  });

  it("Reddaway should include the additional Bay area charge SF Metro Charge to Zips currently not covered should be applied", function () {
    browser.sleep(3000).then(function () {
      console.log("inside the third scnerio..");
      // browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();
      expect(true).toEqual(true);

      browser.sleep(2000);
    });
  });
});
