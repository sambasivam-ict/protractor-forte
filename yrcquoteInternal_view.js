var LogisticsLoginPage = require("./pageobjects/login-page");

var InternalForm = require("./pageobjects/internalView-page");

var LocalStorageValues = require("./pageobjects/localStorageValues");

var QuoteDetailForm = require("./pageobjects/quoteDetail-page");

var LtlQuoteForm = require("./common/create_ltl_quote");

var testDataInfo = require("./testData/yrc_testdata.json");

var environment = require("./environment/env");

var ExternalDashboardForm = require("./pageobjects/externalDashboard-page");

var masterDataAPDiscount = [];
var masterDataARDiscount = [];

var localStorageValues = new LocalStorageValues();
var quoteDetailForm = new QuoteDetailForm();

describe("YRC Quote Creation by admin testcases", function () {
  beforeAll(function () {
    console.log("test data:", testDataInfo.data.venilla_quote.Class);
    console.log("environment", environment);
    browser.ignoreSynchronization = true;
    if (environment.isStage == false) {
      browser.get(environment.dev_url);
    } else {
      browser.get(environment.prod_url);
    }
    browser.sleep(6000);
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

  it("should calculate the net charge properly for vanilla inputs", function () {
    browser.sleep(5000).then(function () {
      console.log('localstorage',  localStorageValues.getArMasterDataForYRC());
      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();

      var dataObj = testDataInfo.data.venilla_quote;
      internalForm.setCompanyName(dataObj.company_name);
      ltlQuoteForm.setDataInObject(dataObj, internalForm);
      ltlQuoteForm.createLtlQuote(browser, internalForm);
      internalForm.clickGetQuote();
      browser.sleep(2000);
      browser.sleep(10000).then(function () {
        browser.sleep(2000);
        internalForm.clickViewButtonYrc();

        browser.sleep(2000);

        const quoteObj = internalForm.calculateNetCharge(
          dataObj.ar_gross_charge,
          localStorageValues.getArMasterDataForYRC().discount,
          localStorageValues.getArMasterDataForYRC().fuelsurcharge,
          localStorageValues.getArMasterDataForYRC().amc
        );

        browser
          .actions()
          .mouseMove(quoteDetailForm.yrcArNetChargeElem)
          .perform();
        browser.sleep(1000);

        expect(quoteDetailForm.getYrcApGrossCharge()).toEqual(
          "$" + dataObj.ap_gross_charge
        );
        expect(quoteDetailForm.getYrcArGrossCharge()).toEqual(
          "$" + dataObj.ar_gross_charge
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

  it("should calculate the net charge properly for either ORIGIN or DESTINATION BEING CA", function () {
    browser.sleep(3000).then(function () {
      console.log("inside the second scnerio..");
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();

      browser.sleep(2000);

      var dataObj = testDataInfo.data.ca_quote;
      internalForm.setCompanyName(dataObj.company_name);
      ltlQuoteForm.setDataInObject(dataObj, internalForm);
      ltlQuoteForm.createLtlQuote(browser, internalForm);
      internalForm.clickGetQuote();
      browser.sleep(2000);
      browser.sleep(10000).then(function () {
        // browser
        //   .actions()
        //   .mouseMove(internalForm.clickViewButtonYrc)
        //   .perform();
        browser.sleep(2000);
        internalForm.clickViewButtonYrc();
        browser.sleep(2000);

        const quoteObj = internalForm.calculateNetCharge(
          dataObj.ar_gross_charge,
          localStorageValues.getArMasterDataForYRC().discount,
          localStorageValues.getArMasterDataForYRC().fuelsurcharge,
          localStorageValues.getArMasterDataForYRC().amc
        );

        expect(quoteDetailForm.getYrcApGrossCharge()).toEqual(
          "$" + dataObj.ap_gross_charge
        );
        expect(quoteDetailForm.getYrcArGrossCharge()).toEqual(
          "$" + dataObj.ar_gross_charge
        );

        expect(quoteDetailForm.getYrcApCaCharge()).toEqual(
          "CA Charge - $" +
            Number(localStorageValues.getApMasterDataForYRC().caCharge)
        );
        expect(quoteDetailForm.getYrcArCaCharge()).toEqual(
          "CA Charge - $" +
            Number(localStorageValues.getArMasterDataForYRC().caCharge)
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

  it("should calculate the net charge properly for Yrc Quote creations by non direct", function () {
    browser.sleep(5000).then(function () {
      console.log("inside the third  scanerio ..");
      $("body").sendKeys(protractor.Key.ESCAPE);
      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();
      browser.sleep(2000);

      var dataObj = testDataInfo.data;
      var dataInput = dataObj.non_direct_zip;
      internalForm.setCompanyName(dataInput.company_name);
      ltlQuoteForm.setDataInObject(dataInput, internalForm);
      ltlQuoteForm.createLtlQuote(browser, internalForm);
      internalForm.clickGetQuote();
      browser.sleep(2000);
      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonYrc();

        browser.sleep(2000);

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataObj.ar_nondirect_discount,
          localStorageValues.getArMasterDataForYRC().fuelsurcharge,
          localStorageValues.getArMasterDataForYRC().amc
        );

        quoteDetailForm.getYrcShipTypes().then(function (text) {
          expect(text).toEqual(dataInput.ship_type);
        });

        expect(quoteDetailForm.getYrcApGrossCharge()).toEqual(
          "$" + dataInput.ap_gross_charge
        );
        expect(quoteDetailForm.getYrcArGrossCharge()).toEqual(
          "$" + dataInput.ar_gross_charge
        );

        expect(quoteDetailForm.getYrcApCaCharge()).toEqual(
          "CA Charge - $" +
            Number(localStorageValues.getApMasterDataForYRC().caCharge)
        );
        expect(quoteDetailForm.getYrcArCaCharge()).toEqual(
          "CA Charge - $" +
            Number(localStorageValues.getArMasterDataForYRC().caCharge)
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

  it("should calculate the net charge properly for Yrc quote creation for Highcost related to Min charge", function () {
    browser.sleep(3000).then(function () {
      console.log(
        "inside the fourth scnerio..",
        localStorageValues.getArMasterDataForYRC()
      );
      $("body").sendKeys(protractor.Key.ESCAPE);

      var internalForm = new InternalForm();
      var ltlQuoteForm = new LtlQuoteForm();
      browser.sleep(2000);

      var dataObj = testDataInfo.data;
      var dataInput = dataObj.highcost_min;
      internalForm.setCompanyName(dataInput.company_name);
      ltlQuoteForm.setDataInObject(dataInput, internalForm);
      ltlQuoteForm.createLtlQuote(browser, internalForm);
      internalForm.clickGetQuote();
      browser.sleep(2000);
      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonYrc();

        browser.sleep(2000);

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataObj.ar_nondirect_discount,
          localStorageValues.getArMasterDataForYRC().fuelsurcharge,
          localStorageValues.getArMasterDataForYRC().amc
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

        // // for high cost.
        expect(quoteDetailForm.getYrcApHighCost()).toEqual(
          "High Cost - $" + dataInput.high_cost_charge
        );
        expect(quoteDetailForm.getYrcArHighCost()).toEqual(
          "High Cost - $" + dataInput.high_cost_charge
        );

        expect(quoteDetailForm.getYrcArDiscountedRate()).toEqual(
          "$" + quoteObj.discountedRate
        );

        expect(quoteDetailForm.getYrcArNetCharge()).toEqual(
          "$" + quoteObj.netCharge
        );
      });
    });
    browser.sleep(4000);
  });

  // it('should calculate the net charge properly for  Yrc Quote creation for Highcost zip with no min charge', function () {
  //   browser.sleep(5000).then(function () {
  //     console.log('inside the fifth scnerio..')
  //     $('body').sendKeys(protractor.Key.ESCAPE)

  //     var internalForm = new InternalForm()

  //     var ltlQuoteForm = new LtlQuoteForm()
  //     browser.sleep(2000)

  //     var dataObj = testDataInfo.data
  //     var dataInput = dataObj.highcost_no_min
  //     internalForm.setCompanyName(dataInput.company_name)
  //     ltlQuoteForm.setDataInObject(dataInput, internalForm)
  //     ltlQuoteForm.createLtlQuote(browser, internalForm)
  //     internalForm.clickGetQuote()
  //     browser.sleep(3000)

  //     browser.sleep(10000).then(function () {
  //       internalForm.clickViewButtonYrc()

  //       browser.sleep(2000)

  //       const quoteObj = internalForm.calculateNetCharge(
  //         dataInput.ar_gross_charge,
  //         dataObj.ar_discount,
  //         localStorageValues.getArMasterDataForYRC().fuelsurcharge
  //         localStorageValues.getArMasterDataForYRC().amc
  //       )

  //       expect(quoteDetailForm.getYrcApGrossCharge()).toEqual(
  //         '$' + dataInput.ap_gross_charge
  //       )
  //       expect(quoteDetailForm.getYrcArGrossCharge()).toEqual(
  //         '$' + dataInput.ar_gross_charge
  //       )

  //       expect(quoteDetailForm.getYrcApCaCharge()).toEqual(
  //         'CA Charge - $' + dataInput.ca_charge
  //       )
  //       expect(quoteDetailForm.getYrcArCaCharge()).toEqual(
  //         'CA Charge - $' + dataInput.ca_charge
  //       )

  //       // for high cost.
  //       expect(quoteDetailForm.getYrcApHighCost()).toEqual(
  //         'High Cost - $' + dataInput.high_cost_charge
  //       )
  //       expect(quoteDetailForm.getYrcArHighCost()).toEqual(
  //         'High Cost - $' + dataInput.high_cost_charge
  //       )

  //       expect(quoteDetailForm.getYrcArDiscountedRate()).toEqual(
  //         '$' + quoteObj.discountedRate
  //       )

  //       expect(quoteDetailForm.getYrcArNetCharge()).toEqual(
  //         '$' + quoteObj.netCharge
  //       )
  //     })
  //   })
  //   browser.sleep(4000)
  // })
});
