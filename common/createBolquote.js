var CreateBolQuote = function () {
  this.setShipmentType = function (testData, createBolForm) {
    this.shipmentType = testData.ShipmentType;
    console.log('this.shipmentType 1', this.shipmentType);
  }
  this.setDataInObject = function (testData, createBolForm) {
    console.log('this.shipmentType 2', this.shipmentType);
    createBolForm.setShipperStreet1(testData.ShipperStreet1)
    createBolForm.setConsigneeName(testData.ConsigneeCompanyName)
    createBolForm.setConsigneeContactName(testData.ConsigneeContactName)
    createBolForm.setConsigneeContactNumber(testData.ConsigneeContactNumber)
    createBolForm.setConsigneeStreet1(testData.ConsigneeStreet1)
    createBolForm.setConsigneezipcode(testData.ConsigneeZip)
    createBolForm.setThirdParty(testData.ThirdParty)
    createBolForm.setShipmentType(testData.ShipmentType)
    createBolForm.setHazmat(testData.Hazmat)
    createBolForm.setHandlingUnitQuantity(testData.HandlingUnitQuantity)
    // createBolForm.setHandlingUnitType(testData.HandlingUnitType);
    createBolForm.setPackageUnitQuantity(testData.PackageQuantity)
    createBolForm.setPackageUnitType(testData.PackageUnitType)
    createBolForm.setWeight(testData.Weight)
    createBolForm.setDesc(testData.Description)
    createBolForm.setLength(testData.Length)
    createBolForm.setWidth(testData.Width)
    createBolForm.setHeight(testData.Height)
    createBolForm.setNmfc(testData.NMFC)
    createBolForm.setClass(testData.Classification)
    createBolForm.setSplInstructions(testData.SplInstructions)
    createBolForm.setCarrier(testData.ServiceType)
    if (testData.ShipmentType == 'Itemized') {
      createBolForm.setPackageQuantityPieces(testData.PackageForPieces);
      createBolForm.setWeightPieces(testData.WeightForPieces);
      createBolForm.setDescPieces(testData.DescriptionForPieces);
    }
  }

  this.createBolQuote = function (browser, createBolForm, testData) {
    console.log('this.shipmentType 3', this.shipmentType);
    createBolForm.enterShipperStreet1()
    createBolForm.enterConsigneeName()
    createBolForm.enterConsigneeContactName()
    createBolForm.enterConsigneeContactNumber()
    browser.sleep(2000)
    createBolForm.enterConsigneeStreet1()
    createBolForm.enterConsigneezipcode()
    browser.sleep(3000)
    createBolForm.enterThirdParty()
    if (this.shipmentType == 'Itemized') {
      console.log('this.shipmentType 45', this.shipmentType);
      createBolForm.enterShipmentTypeItemied();
    } else {
      console.log('this.shipmentType 67', this.shipmentType);
    createBolForm.enterShipmentType();
    }
    createBolForm.enterHazmat()
    browser.sleep(2000)

    createBolForm.enterHandlingUnitQuantity()
    browser.sleep(2000)
    createBolForm.enterPackageUnitQuantity()
    browser.sleep(2000)
    createBolForm.enterPackageUnitType()
    browser.sleep(2000)
    createBolForm.enterWeight()
    createBolForm.enterDesc()
    browser.sleep(5000)

    createBolForm.enterLength()
    createBolForm.enterWidth()
    createBolForm.enterHeight()
    createBolForm.enterNmfc()
    createBolForm.enterClass()

    createBolForm.clickAddBtn();
    browser.sleep(10000);
    
    if (this.shipmentType == 'Itemized') {
      createBolForm.ClickOnToAddPieces();
      browser.sleep(2000)
      createBolForm.enterPackageQuantityPieces()
      createBolForm.enterWeightPieces()
      browser.sleep(2000)
      createBolForm.enterDescPieces()
    }
    createBolForm.enterSplInstructions()
    browser.sleep(2000)
    createBolForm.clickGetRateBtn()
    browser.sleep(3000)
    createBolForm.clickCreateBolBtn()
    browser.sleep(5000)
    createBolForm.selectCarrier()
    browser.sleep(5000)
    createBolForm.clickGetRateForCarrier()
    browser.sleep(12000)
    createBolForm.clickOnFinalBolBtn()
    browser.sleep(10000)
  }
}

module.exports = CreateBolQuote
