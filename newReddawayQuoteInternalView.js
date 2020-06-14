var LogisticsLoginPage = require('./pageobjects/LoginForm')

var InternalForm = require('./pageobjects/InternalViewForm')

var LocalStorageValues = require('./pageobjects/LocalStorateValues')

var testDataInfo = require('./TestData/ReddawayTestData.json')

var LtlQuoteForm = require('./common/createltlquote')

var QuoteDetailForm = require('./pageobjects/QuoteDetailForm')

var ExternalDashboardForm = require('./pageobjects/ExternalDashboardForm')

var environment = require('./environment/env')

var masterDataAPDiscount = []
var masterDataARDiscount = []

var localStorageValues = new LocalStorageValues()
var quoteDetailForm = new QuoteDetailForm()

describe('Reddaway Quote Creation by admin testcases in the internal page', function () {
  beforeAll(function () {
    console.log('test data:', testDataInfo.data.Nondirect_quote.Class)

    browser.ignoreSynchronization = true
    if (environment.isStage == false) {
      browser.get(environment.dev_url)
    } else {
      browser.get(environment.stage_url)
    }

    var loginPageObj = new LogisticsLoginPage()

    var credentials = testDataInfo.data.login_credentials_admin
    loginPageObj.setUserName(credentials.user_name)
    loginPageObj.setPassWord(credentials.password)

    loginPageObj.enterUserName()
    loginPageObj.enterPassword()

    loginPageObj.clickSubmitButton()

    browser.driver
      .manage()
      .window()
      .maximize()
    browser.sleep(3000)
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

  afterAll(function () {
    browser.sleep(2000);
    var internalForm = new InternalForm();
    internalForm.clickOnWelcomeUser();
    browser.sleep(2000);
    internalForm.clickOnLogoutUser();
    browser.sleep(2000);
  })

  it('Reddaway should calculate the net charge properly for Non Direct Zipcodes', function () {
    browser.sleep(3000).then(function () {
      var internalForm = new InternalForm()
      var ltlQuoteForm = new LtlQuoteForm()

      browser.sleep(2000)
      var dataObj = testDataInfo.data
      var dataInput = dataObj.Nondirect_quote
      console.log('dataInput', dataInput)
      internalForm.setCompanyName(dataInput.company_name)
      ltlQuoteForm.setDataInObject(dataInput, internalForm)
      ltlQuoteForm.createLtlQuote(browser, internalForm)
      expect(true).toEqual(true)

      browser.sleep(3000)

      internalForm.clickGetQuote()

      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonReddaway()
        browser.sleep(2000)

        console.log(
          'localStorageValues.getArMasterDataByCompany().REDDAWAY',
          localStorageValues.getArMasterDataByCompany().REDDAWAY
        )

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataObj.ar_nondirect_discount,
          localStorageValues.getArMasterDataByCompany().REDDAWAY.fuelsurcharge,
          localStorageValues.getArMasterDataByCompany().REDDAWAY.amc
        )

        expect(quoteDetailForm.getReddawayApGrossCharge()).toEqual(
          '$' + dataInput.ap_gross_charge
        )
        expect(quoteDetailForm.getReddawayArGrossCharge()).toEqual(
          '$' + dataInput.ar_gross_charge
        )

        expect(quoteDetailForm.getReddawayArDiscountedRate()).toEqual(
          '$' + quoteObj.discountedRate
        )

        expect(quoteDetailForm.getReddawayArNetCharge()).toEqual(
          '$' + quoteObj.netCharge
        )

        //the following 3 are dummy expects to make sure reduce method works.

        // YOU CAN use localStorageValues.getAPMasterDataForReddaway().companyName instead

        expect(
          localStorageValues.getApMasterDataByCompany().REDDAWAY.companyName
        ).toEqual('REDDAWAY')

        expect(
          localStorageValues.getArMasterDataByCompany().REDDAWAY.type
        ).toEqual('AR')

        expect(
          localStorageValues.getAPMasterDataForReddaway().fuelsurcharge
        ).toEqual('26.3')
      })
      browser.sleep(3000)
    })
  })

  it('Reddaway should calculate the net charge properly for Direct Zipcodes', function () {
    browser.sleep(3000).then(function () {
      console.log('inside the second scnerio..')
      $('body').sendKeys(protractor.Key.ESCAPE)
      var internalForm = new InternalForm()
      var ltlQuoteForm = new LtlQuoteForm()

      browser.sleep(2000)
      var dataObj = testDataInfo.data
      var dataInput = dataObj.Direct_quote
      console.log('dataInput', dataInput)
      internalForm.setCompanyName(dataInput.company_name)
      ltlQuoteForm.setDataInObject(dataInput, internalForm)
      ltlQuoteForm.createLtlQuote(browser, internalForm)

      internalForm.clickGetQuote()
      browser.sleep(3000)

      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonReddaway()
        browser.sleep(2000)

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          localStorageValues.getArMasterDataByCompany().REDDAWAY.discount,
          localStorageValues.getArMasterDataByCompany().REDDAWAY.fuelsurcharge,
          localStorageValues.getArMasterDataByCompany().REDDAWAY.amc
        )

        browser.sleep(1000)

        expect(quoteDetailForm.getReddawayApGrossCharge()).toEqual(
          '$' + dataInput.ap_gross_charge
        )
        expect(quoteDetailForm.getReddawayArGrossCharge()).toEqual(
          '$' + dataInput.ar_gross_charge
        )

        expect(quoteDetailForm.getReddawayApCaCharge()).toEqual(
          'CA Charge - $' + dataInput.ca_charge
        )

        expect(quoteDetailForm.getReddawayArCaCharge()).toEqual(
          'CA Charge - $' + dataInput.ca_charge
        )

        expect(quoteDetailForm.getReddawayArDiscountedRate()).toEqual(
          '$' + quoteObj.discountedRate
        )

        expect(quoteDetailForm.getReddawayArNetCharge()).toEqual(
          '$' + quoteObj.netCharge
        )
      })

      browser.sleep(3000)
    })
  })

  it('Reddaway should calculate the net charge properly for California charge inputs', function () {
    browser.sleep(3000).then(function () {
      console.log('inside the third scnerio..')
      $('body').sendKeys(protractor.Key.ESCAPE)

      var internalForm = new InternalForm()
      var ltlQuoteForm = new LtlQuoteForm()

      browser.sleep(2000)
      var dataObj = testDataInfo.data
      var dataInput = dataObj.ca_quote
      console.log('dataInput', dataInput)
      internalForm.setCompanyName(dataInput.company_name)
      ltlQuoteForm.setDataInObject(dataInput, internalForm)
      ltlQuoteForm.createLtlQuote(browser, internalForm)
      expect(true).toEqual(true)

      browser.sleep(2000)

      internalForm.clickGetQuote()

      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonReddaway()

        browser.sleep(2000)

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          localStorageValues.getArMasterDataByCompany().REDDAWAY.discount,
          localStorageValues.getArMasterDataByCompany().REDDAWAY.fuelsurcharge,
          localStorageValues.getArMasterDataByCompany().REDDAWAY.amc
        )

        expect(quoteDetailForm.getReddawayApCaCharge()).toEqual(
          '$' + dataInput.ap_gross_charge
        )
        expect(quoteDetailForm.getReddawayArGrossCharge()).toEqual(
          '$' + dataInput.ar_gross_charge
        )

        expect(quoteDetailForm.getReddawayApCaCharge()).toEqual(
          'CA Charge - $' +
            localStorageValues.getApMasterDataByCompany().REDDAWAY.caCharge
        )

        expect(quoteDetailForm.getReddawayArCaCharge()).toEqual(
          'CA Charge - $' +
            localStorageValues.getArMasterDataByCompany().REDDAWAY.caCharge
        )

        expect(quoteDetailForm.getReddawayArDiscountedRate()).toEqual(
          '$' + quoteObj.discountedRate
        )

        expect(quoteDetailForm.getReddawayArNetCharge()).toEqual(
          '$' + quoteObj.netCharge
        )
      })
    })
  })

  it('Reddaway should include the High Cost charge for the High Cost zip codes for CWT', function () {
    browser.sleep(3000).then(function () {
      console.log('inside the third scnerio..')

      $('body').sendKeys(protractor.Key.ESCAPE)
      var internalForm = new InternalForm()
      var ltlQuoteForm = new LtlQuoteForm()

      browser.sleep(2000)
      var dataObj = testDataInfo.data
      var dataInput = dataObj.Highcost_quote
      console.log('dataInput', dataInput)
      internalForm.setCompanyName(dataInput.company_name)
      ltlQuoteForm.setDataInObject(dataInput, internalForm)
      ltlQuoteForm.createLtlQuote(browser, internalForm)
      expect(true).toEqual(true)

      browser.sleep(2000)
      internalForm.clickGetQuote()

      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonReddaway()

        browser.sleep(2000)

        var totalHighCostCharge = internalForm.calulatHighCostChargeFromCWT()

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataObj.ar_discount,
          dataObj.ar_fuel_charge,
          localStorageValues.getArMasterDataByCompany().REDDAWAY.amc
        )

        expect(quoteDetailForm.getReddawayApCaCharge()).toEqual(
          '$' + dataInput.ap_gross_charge
        )
        expect(quoteDetailForm.getReddawayArGrossCharge()).toEqual(
          '$' + dataInput.ar_gross_charge
        )

        expect(quoteDetailForm.getReddawayApCaCharge()).toEqual(
          'CA Charge - $' +
            localStorageValues.getApMasterDataByCompany().REDDAWAY.caCharge
        )

        expect(quoteDetailForm.getReddawayArCaCharge()).toEqual(
          'CA Charge - $' +
            localStorageValues.getArMasterDataByCompany().REDDAWAY.caCharge
        )

        expect(quoteDetailForm.getReddawayArDiscountedRate()).toEqual(
          '$' + quoteObj.discountedRate
        )

        expect(quoteDetailForm.getReddawayArNetCharge()).toEqual(
          '$' + quoteObj.netCharge
        )

        // expect(quoteDetailForm.getReddawayApHighCost()).toEqual(
        //   'High Cost - $' + totalHighCostCharge
        // )

        // expect(quoteDetailForm.getReddawayArHighCost()).toEqual(
        //   'High Cost - $' + totalHighCostCharge
        // )
      })
    })
  })

  it('Reddaway should include the High Cost charge - High Cost Lt Min Charge and Min Charge', function () {
    browser.sleep(3000).then(function () {
      console.log('inside the third scnerio..')
      $('body').sendKeys(protractor.Key.ESCAPE)

      var internalForm = new InternalForm()
      var ltlQuoteForm = new LtlQuoteForm()

      browser.sleep(2000)
      var dataObj = testDataInfo.data
      var dataInput = dataObj.Highcostminvalueapplied_quote
      console.log('dataInput', dataInput)
      internalForm.setCompanyName(dataInput.company_name)
      ltlQuoteForm.setDataInObject(dataInput, internalForm)
      ltlQuoteForm.createLtlQuote(browser, internalForm)
      expect(true).toEqual(true)

      browser.sleep(2000)

      internalForm.clickGetQuote()
      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonReddaway()

        browser.sleep(2000)

        var totalHighCostCharge = internalForm.calulatHighCostChargeFromCWT()

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataObj.ar_fuel_charge,
          dataObj.ar_discount,
          localStorageValues.getArMasterDataByCompany().REDDAWAY.amc
        )

        expect(quoteDetailForm.getReddawayApGrossCharge()).toEqual(
          '$' + dataInput.ap_gross_charge
        )
        expect(quoteDetailForm.getReddawayArGrossCharge()).toEqual(
          '$' + dataInput.ar_gross_charge
        )

        expect(quoteDetailForm.getReddawayArDiscountedRate()).toEqual(
          '$' + quoteObj.discountedRate
        )

        expect(quoteDetailForm.getReddawayArNetCharge()).toEqual(
          '$' + quoteObj.netCharge
        )

        // expect(quoteDetailForm.getReddawayApHighCost()).toEqual(
        //   'High Cost - $' + totalHighCostCharge
        // )

        // expect(quoteDetailForm.getReddawayArHighCost()).toEqual(
        //   'High Cost - $' + totalHighCostCharge
        // )
      })
    })
    browser.sleep(2000)
  })

  it('Reddaway should include the High Cost charge - High Cost GT Max Charge', function () {
    browser.sleep(3000).then(function () {
      console.log('inside the third scnerio..')
      $('body').sendKeys(protractor.Key.ESCAPE)

      var internalForm = new InternalForm()
      var ltlQuoteForm = new LtlQuoteForm()

      browser.sleep(2000)
      var dataObj = testDataInfo.data
      var dataInput = dataObj.Highcostmaxvalueapplied_quote
      console.log('dataInput', dataInput)
      internalForm.setCompanyName(dataInput.company_name)
      ltlQuoteForm.setDataInObject(dataInput, internalForm)
      ltlQuoteForm.createLtlQuote(browser, internalForm)
      expect(true).toEqual(true)

      browser.sleep(2000)

      internalForm.clickGetQuote()
      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonReddaway()

        browser.sleep(2000)

        var totalHighCostCharge = internalForm.calulatHighCostChargeFromCWT()

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataObj.ar_fuel_charge,
          dataObj.ar_discount,
          localStorageValues.getArMasterDataByCompany().REDDAWAY.amc
        )

        expect(quoteDetailForm.getReddawayApGrossCharge()).toEqual(
          '$' + dataInput.ap_gross_charge
        )
        expect(quoteDetailForm.getReddawayArGrossCharge()).toEqual(
          '$' + dataInput.ar_gross_charge
        )

        expect(quoteDetailForm.getReddawayArDiscountedRate()).toEqual(
          '$' + quoteObj.discountedRate
        )

        expect(quoteDetailForm.getReddawayArNetCharge()).toEqual(
          '$' + quoteObj.netCharge
        )

        // expect(quoteDetailForm.getReddawayApHighCost()).toEqual(
        //   'High Cost - $' + totalHighCostCharge
        // )

        // expect(quoteDetailForm.getReddawayArHighCost()).toEqual(
        //   'High Cost - $' + totalHighCostCharge
        // )
      })
    })
    browser.sleep(2000)
  })

  it('Reddaway should include the additional Bay area charge SF Metro Charge to Zips currently not covered should be applied', function () {
    browser.sleep(3000).then(function () {
      console.log('inside the third scnerio..')
      $('body').sendKeys(protractor.Key.ESCAPE)

      var internalForm = new InternalForm()
      var ltlQuoteForm = new LtlQuoteForm()

      browser.sleep(2000)
      var dataObj = testDataInfo.data
      var dataInput = dataObj.Highcostsanfransicomincostvalueapplied_quote
      console.log('dataInput', dataInput)
      internalForm.setCompanyName(dataInput.company_name)
      ltlQuoteForm.setDataInObject(dataInput, internalForm)
      ltlQuoteForm.createLtlQuote(browser, internalForm)
      expect(true).toEqual(true)

      browser.sleep(2000)

      internalForm.clickGetQuote()
      browser.sleep(10000).then(function () {
        internalForm.clickViewButtonReddaway()

        browser.sleep(2000)

        var totalHighCostCharge = internalForm.calulatHighCostChargeFromCWT()

        const quoteObj = internalForm.calculateNetCharge(
          dataInput.ar_gross_charge,
          dataObj.ar_fuel_charge,
          dataObj.ar_discount,
          localStorageValues.getArMasterDataByCompany().REDDAWAY.amc
        )

        expect(quoteDetailForm.getReddawayApGrossCharge()).toEqual(
          '$' + dataInput.ap_gross_charge
        )
        expect(quoteDetailForm.getReddawayArGrossCharge()).toEqual(
          '$' + dataInput.ar_gross_charge
        )

        expect(quoteDetailForm.getReddawayArDiscountedRate()).toEqual(
          '$' + quoteObj.discountedRate
        )

        expect(quoteDetailForm.getReddawayArNetCharge()).toEqual(
          '$' + quoteObj.netCharge
        )

        // expect(quoteDetailForm.getReddawayApHighCost()).toEqual(
        //   'High Cost - $' + totalHighCostCharge
        // )

        // expect(quoteDetailForm.getReddawayArHighCost()).toEqual(
        //   'High Cost - $' + totalHighCostCharge
        // )
      })
    })
  })
})
