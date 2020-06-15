var CreateBolForm = function () {
  this.ShipperCompanyNameElem = $('input[formControlName=shipperCompanyName]');

  this.ShipperContactElem = element(by.id('shipperPhone'));

  this.ShipperStreet1Elem = element(by.id('streetshipper1'));

  this.ShipperZipElem = element(by.id('shipperZipTest1'));

  this.ConsigneeNameElem = element(by.id('consigneeFocus'));

  this.ConsigneeContactNameElem = element(by.id('cnsigneeContactName'));

  this.ConsigneeContactNumberElem = element(by.id('consigneePhneNumber1'));

  this.ConsigneeStreet1Elem = element(by.id('consigneeStreet1'));

  this.ConsigneeZipElem = element(by.id('consigneeZip1'));

  this.SplInstructionsElem = element(by.id('specialInstructionCount'));

  this.ShipmentTypeElem = $('input[formControlName=shipmentType]');

  this.ShipmentItemizedElem = element(by.id('shipmentTypesItemized2'));

  this.ThirPartyElem = $('input[formControlName=thirdParty]');

  this.HazmatElem = $('input[formControlName=hazmat]');

  this.HandlingUnitQuantityElem = element(by.id('handlingUnitQuantity'));

  this.HandlingUnitTypeElem = element(by.id('handlingUnitType'));

  this.PackageQuantityElem = element(by.id('packageQuantity'));

  this.PackageUnitTypeElem = element(by.id('packageUnitType'));

  this.WeightElem = element(by.id('weight'));

  this.DescElem = element(by.id('desc'));

  this.takeDescModal = element(by.id('tasknote'));

  this.DescriptionModal = element(by.id('description-modal'));

  this.LengthElem = element(by.id('length'));

  this.WidthElem = element(by.id('width'));

  this.HeightElem = element(by.id('height'));

  this.nmfcElem = $('input[formControlName=nmfc]');

  this.ClassificationElem = element(by.id('classification'));

  this.AddBtnElem = element(by.id('addButton'));

  this.GetRateElem = element(by.id('getRate'));

  this.CreateBolElem = element(by.id('create'));

  this.ChooseServiceTypeElem = element(by.id('serviceType'));

  this.CreatebolfocusElem = element(by.id('createbolfocus'));

  this.ClickGetQuoteElem = element(by.id('getQuote'));

  this.ClickOnGetRateElem = element(by.id('getrate1'));

  this.QuoteRateForCarrier = element(by.id('quoterate'));

  this.ClickOnFinalBolElem = element(by.id('createbolfocus'));

  this.ClickForAlternateCarrierElem = element(by.id('pickanothercarrier'));

  this.ClickOnViewBtnInRateModalElem = element(by.id('viewCheck'));
  
  
  /**Itemized Elements */

  this.ClickOnAddPiecesModalElem = element(by.id('addnewpieces0'));

  this.ClickOnOpenModalElem = element(by.id('add-pieces-modal'));

  this.PackageQuantityForPiecesElem = element(by.id('packageQuantityForPieces'));

  this.WeightForPiecesElem = element(by.id('weightForPieces'));

  this.DescForPiecesElem = element(by.id('descForPieces1'));

  this.setShipperStreet1 = function (shipperStreet) {
    this.shipperStreet = shipperStreet
  }

  this.enterShipperStreet1 = function () {
    this.ShipperStreet1Elem.sendKeys(this.shipperStreet)
  }
  this.setConsigneeName = function (consigneeName) {
    this.consigneeName = consigneeName
  }

  this.enterConsigneeName = function () {
    this.ConsigneeNameElem.sendKeys(this.consigneeName)
  }

  this.setConsigneeContactName = function (consigneeContactName) {
    this.consigneeContactName = consigneeContactName
  }

  this.enterConsigneeContactName = function () {
    this.ConsigneeContactNameElem.sendKeys(this.consigneeContactName)
  }

  this.setConsigneeContactNumber = function (consigneeContact) {
    this.consigneeContact = consigneeContact
  }

  this.enterConsigneeContactNumber = function () {
    this.ConsigneeContactNumberElem.sendKeys(this.consigneeContact)
  }
  this.setConsigneeStreet1 = function (consigneeStreet) {
    this.consigneeStreet = consigneeStreet
  }

  this.enterConsigneeStreet1 = function () {
    this.ConsigneeStreet1Elem.sendKeys(this.consigneeStreet)
  }
  this.setConsigneezipcode = function (consigneezip) {
    this.consigneezip = consigneezip
  }

  this.enterConsigneezipcode = function () {
    this.ConsigneeZipElem.sendKeys(this.consigneezip)
  }

  this.setSplInstructions = function (splInstructions) {
    this.splInstructions = splInstructions
  }

  this.enterSplInstructions = function () {
    this.SplInstructionsElem.sendKeys(this.splInstructions)
  }

  this.setShipmentType = function (shipmentType) {
    this.shipmentType = shipmentType
  }

  this.enterShipmentType = function () {
    this.ShipmentTypeElem.sendKeys(this.shipmentType);
  }

  this.enterShipmentTypeItemied = function () {
    console.log('this.enterShipmentTypeItemized', this.shipmentType);
    this.ShipmentItemizedElem.click();
  }

  this.setThirdParty = function (thirdParty) {
    this.thirdParty = thirdParty
  }

  this.enterThirdParty = function () {
    this.ThirPartyElem.sendKeys(this.thirdParty)
  }

  this.setHazmat = function (hazmat) {
    this.hazmat = hazmat
  }

  this.enterHazmat = function () {
    this.HazmatElem.sendKeys(this.hazmat)
  }

  this.setHandlingUnitQuantity = function (handlingUnitQuantity) {
    this.handlingUnitQuantity = handlingUnitQuantity
  }

  this.enterHandlingUnitQuantity = function () {
    this.HandlingUnitQuantityElem.sendKeys(this.handlingUnitQuantity)
  }

  this.setHandlingUnitType = function (handlingUnitType) {
    this.handlingUnitType = handlingUnitType
  }

  this.enterHandlingUnitType = function () {
    this.HandlingUnitTypeElem.sendKeys(this.HandlingUnitTypeElem)
  }

  this.setPackageUnitQuantity = function (packageUnitQuantity) {
    this.packageUnitQuantity = packageUnitQuantity
  }

  this.enterPackageUnitQuantity = function () {
    this.PackageQuantityElem.sendKeys(this.packageUnitQuantity)
  }

  this.setPackageUnitType = function (packageUnit) {
    this.packageUnit = packageUnit
  }

  this.enterPackageUnitType = function () {
    this.PackageUnitTypeElem.sendKeys(this.packageUnit)
  }

  this.setWeight = function (weight) {
    this.weight = weight
  }

  this.enterWeight = function () {
    this.WeightElem.sendKeys(this.weight)
  }

  this.setDesc = function (desc) {
    this.desc = desc
  }

  this.enterDesc = function () {
    this.DescElem.sendKeys(this.desc);
    
    this.takeDescModal.sendKeys(protractor.Key.ENTER); 
     this.takeDescModal.sendKeys(protractor.Key.ENTER); 
  }
  this.setLength = function (length) {
    this.length = length;
  };

  this.enterLength = function () {
    this.LengthElem.sendKeys(this.length)
  };
  this.setWidth = function (width) {
    this.width = width;
  };

  this.enterWidth = function () {
    this.WidthElem.sendKeys(this.width);
  };
  this.setHeight = function (height) {
    this.height = height;
  };

  this.enterHeight = function () {
    this.HeightElem.sendKeys(this.height);
  };
  this.setNmfc = function (nmfc) {
    this.nmfc = nmfc;
  };

  this.enterNmfc = function () {
    this.nmfcElem.sendKeys(this.nmfc);
  };
  this.setClass = function (classification) {
    this.classification = classification;
  };

  this.enterClass = function () {
    this.ClassificationElem.sendKeys(this.classification)
  }

  this.clickAddBtn = function () {
    this.AddBtnElem.click()
  }

  this.clickGetRateBtn = function () {
    this.GetRateElem.click()
  }

  this.clickCreateBolBtn = function () {
    this.CreateBolElem.click();
  }


  this.setCarrier = function (carrier) {
    this.carrierName = carrier;
  };

  this.selectCarrier = function () {
    this.ChooseServiceTypeElem.sendKeys(this.carrierName).click();
  };
  // this.setCarrier = function (carrier) {
  //   console.log('carrier', carrier);
  //   this.carrierName = carrier;
  // };

  // this.getCarrier = function () {
  //   return this.carrierName;
  // };

  // this.selectCarrier = function () {
  //   console.log('this.selectCarrier');
  //   this.ChooseServiceTypeElem.sendKeys(this.carrierName);
  //   this.ChooseServiceTypeElem
  //   .element(by.cssContainingText("option", this.getCarrier()))
  //   .click();
  //     element(by.cssContainingText('option', this.getCarrier())).click();
  // };

  this.clickGetRateForCarrier = function () {
    this.ClickOnGetRateElem.click();
  };

  this.clickOnFinalBolBtn = function () {
    this.ClickOnFinalBolElem.click();
  };
  
  
  this.ClickOnToAddPieces = function () {
    element(by.id('addnewpieces0')).click();
  };

  this.clickOnToOpenModal = function () {
    this.ClickOnOpenModalElem.open();
  };

  this.setPackageQuantityPieces = function (pieces) {
    this.packagePieces = pieces;
  };
  this.enterPackageQuantityPieces = function () {
    this.PackageQuantityForPiecesElem.sendKeys(this.packagePieces);
  }
  this.setWeightPieces = function (weight) {
    this.weightPieces = weight;
  };
  this.enterWeightPieces = function () {
    this.WeightForPiecesElem.sendKeys(this.weightPieces);
  };
  this.setDescPieces = function (desc) {
    this.descPieces = desc;
  };
  this.enterDescPieces = function () {
    this.DescForPiecesElem.sendKeys(this.descPieces);
    this.takeDescModal.sendKeys(protractor.Key.ENTER); 
    this.takeDescModal.sendKeys(protractor.Key.ENTER); 
  };
}

module.exports = CreateBolForm;
