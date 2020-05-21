var LogisticsLoginPage = require("./pageobjects/LoginForm");

var InternalForm = require("./pageobjects/InternalViewForm");

var LocalStorageValues = require("./pageobjects/LocalStorateValues");

var testDataInfo = require("./testdata.json");

describe("YRC Quote Creation by admin testcases", function () {
  beforeAll(function () {
    //browser.manage().timeouts().implicitlyWait(3000);

    //Attn Deepak: example to read the json: am reading the test data frm testdata.json

    console.log("test data:", testDataInfo.data.venilla_quote.Class);

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

  it("should calculate the net charge properly for vanilla inputs", function () {
    browser.sleep(3000).then(function () {
      var internalForm = new InternalForm();

      browser.sleep(2000);

      internalForm.selectCompany();

      browser.sleep(2000);

      internalForm.setOrginzipcode(
        testDataInfo.data.venilla_quote.Originzipcode
      );
      internalForm.setDestinationzipcode(
        testDataInfo.data.venilla_quote.Destinationzipcode
      );
      internalForm.setClass(testDataInfo.data.venilla_quote.Class);
      internalForm.setWeight(testDataInfo.data.venilla_quote.Weight);

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
        internalForm.clickViewButtonYrc();

        browser.sleep(2000);
        var yrcApGrossElem = element(by.id("yrcAPGrosscharge"));
        var yrcArGrossElem = element(by.id("yrcARGross"));

        var yrcArDiscountedRateElem = element(by.id("yrcArDiscountedRate"));
        var yrcArNetChargeElem = element(by.id("yrcArNetCahrge"));

        const quoteObj = internalForm.calculateNetCharge(
          testDataInfo.data.venilla_quote.ar_gross_charge,
          testDataInfo.data.ar_discount,
          testDataInfo.data.ar_fuel_charge
        );

        browser.actions().mouseMove(yrcArNetChargeElem).perform();
        browser.sleep(1000);

        expect(yrcApGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.venilla_quote.ap_gross_charge
        );
        expect(yrcArGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.venilla_quote.ar_gross_charge
        );

        expect(yrcArDiscountedRateElem.getText()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(yrcArNetChargeElem.getText()).toEqual("$" + quoteObj.netCharge);
      });
    });

    browser.sleep(3000);
  });

  it("should calculate the net charge properly for ORIGIN/DESTINATION BEING CA", function () {
    browser.sleep(3000).then(function () {
      console.log("inside the second scnerio..");
      // browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();

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
      browser.sleep(3000);

      internalForm.clickGetQuote();

      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonYrc();

        browser.sleep(2000);

        var yrcApGrossElem = element(by.id("yrcAPGrosscharge"));
        var yrcArGrossElem = element(by.id("yrcARGross"));

        var yrcApCaChargeElem = element(by.id("yrcApAdditional"));
        var yrcArCaChargeElem = element(by.id("yrcArAdditional"));

        var yrcArDiscountedRateElem = element(by.id("yrcArDiscountedRate"));
        var yrcArNetChargeElem = element(by.id("yrcArNetCahrge"));

        const quoteObj = internalForm.calculateNetCharge(
          testDataInfo.data.ca_quote.ar_gross_charge,
          testDataInfo.data.ar_discount,
          testDataInfo.data.ar_fuel_charge
        );

        browser.actions().mouseMove(yrcArNetChargeElem).perform();
        browser.sleep(1000);

        expect(yrcApGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.ca_quote.ap_gross_charge
        );
        expect(yrcArGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.ca_quote.ar_gross_charge
        );

        expect(yrcApCaChargeElem.getText()).toEqual(
          "CA Charge - $" + testDataInfo.data.ca_quote.ca_charge
        );
        expect(yrcArCaChargeElem.getText()).toEqual(
          "CA Charge - $" + testDataInfo.data.ca_quote.ca_charge
        );
        expect(yrcArDiscountedRateElem.getText()).toEqual(
          "$" + quoteObj.discountedRate
        );
        expect(yrcArNetChargeElem.getText()).toEqual("$" + quoteObj.netCharge);
      });
    });
    browser.sleep(3000);
  });

  it("should calculate the net charge properly for Yrc Quote creations by non direct", function () {
    browser.sleep(5000).then(function () {
      console.log("inside the third  scanerio ..");
      // browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
      $("body").sendKeys(protractor.Key.ESCAPE);
      var internalForm = new InternalForm();

      internalForm.setOrginzipcode(
        testDataInfo.data.non_direct_zip.Originzipcode
      );
      internalForm.setDestinationzipcode(
        testDataInfo.data.non_direct_zip.Destinationzipcode
      );
      internalForm.setClass(testDataInfo.data.non_direct_zip.Class);
      internalForm.setWeight(testDataInfo.data.non_direct_zip.Weight);

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

        browser.sleep(2000);

        var yrcApGrossElem = element(by.id("yrcAPGrosscharge"));
        var yrcArGrossElem = element(by.id("yrcARGross"));

        var yrcShipTypesElem = element(by.id("yrcshipTypesAP"));
        var yrcApCaChargeElem = element(by.id("yrcArAdditional"));

        var yrcArDiscountedRateElem = element(by.id("yrcArDiscountedRate"));
        var yrcArNetChargeElem = element(by.id("yrcArNetCahrge"));

        browser.actions().mouseMove(yrcArNetChargeElem).perform();
        browser.sleep(1000);

        const quoteObj = internalForm.calculateNetCharge(
          testDataInfo.data.non_direct_zip.ar_gross_charge,
          testDataInfo.data.ar_nondirect_discount,
          testDataInfo.data.ar_fuel_charge
        );

        yrcShipTypesElem.getText().then(function (text) {
          expect(text).toEqual(testDataInfo.data.non_direct_zip.ship_type);
        });

        expect(yrcApGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.non_direct_zip.ap_gross_charge
        );
        expect(yrcArGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.non_direct_zip.ar_gross_charge
        );

        expect(yrcApCaChargeElem.getText()).toEqual(
          "CA Charge - $" + testDataInfo.data.non_direct_zip.ca_charge
        );
        expect(yrcApCaChargeElem.getText()).toEqual(
          "CA Charge - $" + testDataInfo.data.non_direct_zip.ca_charge
        );

        expect(yrcArDiscountedRateElem.getText()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(yrcArNetChargeElem.getText()).toEqual("$" + quoteObj.netCharge);
      });
    });
    browser.sleep(2000);
  });

  it("should calculate the net charge properly for Yrc quote creation for Highcost related to Min charge", function () {
    browser.sleep(3000).then(function () {
      console.log("inside the fourth scnerio..");
      // browser.actions().sendKeys(protractor.Key.ESCAPE).perform();

      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();

      internalForm.setOrginzipcode(
        testDataInfo.data.highcost_min.Originzipcode
      );
      internalForm.setDestinationzipcode(
        testDataInfo.data.highcost_min.Destinationzipcode
      );
      internalForm.setClass(testDataInfo.data.highcost_min.Class);
      internalForm.setWeight(testDataInfo.data.highcost_min.Weight);

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

        browser.sleep(2000);

        var yrcApGrossElem = element(by.id("yrcAPGrosscharge"));
        var yrcArGrossElem = element(by.id("yrcARGross"));

        var yrcApHighCostElem = element(by.id("yrcApHighCost"));
        var yrcArHighCostElem = element(by.id("yrcArHighCost"));
        var yrcApCaChargeElem = element(by.id("yrcArAdditional"));

        var yrcArDiscountedRateElem = element(by.id("yrcArDiscountedRate"));
        var yrcArNetChargeElem = element(by.id("yrcArNetCahrge"));

        browser.actions().mouseMove(yrcArNetChargeElem).perform();
        browser.sleep(1000);

        const quoteObj = internalForm.calculateNetCharge(
          testDataInfo.data.highcost_min.ar_gross_charge,
          testDataInfo.data.ar_nondirect_discount,
          testDataInfo.data.ar_fuel_charge
        );

        expect(yrcApGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.highcost_min.ap_gross_charge
        );
        expect(yrcArGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.highcost_min.ar_gross_charge
        );

        expect(yrcApCaChargeElem.getText()).toEqual(
          "CA Charge - $" + testDataInfo.data.highcost_min.ca_charge
        );
        expect(yrcApCaChargeElem.getText()).toEqual(
          "CA Charge - $" + testDataInfo.data.highcost_min.ca_charge
        );

        // for high cost.
        expect(yrcApHighCostElem.getText()).toEqual(
          "High Cost - $" + testDataInfo.data.highcost_min.high_cost_charge
        );
        expect(yrcArHighCostElem.getText()).toEqual(
          "High Cost - $" + testDataInfo.data.highcost_min.high_cost_charge
        );

        expect(yrcArDiscountedRateElem.getText()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(yrcArNetChargeElem.getText()).toEqual("$" + quoteObj.netCharge);
      });
    });
    browser.sleep(4000);
  });

  it("should calculate the net charge properly for  Yrc Quote creation for Highcost zip with no min charge", function () {
    browser.sleep(5000).then(function () {
      console.log("inside the fifth scnerio..");
      // browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();

      internalForm.setOrginzipcode(
        testDataInfo.data.highcost_no_min.Originzipcode
      );
      internalForm.setDestinationzipcode(
        testDataInfo.data.highcost_no_min.Destinationzipcode
      );
      internalForm.setClass(testDataInfo.data.highcost_no_min.Class);
      internalForm.setWeight(testDataInfo.data.highcost_no_min.Weight);

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

        browser.sleep(2000);

        var yrcApGrossElem = element(by.id("yrcAPGrosscharge"));
        var yrcArGrossElem = element(by.id("yrcARGross"));

        var yrcApHighCostElem = element(by.id("yrcApHighCost"));
        var yrcArHighCostElem = element(by.id("yrcArHighCost"));

        browser.actions().mouseMove(yrcArHighCostElem).perform();
        browser.sleep(1000);

        var yrcApCaChargeElem = element(by.id("yrcArAdditional"));

        var yrcArDiscountedRateElem = element(by.id("yrcArDiscountedRate"));
        var yrcArNetChargeElem = element(by.id("yrcArNetCahrge"));

        const quoteObj = internalForm.calculateNetCharge(
          testDataInfo.data.highcost_no_min.ar_gross_charge,
          testDataInfo.data.ar_discount,
          testDataInfo.data.ar_fuel_charge
        );

        expect(yrcApGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.highcost_no_min.ap_gross_charge
        );
        expect(yrcArGrossElem.getText()).toEqual(
          "$" + testDataInfo.data.highcost_no_min.ar_gross_charge
        );

        expect(yrcApCaChargeElem.getText()).toEqual(
          "CA Charge - $" + testDataInfo.data.highcost_no_min.ca_charge
        );
        expect(yrcApCaChargeElem.getText()).toEqual(
          "CA Charge - $" + testDataInfo.data.highcost_no_min.ca_charge
        );

        // for high cost.
        expect(yrcApHighCostElem.getText()).toEqual(
          "High Cost - $" + testDataInfo.data.highcost_no_min.high_cost_charge
        );
        expect(yrcArHighCostElem.getText()).toEqual(
          "High Cost - $" + testDataInfo.data.highcost_no_min.high_cost_charge
        );

        expect(yrcArDiscountedRateElem.getText()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(yrcArNetChargeElem.getText()).toEqual("$" + quoteObj.netCharge);
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
