var LogisticsLoginPage = require('./pageobjects/LoginForm')

var InternalForm = require('./pageobjects/InternalViewForm')

var ExternalDashboardForm = require('./pageobjects/ExternalDashboardForm')

var RateQuoteSelectForm = require('./pageobjects/RateQuoteSelectForm')

var LocalStorageValues = require('./pageobjects/LocalStorateValues')

var testDataInfo = require('./TestData/externalCustomerTestData.json')
var QuoteDetailForm = require('./pageobjects/QuoteDetailForm')
var LtlQuoteFormForExternalCustomer = require('./common/createquoteforExternalCustomer')
var CustomerViewForm = require('./pageobjects/CustomerViewForm')
var environment = require('./environment/env')

var masterDataAPDiscount = []
var masterDataARDiscount = []

var localStorageValues = new LocalStorageValues()

var quoteDetailForm = new QuoteDetailForm()

describe('External Customer logs in for creating external quotes', function () {
  beforeAll(function () {
    browser.sleep(3000)
    browser.ignoreSynchronization = true
    if (environment.isStage == false) {
      browser.get(environment.dev_url)
    } else {
      browser.get(environment.stage_url)
    }

    var loginPageObj = new LogisticsLoginPage()

    var credentials = testDataInfo.data.login_credentials_customer
    loginPageObj.setUserName(credentials.user_name)
    loginPageObj.setPassWord(credentials.password)

    loginPageObj.enterUserName()
    loginPageObj.enterPassword()
    browser.sleep(3000)
    loginPageObj.clickSubmitButton()

    browser.driver
      .manage()
      .window()
      .maximize()
    browser.sleep(3000)
  })
  afterAll(function () {
    // browser.close()
    browser.sleep(2000);
    var externalDashboardForm = new ExternalDashboardForm();
    externalDashboardForm.clickOnWelcomeUser();
    browser.sleep(2000);
    externalDashboardForm.clickOnLogoutUser();
    browser.sleep(2000);
  })
  it('should move from Dashboard to Request a rate quote', function () {
    browser.sleep(2000)
    var externalDashboardForm = new ExternalDashboardForm()
    externalDashboardForm.clickOnExternalDashboard()
    browser.sleep(2000)
  })

  it('should move from Request a rate quote to Ltl quote', function () {
    browser.sleep(2000)
    var rateQuoteSelectForm = new RateQuoteSelectForm()
    rateQuoteSelectForm.clickOnLtlQuote()
    browser.sleep(5000)
    localStorageValues
      .getApMasterDataLocalStorage()
      .then(function (returnData) {
        masterDataAPDiscount = returnData
      })

    localStorageValues
      .getArMasterDataLocalStorage()
      .then(function (returnData) {
        masterDataARDiscount = returnData
      })
  })

  it('should create quote for YRC carrier', function () {
    console.log('Yrc quote creation')
    browser.sleep(5000).then(function () {
      var customerViewForm = new CustomerViewForm()
      var ltlQuoteFormForExternalCustomer = new LtlQuoteFormForExternalCustomer()
      $('body').sendKeys(protractor.Key.ESCAPE)
      var dataInput = testDataInfo.data.yrc_interstate

      console.log('value for dataObj dataInput', dataInput)

      customerViewForm.setCompanyName(dataInput.company_name)
      customerViewForm.setCarrier(dataInput.Carrier)
      ltlQuoteFormForExternalCustomer.setDataInObject(
        dataInput,
        customerViewForm
      )
      ltlQuoteFormForExternalCustomer.createLtlQuoteCreationForExternalCustomer(
        browser,
        customerViewForm
      )
      browser.sleep(2000)
      expect(true).toEqual(true)
      customerViewForm.clickGetQuote()
      browser.sleep(10000).then(function () {
        browser.sleep(2000)
        const quoteObj = customerViewForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataInput.ar_discount,
          dataInput.ar_fuel_charge,
          dataInput.ar_amc
        )

        browser.sleep(5000)
      })
    })
  })

  it('should create quote for fedex Economy carrier', function () {
    console.log('Fedex Economy quote creation')
    browser.sleep(5000).then(function () {
      var customerViewForm = new CustomerViewForm()
      var ltlQuoteFormForExternalCustomer = new LtlQuoteFormForExternalCustomer()
      $('body').sendKeys(protractor.Key.ESCAPE)
      var dataInput = testDataInfo.data.fedex_Economy_Regional

      console.log('value for dataObj dataInput', dataInput)

      customerViewForm.setCompanyName(dataInput.company_name)
      customerViewForm.setCarrier(dataInput.Carrier)
      ltlQuoteFormForExternalCustomer.setDataInObject(
        dataInput,
        customerViewForm
      )
      ltlQuoteFormForExternalCustomer.createLtlQuoteCreationForExternalCustomer(
        browser,
        customerViewForm
      )
      browser.sleep(2000)
      expect(true).toEqual(true)
      customerViewForm.clickGetQuote()
      browser.sleep(10000).then(function () {
        browser.sleep(2000)
        const quoteObj = customerViewForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataInput.ar_discount,
          dataInput.ar_fuel_charge,
          dataInput.ar_amc
        )

        browser.sleep(5000)
      })
    })
  })

  it('should create quote for yrc intrastate carrier will result a error message', function () {
    console.log('yrc intrastate quote creation')
    browser.sleep(5000).then(function () {
      var customerViewForm = new CustomerViewForm()
      var ltlQuoteFormForExternalCustomer = new LtlQuoteFormForExternalCustomer()
      $('body').sendKeys(protractor.Key.ESCAPE)
      var dataInput = testDataInfo.data.yrc_intrastate

      console.log('value for dataObj dataInput', dataInput)

      customerViewForm.setCompanyName(dataInput.company_name)
      customerViewForm.setCarrier(dataInput.Carrier)
      ltlQuoteFormForExternalCustomer.setDataInObject(
        dataInput,
        customerViewForm
      )
      ltlQuoteFormForExternalCustomer.createLtlQuoteCreationForExternalCustomer(
        browser,
        customerViewForm
      )
      browser.sleep(2000)
      expect(true).toEqual(true)
      customerViewForm.clickGetQuote()
      browser.sleep(10000)
    })
  })
})
