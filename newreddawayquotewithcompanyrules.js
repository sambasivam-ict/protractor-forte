var LogisticsLoginPage = require("./pageobjects/LoginForm");

var InternalForm = require("./pageobjects/InternalViewForm");

var LocalStorageValues = require("./pageobjects/LocalStorateValues");

var LtlQuoteForm = require("./common/createltlquote");

var testDataInfo = require("./reddaway_testdata_rules.json");

var masterDataAPDiscount = [];
var masterDataARDiscount = [];

var localStorageValues = new LocalStorageValues();

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
      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();

      console.log("Reddaway Regional In Direct Net Charge should be proper");

      var dataObj = testDataInfo.data.reddaway_regional_indirect;
      console.log("value for dataObj", dataObj.company_name);
      console.log("regional origin zip", dataObj.Originzipcode);

      internalForm.setCompanyName(dataObj.company_name);
      ltlQuoteForm.setDataInObject(dataObj, internalForm);
      ltlQuoteForm.createLtlQuoteRules(browser, internalForm);
      internalForm.clickGetQuote();

      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonReddaway();
        browser.sleep(2000);
        var reddawayApGrossElem = element(by.id("reddawayAPTotalGrossCharge"));
        var reddawayArGrossElem = element(by.id("reddawayARTotalGrossCharge"));

        var reddawayArDiscountedRateElem = element(by.id("reddawayARDiscountedrate"));
        var reddawayArNetChargeElem = element(by.id("reddawayARNetCharge"));
        var reddawayApHighCost = element(by.id("reddawayApHighCost"));
        var reddawayArHighCost = element(by.id("reddawayARHighCost"));
        var reddawayApCaCharge = element(by.id("reddawayAPCACharge"));
        var reddawayArCaCharge = element(by.id("reddawayARCACharge"));
        console.log('reddaayApHighCost', expect(reddawayArHighCost.getText()));
        console.log('reddawayApCaCharge', expect(reddawayArCaCharge.getText()));
        console.log('dataObj', dataObj);
        const quoteObj = internalForm.calculateNetCharge(
          dataObj.ar_gross_charge,
          dataObj.ar_discount,
          dataObj.ar_fuel_charge,
          dataObj.ar_amc
        );

        expect(reddawayApGrossElem.getText()).toEqual(
          "$" + dataObj.ap_gross_charge
        );
        expect(reddawayArGrossElem.getText()).toEqual(
          "$" + dataObj.ar_gross_charge
        );
        // expect(reddawayArCaCharge.getText()).toEqual(
        //   "$" + Number(dataObj.ca_charge)
        // );
        // expect(reddawayApCaCharge.getText()).toEqual(
        //   "$" + Number(dataObj.ca_charge)
        // );

        // expect(reddawayApHighCost.getText()).toEqual(
        //   "$" + Number(dataObj.high_cost)
        // );
        // expect(reddawayArHighCost.getText()).toEqual(
        //   "$" + Number(dataObj.high_cost)
        // );

        expect(reddawayArDiscountedRateElem.getText()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(reddawayArNetChargeElem.getText()).toEqual("$" + quoteObj.netCharge);
        expect(true).toEqual(true);
        internalForm.clearAllIcon();
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


      var dataObj = testDataInfo.data.reddaway_regional_direct_intrastate;
      console.log("value for dataObj", dataObj.company_name);
      console.log("regional origin zip", dataObj.Originzipcode);
      //use the dataObj for entering origin and destination..
      expect(true).toEqual(true);
      internalForm.setCompanyName(dataObj.company_name);
      ltlQuoteForm.setDataInObject(dataObj, internalForm);
      ltlQuoteForm.createLtlQuoteRules(browser, internalForm);
      internalForm.clickGetQuote();

      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonReddaway();
        browser.sleep(2000);
        var reddawayApGrossElem = element(by.id("reddawayAPTotalGrossCharge"));
        var reddawayArGrossElem = element(by.id("reddawayARTotalGrossCharge"));

        var reddawayArDiscountedRateElem = element(by.id("reddawayARDiscountedrate"));
        var reddawayArNetChargeElem = element(by.id("reddawayARNetCharge"));
        // var reddawayApHighCost = element(by.id("reddawayApHighCost"));
        // var reddawayArHighCost = element(by.id("reddawayARHighCost"));
        // var reddawayApCaCharge = element(by.id("reddawayAPCACharge"));
        // var reddawayArCaCharge = element(by.id("reddawayARCACharge"));
        // console.log('reddaayApHighCost', expect(reddawayArHighCost.getText()));
        // console.log('reddawayApCaCharge', expect(reddawayArCaCharge.getText()));
        console.log('dataObj', dataObj);
        const quoteObj = internalForm.calculateNetCharge(
          dataObj.ar_gross_charge,
          dataObj.ar_discount,
          dataObj.ar_fuel_charge,
          dataObj.ar_amc
        );
        console.log('quoteObj', quoteObj);

        expect(reddawayApGrossElem.getText()).toEqual(
          "$" + dataObj.ap_gross_charge
        );
        expect(reddawayArGrossElem.getText()).toEqual(
          "$" + dataObj.ar_gross_charge
        );
        // expect(reddawayArCaCharge.getText()).toEqual(
        //   "$" + Number(dataObj.ca_charge)
        // );
        // expect(reddawayApCaCharge.getText()).toEqual(
        //   "$" + Number(dataObj.ca_charge)
        // );

        // expect(reddawayApHighCost.getText()).toEqual(
        //   "$" + Number(dataObj.high_cost)
        // );
        // expect(reddawayArHighCost.getText()).toEqual(
        //   "$" + Number(dataObj.high_cost)
        // );

        expect(reddawayArDiscountedRateElem.getText()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(reddawayArNetChargeElem.getText()).toEqual("$" + quoteObj.netCharge);
        expect(true).toEqual(true);
        internalForm.clearAllIcon();
      });
    });
    browser.sleep(2000);
  });

  // it("Reddaway Regional Direct  Inter-State - Net Charge should be calculated properly with configured discounts", function () {
  //   browser.sleep(5000).then(function () {
  //     console.log(
  //       "Reddaway Regional Direct  Inter-State - Net Charge should be calculated properly"
  //     );

  //     var dataObj = testDataInfo.data.reddaway_regional_direct_interstate;
  //     console.log("value for dataObj", dataObj.company_name);
  //     console.log("regional origin zip", dataObj.Originzipcode);
  //     //use the dataObj for entering origin and destination..
  //     expect(true).toEqual(true);
  //   });
  // });

  it("Reddaway Special Rules All West to ZIP - Net Charge should be calculated properly with configured discounts", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "Reddaway Special Rules All-West to zip - Net Charge should be calculated properly"
      );
      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();


      var dataObj = testDataInfo.data.reddaway_spl_rules_allwest_zip;
      console.log("value for dataObj", dataObj.company_name);
      console.log("regional origin zip", dataObj.Originzipcode);
      //use the dataObj for entering origin and destination..
      expect(true).toEqual(true);
      internalForm.setCompanyName(dataObj.company_name);
      ltlQuoteForm.setDataInObject(dataObj, internalForm);
      ltlQuoteForm.createLtlQuoteRules(browser, internalForm);
      internalForm.clickGetQuote();

      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonReddaway();
        browser.sleep(2000);
        var reddawayApGrossElem = element(by.id("reddawayAPTotalGrossCharge"));
        var reddawayArGrossElem = element(by.id("reddawayARTotalGrossCharge"));

        var reddawayArDiscountedRateElem = element(by.id("reddawayARDiscountedrate"));
        var reddawayArNetChargeElem = element(by.id("reddawayARNetCharge"));
        // var reddawayApHighCost = element(by.id("reddawayApHighCost"));
        // var reddawayArHighCost = element(by.id("reddawayARHighCost"));
        // var reddawayApCaCharge = element(by.id("reddawayAPCACharge"));
        // var reddawayArCaCharge = element(by.id("reddawayARCACharge"));
        // console.log('reddaayApHighCost', expect(reddawayArHighCost.getText()));
        // console.log('reddawayApCaCharge', expect(reddawayArCaCharge.getText()));
        console.log('dataObj', dataObj);
        const quoteObj = internalForm.calculateNetCharge(
          dataObj.ar_gross_charge,
          dataObj.ar_discount,
          dataObj.ar_fuel_charge,
          dataObj.ar_amc
        );
        console.log('quoteObj', quoteObj);

        expect(reddawayApGrossElem.getText()).toEqual(
          "$" + dataObj.ap_gross_charge
        );
        expect(reddawayArGrossElem.getText()).toEqual(
          "$" + dataObj.ar_gross_charge
        );
        // expect(reddawayArCaCharge.getText()).toEqual(
        //   "$" + Number(dataObj.ca_charge)
        // );
        // expect(reddawayApCaCharge.getText()).toEqual(
        //   "$" + Number(dataObj.ca_charge)
        // );

        // expect(reddawayApHighCost.getText()).toEqual(
        //   "$" + Number(dataObj.high_cost)
        // );
        // expect(reddawayArHighCost.getText()).toEqual(
        //   "$" + Number(dataObj.high_cost)
        // );

        expect(reddawayArDiscountedRateElem.getText()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(reddawayArNetChargeElem.getText()).toEqual("$" + quoteObj.netCharge);
        expect(true).toEqual(true);
        internalForm.clearAllIcon();
      });
    });
    browser.sleep(2000);
  });
  it("Reddaway BayArea SFO Metro Terminal - Net Charge should be calculated properly with configured discounts", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "Reddaway BayArea SFO Metro Terminal - Net Charge should be calculated properly"
      );
      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();


      var dataObj = testDataInfo.data.reddaway_highcost_sfo_metro;
      console.log("value for dataObj", dataObj.company_name);
      console.log("regional origin zip", dataObj.Originzipcode);
      //use the dataObj for entering origin and destination..
      expect(true).toEqual(true);
      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();


      var dataObj = testDataInfo.data.reddaway_spl_rules_allwest_zip;
      console.log("value for dataObj", dataObj.company_name);
      console.log("regional origin zip", dataObj.Originzipcode);
      //use the dataObj for entering origin and destination..
      expect(true).toEqual(true);
      internalForm.setCompanyName(dataObj.company_name);
      ltlQuoteForm.setDataInObject(dataObj, internalForm);
      ltlQuoteForm.createLtlQuoteRules(browser, internalForm);
      internalForm.clickGetQuote();

      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonReddaway();
        browser.sleep(2000);
        var reddawayApGrossElem = element(by.id("reddawayAPTotalGrossCharge"));
        var reddawayArGrossElem = element(by.id("reddawayARTotalGrossCharge"));

        var reddawayArDiscountedRateElem = element(by.id("reddawayARDiscountedrate"));
        var reddawayArNetChargeElem = element(by.id("reddawayARNetCharge"));
        // var reddawayApHighCost = element(by.id("reddawayApHighCost"));
        // var reddawayArHighCost = element(by.id("reddawayARHighCost"));
        // var reddawayApCaCharge = element(by.id("reddawayAPCACharge"));
        // var reddawayArCaCharge = element(by.id("reddawayARCACharge"));
        // console.log('reddaayApHighCost', expect(reddawayArHighCost.getText()));
        // console.log('reddawayApCaCharge', expect(reddawayArCaCharge.getText()));
        console.log('dataObj', dataObj);
        const quoteObj = internalForm.calculateNetCharge(
          dataObj.ar_gross_charge,
          dataObj.ar_discount,
          dataObj.ar_fuel_charge,
          dataObj.ar_amc
        );
        console.log('quoteObj', quoteObj);

        expect(reddawayApGrossElem.getText()).toEqual(
          "$" + dataObj.ap_gross_charge
        );
        expect(reddawayArGrossElem.getText()).toEqual(
          "$" + dataObj.ar_gross_charge
        );
        // expect(reddawayArCaCharge.getText()).toEqual(
        //   "$" + Number(dataObj.ca_charge)
        // );
        // expect(reddawayApCaCharge.getText()).toEqual(
        //   "$" + Number(dataObj.ca_charge)
        // );

        // expect(reddawayApHighCost.getText()).toEqual(
        //   "$" + Number(dataObj.high_cost)
        // );
        // expect(reddawayArHighCost.getText()).toEqual(
        //   "$" + Number(dataObj.high_cost)
        // );

        expect(reddawayArDiscountedRateElem.getText()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(reddawayArNetChargeElem.getText()).toEqual("$" + quoteObj.netCharge);
        expect(true).toEqual(true);
        internalForm.clearAllIcon();
      });
    });
  });
});