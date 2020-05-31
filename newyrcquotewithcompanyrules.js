var LogisticsLoginPage = require("./pageobjects/LoginForm");

var InternalForm = require("./pageobjects/InternalViewForm");

var LocalStorageValues = require("./pageobjects/LocalStorateValues");

var LtlQuoteForm = require("./common/createltlquote");

var testDataInfo = require("./yrc_testdata_rules.json");

var masterDataAPDiscount = [];
var masterDataARDiscount = [];

var localStorageValues = new LocalStorageValues();

describe("YRC Quote Creation by admin for company that has rules", function () {
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

  // it("YRC Intrastate AMC GT Discounted Rate-net charge should be calculated properly", function () {
  //   browser.sleep(5000).then(function () {
  //     console.log("yrc intra state where amc > intrastate");

  //     var dataObj = testDataInfo.data.yrc_intra_state;
  //     var dataInput = dataObj.amc_gt_dsc_rate;
  //     console.log("value for dataObj", dataObj.company_name);
  //     expect(true).toEqual(true);
  //     //use the datainput for entering origin and destination..
  //   });
  // });

  // it("YRC Intrastate-net charge should be calculated properly for configured ca charge and discounts", function () {
  //   browser.sleep(5000).then(function () {
  //     console.log(
  //       "yrc intra state net charge calculated properly for configured ca charge"
  //     );

  //     var dataObj = testDataInfo.data.yrc_intra_state;
  //     console.log("value for dataObj", dataObj.company_name);

  //     var dataInput = dataObj.ca_highcost_charge;
  //     expect(true).toEqual(true);
  //   });
  // });

  // it("YRC Intrastate-net charge should be calculated properly for fak rules 85 to 200 as 300", function () {
  //   browser.sleep(5000).then(function () {
  //     console.log(
  //       "yrc intra state net charge calculated properly for fak rules 85 to 200 as 300"
  //     );

  //     var dataObj = testDataInfo.data.yrc_intra_state;
  //     console.log("value for dataObj", dataObj.company_name);

  //     var dataInput = dataObj.fak_class_range_data;
  //     expect(true).toEqual(true);
  //   });
  // });
  it("should have CA-High cost charge", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "yrc intra state ca charge net charge calculated properly with high cost charge"
      );
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();
      var dataObj = testDataInfo.data.yrc_intra_state;
      console.log("value for dataObj", dataObj.company_name);
      var dataInput = dataObj.ca_highcost_charge;
      console.log("value for dataObj dataInput", dataInput);
      internalForm.setCompanyName(dataObj.company_name);
      ltlQuoteForm.setDataInObject(dataInput, internalForm);
      ltlQuoteForm.createLtlQuote(browser, internalForm);
      expect(true).toEqual(true);
      
      internalForm.clickGetQuote();
      console.log("4 val", internalForm);
      browser.sleep(10000).then(function () {
        console.log('Inside click event');
        browser.sleep(2000);
        internalForm.clickViewButtonYrc();


        var yrcApGrossElem = element(by.id("yrcAPGrosscharge"));
        var yrcArGrossElem = element(by.id("yrcARGross"));
        var yrcApHighCostElem = element(by.id("yrcApHighCost"));
        var yrcArHighCostElem = element(by.id("yrcArHighCost"));
        console.log('yrcApGrossElem', yrcApGrossElem);
        browser.actions().mouseMove(yrcArHighCostElem).perform();
        browser.sleep(1000);

        var yrcApCaChargeElem = element(by.id("yrcApAdditional"));
        var yrcArCaChargeElem = element(by.id("yrcArAdditional"));

        var yrcArDiscountedRateElem = element(by.id("yrcArDiscountedRate"));
        var yrcArNetChargeElem = element(by.id("yrcArNetCahrge"));

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataInput.ar_discount,
          dataInput.ar_fuel_charge
        );

        expect(yrcApGrossElem.getText()).toEqual(
          "$" + dataInput.ap_gross_charge
        );
        expect(yrcArGrossElem.getText()).toEqual(
          "$" + dataInput.ar_gross_charge
        );

          expect(yrcApCaChargeElem.getText()).toEqual(
           "CA Charge - $" + dataInput.ca_charge
         );
          expect(yrcArCaChargeElem.getText()).toEqual(
            "CA Charge - $" + dataInput.ca_charge
          );

        // for high cost.
        expect(yrcApHighCostElem.getText()).toEqual(
          "High Cost - $" + dataInput.high_cost
        );
        expect(yrcArHighCostElem.getText()).toEqual(
          "High Cost - $" + dataInput.high_cost
        );

        expect(yrcArDiscountedRateElem.getText()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(yrcArNetChargeElem.getText()).toEqual("$" + quoteObj.netCharge);
      });
    });
    browser.sleep(3000);
  });
  it("YRC Interstate-net charge should be calculated properly with high cost charge included", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "yrc inter state net charge calculated properly with high cost charge"
      );
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();
      var dataObj = testDataInfo.data.yrc_inter_state;
      console.log("value for dataObj", dataObj.company_name);
      var dataInput = dataObj.inter_state_high_cost;
      console.log("value for dataObj dataInput", dataInput);
      internalForm.setCompanyName(
        dataObj.company_name
      );
      internalForm.setOrginzipcode(
        dataInput.Originzipcode
      );
      internalForm.setDestinationzipcode(
        dataInput.Destinationzipcode
      );
      internalForm.setClass(
        dataInput.Class
      );
      internalForm.setWeight(
        dataInput.Weight
      );
      internalForm.enterOrginZipcode();
      internalForm.enterdestinationzipcode();

      internalForm.enterClass();
      browser.sleep(2000);
      internalForm.enterWeight();
      browser.sleep(3000);

      internalForm.clickAddBtn();

      browser.sleep(3000);
      console.log('Interstate internalform', internalForm);
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

        var yrcArDiscountedRateElem = element(by.id("yrcArDiscountedRate"));
        var yrcArNetChargeElem = element(by.id("yrcArNetCahrge"));

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataInput.ar_discount,
          dataInput.ar_fuel_charge
        );

        expect(yrcApGrossElem.getText()).toEqual(
          "$" + dataInput.ap_gross_charge
        );
        expect(yrcArGrossElem.getText()).toEqual(
          "$" + dataInput.ar_gross_charge
        );

        expect(yrcApHighCostElem.getText()).toEqual(
          "High Cost - $" + dataInput.high_cost
        );
        expect(yrcArHighCostElem.getText()).toEqual(
          "High Cost - $" + dataInput.high_cost
        );

        expect(yrcArDiscountedRateElem.getText()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(yrcArNetChargeElem.getText()).toEqual("$" + quoteObj.netCharge);
      });
    });
    browser.sleep(3000);
  });
  it("YRC special rules zip to zip should calculate netcharge properly with configured discounts", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "yrc intra state ca charge net charge calculated properly with high cost charge"
      );
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();
      var dataObj = testDataInfo.data.yrc_special_rules;
      console.log("value for dataObj", dataObj.company_name);
      var dataInput = dataObj.zip_to_zip;
      console.log("value for dataObj dataInput", dataInput);
      expect(true).toEqual(true);
      internalForm.setCompanyName(
        dataInput.company_name
      );
      internalForm.setOrginzipcode(
        dataInput.Originzipcode
      );
      internalForm.setDestinationzipcode(
        dataInput.Destinationzipcode
      );
      internalForm.setClass(
        dataInput.Class
      );
      internalForm.setWeight(
        dataInput.Weight
      );
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

        var yrcApCaChargeElem = element(by.id("yrcApAdditional"));
        var yrcArCaChargeElem = element(by.id("yrcArAdditional"));

        var yrcArDiscountedRateElem = element(by.id("yrcArDiscountedRate"));
        var yrcArNetChargeElem = element(by.id("yrcArNetCahrge"));

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataInput.ar_discount,
          dataInput.ar_fuel_charge
        );

        expect(yrcApGrossElem.getText()).toEqual(
          "$" + dataInput.ap_gross_charge
        );
        expect(yrcArGrossElem.getText()).toEqual(
          "$" + dataInput.ar_gross_charge
        );

        expect(yrcApCaChargeElem.getText()).toEqual(
          "CA Charge - $" + dataInput.ca_charge
        );
        expect(yrcArCaChargeElem.getText()).toEqual(
          "CA Charge - $" + dataInput.ca_charge
        );

        expect(yrcApHighCostElem.getText()).toEqual(
          "High Cost - $" + dataInput.high_cost
        );
        expect(yrcArHighCostElem.getText()).toEqual(
          "High Cost - $" + dataInput.high_cost
        );

        expect(yrcArDiscountedRateElem.getText()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(yrcArNetChargeElem.getText()).toEqual("$" + quoteObj.netCharge);
      });
    });
    browser.sleep(3000);
  });
  it("YRC special rules zip to state should calculate netcharge properly with configured discounts", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "yrc intra state ca charge net charge calculated properly with high cost charge"
      );
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();
      var dataObj = testDataInfo.data.yrc_special_rules;
      console.log("value for dataObj", dataObj.company_name);
      var dataInput = dataObj.zip_to_state;
      internalForm.setCompanyName(dataObj.company_name);
      console.log("value for dataObj dataInput", dataInput);
      expect(true).toEqual(true);
      internalForm.setCompanyName(
        dataInput.company_name
      );
      internalForm.setOrginzipcode(
        dataInput.Originzipcode
      );
      internalForm.setDestinationzipcode(
        dataInput.Destinationzipcode
      );
      internalForm.setClass(
        dataInput.Class
      );
      internalForm.setWeight(
        dataInput.Weight
      );
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

        var yrcApCaChargeElem = element(by.id("yrcApAdditional"));
        var yrcArCaChargeElem = element(by.id("yrcArAdditional"));

        var yrcArDiscountedRateElem = element(by.id("yrcArDiscountedRate"));
        var yrcArNetChargeElem = element(by.id("yrcArNetCahrge"));

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataInput.ar_discount,
          dataInput.ar_fuel_charge
        );

        expect(yrcApGrossElem.getText()).toEqual(
          "$" + dataInput.ap_gross_charge
        );
        expect(yrcArGrossElem.getText()).toEqual(
          "$" + dataInput.ar_gross_charge
        );

        expect(yrcApCaChargeElem.getText()).toEqual(
          "CA Charge - $" + dataInput.ca_charge
        );
        expect(yrcArCaChargeElem.getText()).toEqual(
          "CA Charge - $" + dataInput.ca_charge
        );

        expect(yrcApHighCostElem.getText()).toEqual(
          "High Cost - $" + dataInput.high_cost
        );
        expect(yrcArHighCostElem.getText()).toEqual(
          "High Cost - $" + dataInput.high_cost
        );

        expect(yrcArDiscountedRateElem.getText()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(yrcArNetChargeElem.getText()).toEqual("$" + quoteObj.netCharge);
      });
    });
    browser.sleep(3000);
  });
  it('state_to_zip', function () {
    browser.sleep(5000).then(function () {
      console.log(
        "yrc intra state ca charge net charge calculated properly with high cost charge"
      );
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();
      var dataObj = testDataInfo.data.yrc_special_rules;
      console.log("value for dataObj", dataObj.company_name);
      var dataInput = dataObj.state_to_zip;
      console.log("value for dataObj dataInput", dataInput);
      internalForm.setCompanyName(dataObj.company_name);
      expect(true).toEqual(true);
      internalForm.setCompanyName(
        dataInput.company_name
      );
      internalForm.setOrginzipcode(
        dataInput.Originzipcode
      );
      internalForm.setDestinationzipcode(
        dataInput.Destinationzipcode
      );
      internalForm.setClass(
        dataInput.Class
      );
      internalForm.setWeight(
        dataInput.Weight
      );
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

        browser.sleep(1000);

        var yrcArDiscountedRateElem = element(by.id("yrcArDiscountedRate"));
        var yrcArNetChargeElem = element(by.id("yrcArNetCahrge"));
        console.log('yrcArDiscountedRate', yrcArDiscountedRateElem);
        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataInput.ar_discount,
          dataInput.ar_fuel_charge
        );

        expect(yrcApGrossElem.getText()).toEqual(
          "$" + dataInput.ap_gross_charge
        );
        expect(yrcArGrossElem.getText()).toEqual(
          "$" + dataInput.ar_gross_charge
        );

        expect(yrcArDiscountedRateElem.getText()).toEqual(
          "$" + parseFloat(quoteObj.discountedRate)
        );

        expect(yrcArNetChargeElem.getText()).toEqual("$" + quoteObj.netCharge);
      });
    });
    browser.sleep(3000);
  });
  it("YRC special rules ALL to state TX should calculate netcharge properly with configured discounts", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "yrc intra state ca charge net charge calculated properly with high cost charge"
      );
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();
      var dataObj = testDataInfo.data.yrc_special_rules;
      console.log("value for dataObj", dataObj.company_name);
      var dataInput = dataObj.all_to_state;
      console.log("value for dataObj dataInput", dataInput);
      internalForm.setCompanyName(dataObj.company_name);
      ltlQuoteForm.setDataInObject(dataInput, internalForm);
      ltlQuoteForm.createLtlQuote(browser, internalForm);
      expect(true).toEqual(true);

      internalForm.clickGetQuote();
      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonYrc();
        browser.sleep(2000);

        var yrcApGrossElem = element(by.id("yrcAPGrosscharge"));
        var yrcArGrossElem = element(by.id("yrcARGross"));

        var yrcArDiscountedRateElem = element(by.id("yrcArDiscountedRate"));
        var yrcArNetChargeElem = element(by.id("yrcArNetCahrge"));

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataInput.ar_discount,
          dataInput.ar_fuel_charge
        );

        expect(yrcApGrossElem.getText()).toEqual(
          "$" + dataInput.ap_gross_charge
        );
        expect(yrcArGrossElem.getText()).toEqual(
          "$" + dataInput.ar_gross_charge
        );

        expect(yrcArDiscountedRateElem.getText()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(yrcArNetChargeElem.getText()).toEqual("$" + quoteObj.netCharge);
      });
    });
    browser.sleep(3000);
  });
  // it("YRC Cost Plus should calculate netcharge properly with appropriate cost plus factor configured for the company", function () {
  //   browser.sleep(5000).then(function () {
  //     console.log(
  //       "yrc intra state ca charge net charge calculated properly with high cost charge"
  //     );
  //     $("body").sendKeys(protractor.Key.ESCAPE);

  //     var internalForm = new InternalForm();
  //     var ltlQuoteForm = new LtlQuoteForm();
  //     var dataInput = testDataInfo.data.yrc_costplus;
  //    // var dataInput = dataObj.all_to_state;
  //     console.log("value for dataObj dataInput", dataInput);
  //     // ltlQuoteForm.setDataInObject(dataInput, internalForm);
  //     // ltlQuoteForm.createLtlQuote(browser, internalForm);
  //     expect(true).toEqual(true);
  //     internalForm.setCompanyName(
  //       dataInput.company_name
  //     );
  //     internalForm.setOrginzipcode(
  //       dataInput.Originzipcode
  //     );
  //     internalForm.setDestinationzipcode(
  //       dataInput.Destinationzipcode
  //     );
  //     internalForm.setClass(
  //       dataInput.Class
  //     );
  //     internalForm.setWeight(
  //       dataInput.Weight
  //     );
  //     internalForm.enterOrginZipcode();
  //     internalForm.enterdestinationzipcode();

  //     internalForm.enterClass();
  //     browser.sleep(2000);
  //     internalForm.enterWeight();
  //     browser.sleep(3000);

  //     internalForm.clickAddBtn();

  //     browser.sleep(3000);

  //     internalForm.clickGetQuote();
  //     browser.sleep(10000).then(function () {
  //       internalForm.clickViewButtonYrc();
  //       browser.sleep(2000);

  //       var yrcApGrossElem = element(by.id("yrcAPGrosscharge"));
  //       var yrcArGrossElem = element(by.id("yrcARGross"));
  //     //    var yrcApHighCostElem = element(by.id("yrcApHighCost"));
  //     //    var yrcArHighCostElem = element(by.id("yrcArHighCost"));

  //     //  browser.actions().mouseMove(yrcArHighCostElem).perform();
  //     //   browser.sleep(1000);

  //     //  var yrcApCaChargeElem = element(by.id("yrcArAdditional"));

  //       var yrcArDiscountedRateElem = element(by.id("yrcArDiscountedRate"));
  //       var yrcArNetChargeElem = element(by.id("yrcArNetCahrge"));

  //       const quoteObj = internalForm.calculateNetCharge(
  //         dataInput.ap_ar_gross_charge,
  //         dataInput.ap_ar_discount,
  //         dataInput.ap_ar_fuel_charge
  //       );
  //         console.log('quoteObj', quoteObj);
  //       expect(yrcApGrossElem.getText()).toEqual(
  //         "$" + dataInput.ap_ar_gross_charge
  //       );
  //       expect(yrcArGrossElem.getText()).toEqual(
  //         "$" + dataInput.ap_ar_gross_charge
  //       );

  //     //   expect(yrcApCaChargeElem.getText()).toEqual(
  //     //    "CA Charge - $" + testDataInfo.data.highcost_no_min.ca_charge
  //     //  );
  //     //   expect(yrcApCaChargeElem.getText()).toEqual(
  //     //     "CA Charge - $" + testDataInfo.data.highcost_no_min.ca_charge
  //     //   );

  //       // for high cost.
  //       //  expect(yrcApHighCostElem.getText()).toEqual(
  //       //    "High Cost - $" + dataInput.ap_ar_high_cost
  //       //  );
  //       // expect(yrcArHighCostElem.getText()).toEqual(
  //       //   "High Cost - $" + dataInput.ap_ar_high_cost
  //       // );

  //       expect(yrcArDiscountedRateElem.getText()).toEqual(
  //         "$" + quoteObj.discountedRate
  //       );

  //       expect(yrcArNetChargeElem.getText()).toEqual("$" + quoteObj.netCharge);
  //     });
  //   });
  //browser.sleep(3000);
  // });
});
