var LogisticsLoginPage = require("./pageobjects/login-page");

var InternalForm = require("./pageobjects/internalView-page");

var LocalStorageValues = require("./pageobjects/localStorageValues");

var LtlQuoteForm = require("./common/create_ltl_quote");

var testDataInfo = require("./TestData/yrc_testdata_rules.json");

var QuoteDetailForm = require("./pageobjects/quoteDetail-page");

var environment = require("./environment/env");

var masterDataAPDiscount = [];
var masterDataARDiscount = [];

var localStorageValues = new LocalStorageValues();
var quoteDetailForm = new QuoteDetailForm();

describe("YRC Quote Creation by admin for company that has rules", function () {
  beforeAll(function () {
    browser.ignoreSynchronization = true;
    console.log("environment", environment);
    browser.get(environment.url);
    var loginPageObj = new LogisticsLoginPage();
    browser.sleep(3000);
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
    //browser.close()
    browser.sleep(2000);
    var internalForm = new InternalForm();
    internalForm.clickOnWelcomeUser();
    browser.sleep(2000);
    internalForm.clickOnLogoutUser();
    browser.sleep(2000);
  });

  it("YRC Intrastate AMC GT Discounted Rate-net charge should be calculated properly", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "yrc intra state where amc > intrastate",
        localStorageValues.getArMasterDataByCompany().YRC
      );

      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();
      $("body").sendKeys(protractor.Key.ESCAPE);
      var dataObj = testDataInfo.data.yrc_intra_state;
      var dataInput = dataObj.amc_gt_dsc_rate;
      console.log("value for dataObj dataInput", dataInput);
      internalForm.setCompanyName(dataInput.company_name);
      ltlQuoteForm.setDataInObject(dataInput, internalForm);
      ltlQuoteForm.createLtlQuote(browser, internalForm);
      internalForm.clickGetQuote();
      browser.sleep(10000).then(function () {
        browser.sleep(2000);
        internalForm.clickViewButtonYrc();
        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataInput.ar_discount,
          localStorageValues.getArMasterDataByCompany().YRC.fuelsurcharge,
          dataInput.ar_amc
        );

        expect(quoteDetailForm.getYrcApGrossCharge()).toEqual(
          "$" + dataInput.ap_gross_charge
        );
        expect(quoteDetailForm.getYrcArGrossCharge()).toEqual(
          "$" + dataInput.ar_gross_charge
        );

        expect(quoteDetailForm.getYrcApHighCost()).toEqual(
          "High Cost - $" + dataInput.high_cost
        );
        expect(quoteDetailForm.getYrcArHighCost()).toEqual(
          "High Cost - $" + dataInput.high_cost
        );

        expect(quoteDetailForm.getYrcArDiscountedRate()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(quoteDetailForm.getYrcArNetCharge()).toEqual(
          "$" + quoteObj.netCharge
        );
      });
    });
    browser.sleep(2000);
  });

  it("YRC Intrastate net charge should be calculated properly for configured ca charge and discounts", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "yrc intra state ca charge net charge calculated properly with high cost charge"
      );
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();
      var dataObj = testDataInfo.data.yrc_intra_state;
      var dataInput = dataObj.ca_highcost_charge;
      console.log("value for dataObj dataInput", dataInput);
      internalForm.setCompanyName(dataInput.company_name);
      ltlQuoteForm.setDataInObject(dataInput, internalForm);
      ltlQuoteForm.createLtlQuote(browser, internalForm);

      internalForm.clickGetQuote();
      browser.sleep(10000).then(function () {
        browser.sleep(2000);
        internalForm.clickViewButtonYrc();

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataInput.ar_discount,
          localStorageValues.getArMasterDataByCompany().YRC.fuelsurcharge,
          dataInput.ar_amc
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
        expect(quoteDetailForm.getYrcApHighCost()).toEqual(
          "High Cost - $" + dataInput.high_cost
        );
        expect(quoteDetailForm.getYrcArHighCost()).toEqual(
          "High Cost - $" + dataInput.high_cost
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

  it("YRC Intrastate net charge should be calculated properly for fak rules 85 to 200 as 300", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "yrc intra state net charge calculated properly for fak rules 85 to 200 as 300"
      );
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();
      var dataObj = testDataInfo.data.yrc_intra_state;
      console.log("value for dataObj", dataObj);

      var dataInput = dataObj.fak_class_range_data;
      internalForm.setCompanyName(dataInput.company_name);
      ltlQuoteForm.setDataInObject(dataInput, internalForm);
      ltlQuoteForm.createLtlQuote(browser, internalForm);

      internalForm.clickGetQuote();
      browser.sleep(10000).then(function () {
        browser.sleep(2000);
        internalForm.clickViewButtonYrc();

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataInput.ar_discount,
          localStorageValues.getArMasterDataByCompany().YRC.fuelsurcharge,
          dataInput.ar_amc
        );

        expect(quoteDetailForm.getYrcApGrossCharge()).toEqual(
          "$" + dataInput.ap_gross_charge
        );
        expect(quoteDetailForm.getYrcArGrossCharge()).toEqual(
          "$" + dataInput.ar_gross_charge
        );

        expect(quoteDetailForm.getYrcApHighCost()).toEqual(
          "High Cost - $" + dataInput.high_cost
        );
        expect(quoteDetailForm.getYrcArHighCost()).toEqual(
          "High Cost - $" + dataInput.high_cost
        );

        expect(quoteDetailForm.getYrcArDiscountedRate()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(quoteDetailForm.getYrcArNetCharge()).toEqual(
          "$" + quoteObj.netCharge
        );
      });
    });
    browser.sleep(2000);
  });

  it("YRC Interstate net charge should be calculated properly with high cost charge included", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "yrc inter state net charge calculated properly with high cost charge"
      );
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();
      var dataObj = testDataInfo.data.yrc_inter_state;
      var dataInput = dataObj.inter_state_high_cost;
      console.log("value for dataObj dataInput", dataInput);
      internalForm.setCompanyName(dataInput.company_name);
      ltlQuoteForm.setDataInObject(dataInput, internalForm);
      ltlQuoteForm.createLtlQuote(browser, internalForm);
      internalForm.clickGetQuote();
      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonYrc();
        browser.sleep(2000);

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataInput.ar_discount,
          localStorageValues.getArMasterDataByCompany().YRC.fuelsurcharge,
          dataInput.ar_amc
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
        expect(quoteDetailForm.getYrcApHighCost()).toEqual(
          "High Cost - $" + dataInput.high_cost
        );
        expect(quoteDetailForm.getYrcArHighCost()).toEqual(
          "High Cost - $" + dataInput.high_cost
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
  it("YRC special rules zip to zip should calculate netcharge properly with configured discounts", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "yrc intra state ca charge net charge calculated properly with high cost charge"
      );
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();
      var dataObj = testDataInfo.data.yrc_special_rules;

      var dataInput = dataObj.zip_to_zip;
      console.log("value for dataObj dataInput", dataInput);
      internalForm.setCompanyName(dataInput.company_name);
      ltlQuoteForm.setDataInObject(dataInput, internalForm);
      ltlQuoteForm.createLtlQuote(browser, internalForm);
      internalForm.clickGetQuote();
      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonYrc();
        browser.sleep(2000);

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataInput.ar_discount,
          localStorageValues.getArMasterDataByCompany().YRC.fuelsurcharge,
          dataInput.ar_amc
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
        expect(quoteDetailForm.getYrcApHighCost()).toEqual(
          "High Cost - $" + dataInput.high_cost
        );
        expect(quoteDetailForm.getYrcArHighCost()).toEqual(
          "High Cost - $" + dataInput.high_cost
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
  it("YRC special rules zip to state should calculate netcharge properly with configured discounts", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "yrc intra state ca charge net charge calculated properly with high cost charge"
      );
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();
      var dataObj = testDataInfo.data.yrc_special_rules;
      var dataInput = dataObj.zip_to_state;
      console.log("value for dataObj dataInput", dataInput);
      internalForm.setCompanyName(dataInput.company_name);
      ltlQuoteForm.setDataInObject(dataInput, internalForm);
      ltlQuoteForm.createLtlQuote(browser, internalForm);

      internalForm.clickGetQuote();
      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonYrc();
        browser.sleep(2000);

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataInput.ar_discount,
          localStorageValues.getArMasterDataByCompany().YRC.fuelsurcharge,
          dataInput.ar_amc
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
        expect(quoteDetailForm.getYrcApHighCost()).toEqual(
          "High Cost - $" + dataInput.high_cost
        );
        expect(quoteDetailForm.getYrcArHighCost()).toEqual(
          "High Cost - $" + dataInput.high_cost
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
  it("YRC special rules state to zip should calculate netcharge properly with configured discounts", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "yrc intra state ca charge net charge calculated properly with high cost charge"
      );
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();
      var dataObj = testDataInfo.data.yrc_special_rules;
      var dataInput = dataObj.state_to_zip;
      console.log("value for dataObj dataInput", dataInput);
      internalForm.setCompanyName(dataInput.company_name);
      ltlQuoteForm.setDataInObject(dataInput, internalForm);
      ltlQuoteForm.createLtlQuote(browser, internalForm);
      internalForm.clickGetQuote();
      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonYrc();
        browser.sleep(2000);

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataInput.ar_discount,
          localStorageValues.getArMasterDataByCompany().YRC.fuelsurcharge,
          dataInput.ar_amc
        );

        expect(quoteDetailForm.getYrcApGrossCharge()).toEqual(
          "$" + dataInput.ap_gross_charge
        );
        expect(quoteDetailForm.getYrcArGrossCharge()).toEqual(
          "$" + dataInput.ar_gross_charge
        );

        expect(quoteDetailForm.getYrcArDiscountedRate()).toEqual(
          "$" + parseFloat(quoteObj.discountedRate)
        );

        expect(quoteDetailForm.getYrcArNetCharge()).toEqual(
          "$" + quoteObj.netCharge
        );
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
      var dataInput = dataObj.all_to_state;
      console.log("value for dataObj dataInput", dataInput);
      internalForm.setCompanyName(dataInput.company_name);
      ltlQuoteForm.setDataInObject(dataInput, internalForm);
      ltlQuoteForm.createLtlQuote(browser, internalForm);

      internalForm.clickGetQuote();
      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonYrc();
        browser.sleep(2000);

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataInput.ar_discount,
          localStorageValues.getArMasterDataByCompany().YRC.fuelsurcharge,
          dataInput.ar_amc
        );

        expect(quoteDetailForm.getYrcApGrossCharge()).toEqual(
          "$" + dataInput.ap_gross_charge
        );
        expect(quoteDetailForm.getYrcArGrossCharge()).toEqual(
          "$" + dataInput.ar_gross_charge
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
  it("YRC Cost Plus should calculate netcharge properly with appropriate cost plus factor configured", function () {
    browser.sleep(5000).then(function () {
      console.log(
        "yrc intra state ca charge net charge calculated properly with high cost charge"
      );
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();
      var dataInput = testDataInfo.data.yrc_costplus;

      console.log("value for dataObj dataInput", dataInput);
      internalForm.setCompanyName(dataInput.company_name);
      ltlQuoteForm.setDataInObject(dataInput, internalForm);
      ltlQuoteForm.createLtlQuote(browser, internalForm);

      internalForm.clickGetQuote();
      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonYrc();
        browser.sleep(2000);

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ap_ar_gross_charge,
          dataInput.ap_ar_discount,
          localStorageValues.getArMasterDataByCompany().YRC.fuelsurcharge,
          dataInput.ap_ar_amc,
          dataInput.costplus_factor
        );
        console.log("quoteObj", quoteObj);
        expect(quoteDetailForm.getYrcApGrossCharge()).toEqual(
          "$" + dataInput.ap_ar_gross_charge
        );
        expect(quoteDetailForm.getYrcArGrossCharge()).toEqual(
          "$" + dataInput.ap_ar_gross_charge
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
});
