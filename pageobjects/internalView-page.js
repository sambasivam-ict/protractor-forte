/**
 * Created by Rozario on 29/04/2020.
 */

var InternalViewForm = function () {
  this.orginzipcodeElem = $('input[formControlName=origin]')

  this.DestinationzipcodeElem = $('input[formControlName=destination]')

  this.ClassElem = $('input[formControlName=classification]')

  this.WeightElem = $('input[formControlName=weight]')

  this.AddBtnElem = element(by.className('logisticsBtn'))

  this.ClickGetQuoteElem = element(by.id('getQuote'))

  this.selectElemCompany = $('select[formControlName=customer]')

  //this.selectAccessorials = element(by.id("selectedItems"));
  this.viewBtnYrc = element(by.id('yrcView'))
  this.viewBtnFedex = element(by.id('economyView'))
  this.viewBtnReddaway = element(by.id('reddawayView'))

  this.selectAccessorials = element(by.name('selectedItems'))

  this.selectSpecificAccessorial = element(by.className('pure-checkbox'))

  this.clickDrowpDown = element(by.id('Capa_1'))

  this.clearAllBtn = element(by.id('clear'))

  this.welcomeUserElem = element(by.id('navbarDropdownMenuLink'))
  this.welcomeMenuElem = element(by.id('wlcm-menu'))
  this.logoutElem = element(by.id('wlcm-item'))

  //this.getQuoteElem = $("button[id=getQuote]");

  //this.selectCompanyElem = $(by.id("customer"));
  this.accessorialValue = dropdownList = [
    {
      id: 1,
      itemName: 'LiftGate Service',
      Yrccost: '8.80',
      Fedexcost: '72.06'
    },
    { id: 2, itemName: 'Residential Delivery', Yrccost: '11', Fedexcost: '76' },
    {
      id: 3,
      itemName: 'Limited Access Delivery',
      Yrccost: '0',
      Fedexcost: '76'
    },
    {
      id: 4,
      itemName: 'Inside Delivery',
      Yrccost: '11.85',
      Fedexcost: '6.98',
      FedexcostAR: '11.40'
    },
    { id: 5, itemName: 'Notify', Yrccost: '0', Fedexcost: '0' },
    {
      id: 7,
      itemName: 'Delivery Appointment Required',
      Yrccost: '0',
      Fedexcost: '0'
    }
    // {'id': 6, 'itemName': 'Others'}
  ]

  var OrginZipcode
  var Destinationzipcode
  var Class
  var Weight
  var highCostDollorPerCWT
  var companyName

  this.setOrginzipcode = function (orginzipcode) {
    this.orginzipcode = orginzipcode
  }

  this.setHighCostDollorPerCWT = function (highCostDollorPerCWT) {
    this.highCostDollorPerCWT = highCostDollorPerCWT
  }

  this.setCompanyName = function (companyName) {
    this.companyName = companyName
  }

  this.getCompanyName = function () {
    return this.companyName
  }

  this.selectCompany = function () {
    this.selectElemCompany
      .element(by.cssContainingText('option', this.getCompanyName()))
      .click()
  }

  this.selectCompanyForRules = function () {
    this.selectElemCompany
      .element(by.cssContainingText('option', this.getCompanyName()))
      .click()
  }
  this.setAccessorials = function (data) {
    console.log('set for accessorials', data)
    this.accessorial = data
  }

  this.enterAccessorials = function () {
    console.log('data for accessorials', this.accessorial);
    if (this.accessorial !== undefined) {
    if (this.accessorial.length > 0) {
      element(by.id('selectedItems')).click()
      let ulListElement = element(by.className('lazyContainer'))
      for (let i = 0; i < this.accessorial.length; i++) {
        let accessorialData = this.accessorial[i]
        let filteredAccessorialValue = []
        filteredAccessorialValue = this.accessorialValue.filter(
          value => value['id'] === accessorialData['id']
        )
        console.log('filteredAccessorialValue', i, filteredAccessorialValue)
        if (filteredAccessorialValue.length > 0) {
          ulListElement
            .all(by.tagName('li'))
            .get(Number(filteredAccessorialValue[0].id) - 1)
            .click()
        }
      }
    }
  }
  }

  this.clickSelectAccessorialMultiSelect = function () {
    this.selectAccessorials.sendKeys()
  }

  this.clickLiftGateAccessorial = function () {
    this.selectSpecificAccessorial[0].click()
  }

  this.selectLiftgateAccessorial = function () {
    var selectElem = this.selectAccessorials

    var listElems = selectElem.all(this.selectSpecificAccessorial)

    console.log('list items...', listElems)

    listElems[0].click()
  }

  this.clickDownIcon = function () {
    this.clickDrowpDown.click()
  }

  this.clearAllIcon = function () {
    this.clearAllBtn.click()
  }
  this.clickGetQuote = function () {
    this.ClickGetQuoteElem.click()
  }

  this.clickViewButtonYrc = function () {
    this.viewBtnYrc.click()
  }

  this.clickViewButtonFedex = function () {
    this.viewBtnFedex.click()
  }

  this.clickViewButtonReddaway = function () {
    this.viewBtnReddaway.click()
  }

  this.getOriginElem = function () {
    return this.orginzipcodeElem
  }

  this.enterOrginZipcode = function () {
    this.orginzipcodeElem.sendKeys(this.orginzipcode)
  }

  this.setDestinationzipcode = function (destinationzipcode) {
    this.destinationzipcode = destinationzipcode
  }

  this.enterdestinationzipcode = function () {
    this.DestinationzipcodeElem.sendKeys(this.destinationzipcode)
  }

  this.setClass = function (Class) {
    this.Class = Class
  }

  this.enterClass = function () {
    this.ClassElem.sendKeys(this.Class)
  }

  this.setWeight = function (Weight) {
    this.Weight = Weight
  }

  this.enterWeight = function () {
    this.WeightElem.sendKeys(this.Weight)
  }

  this.clickAddBtn = function () {
    this.AddBtnElem.click()
  }

  this.enterClassForDummy = function () {
    this.ClassElem.sendKeys(this.Class)
  }

  this.ClickGetQuote = async function () {
    this.ClickGetQuoteElem.click()
  }

  this.clickOnWelcomeUser = function () {
    this.welcomeUserElem.click()
  }

  this.clickOnWelcomeMenu = function () {
    this.welcomeMenuElem.click()
  }

  this.clickOnLogoutUser = function () {
    this.logoutElem.click()
  }

  this.calulatHighCostChargeFromCWT = function (weight, highCostDollorPerCWT) {
    return ((Number(weight) / 100) * Number(highCostDollorPerCWT)).toFixed(2)
  }

  this.calculateNetCharge = function (
    grossCharge,
    discount,
    fuelDiscount,
    amc,
    costplusFactor
  ) {
    console.log('CalculateCharge', grossCharge, discount, fuelDiscount, amc)
    if (Number(discount) == 0) {
      discountedRate = grossCharge
      console.log('CalculateCharge 123', discountedRate)
    } else {
      discountedRate = ((1 - discount / 100) * grossCharge).toFixed(2)
      console.log('CalculateCharge 456', discountedRate)
    }
    if (costplusFactor) {
      let costplusValue = (discountedRate * costplusFactor) / 100
      discountedRate = Number(costplusValue) + Number(discountedRate)
    }
    if (Number(discountedRate) < Number(amc)) {
      discountedRate = amc
    }
    fuelCharge = ((Number(discountedRate) * fuelDiscount) / 100).toFixed(2)
    netCharge = (Number(discountedRate) + Number(fuelCharge)).toFixed(2)

    console.log('discountedRate: ', discountedRate)
    console.log('fuelCharge: ', fuelCharge)
    console.log('netCharge: ', netCharge)

    var obj = {
      grossCharge,
      fuelDiscount,
      discountedRate: discountedRate,
      fuelCharge: fuelCharge,
      netCharge: netCharge
    }

    return obj
  }
}
module.exports = InternalViewForm
