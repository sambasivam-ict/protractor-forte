var WorkbookPage = function () {
    this.typeOfUserElem = $('input[formControlName=typeOfUser]');
    this.companyNameElem = $('input[formControlName=companyName]');
    this.companyZipElem = element(by.id('companyZip'));
    this.saveBtnElem = element(by.id('saveBtn'));

    this.selectWorkbookElem = element(by.id('file-upload'));
    this.uploadSheetElem = element(by.id('saveuploadFileBtn'));

    this.shipmentDateElem = element(by.id('shipmentDate'));
    this.carrierElem = element(by.id('carrier'));
    this.originZipElem = element(by.id('originZip'));
    this.destinationZipElem = element(by.id('destinationZip'));
    this.piecesElem = element(by.id('pieces'));
    this.classificationElem = element(by.id('classification'));
    this.weightElem = element(by.id('weight'));
    this.fuelChargeElem = element(by.id('fuelCharge'));
    this.invoiceAmtElem = element(by.id('invoiceAmt'));

    this.addRowBtn = element(by.id('AddrowBtn'));
    this.carrierAnalyticsBtn = element(by.id('submitBtn'));

    this.chooseServiceTypeElem = element(by.id('serviceType'));

    this.apAmcElem = element(by.id('APAmc'));
    this.apAmcElem = element(by.id('ARAmc'));
    this.apDiscountElem = element(by.id('APDiscount'));
    this.arDiscountElem = element(by.id('ARDiscount'));

    this.addRulesBtn = element(by.id('AddRulesBtn'));
    this.categoryElem = $('input[formControlName=category]');
    this.directionsElem = $('input[formControlName=directions]');
    this.discountElem = element(by.id('discount'));
    this.amcruleElem = element(by.id('amcrule'));
    this.applyRuleBtn = element(by.id('applyRuleBtn'));
    this.finalApplyRuleBtn = element(by.id('applyRulesBTN'));
    this.saveDataBtn = element(by.id('saveDataBtn'));
    this.fileNameSaveYesBtn = element(by.id('fileNameSaveYes'));
    this.fileNameSaveConfirmBtn = element(by.id('fileNameSaveConfirm'));
    this.exportDataBtn = element(by.id('exportData'));
    this.contractDetailsBtn = element(by.id('contractDetailsBtn'));

    this.approvalRequestBtn = element(by.id('approvalRequestBtn'));
    this.exportTrafficFlowBtn = element(by.id('exportTrafficFlow'));
    this.exportAllDataBtn = element(by.id('exportdata'));
    this.swalConfirm = element(by.className('swal-button swal-button--confirm'));

    this.codeName = $('input[formControlName=codeName]');
    this.carrierAnalytics = element(by.id('carrierAnalytics'));

    

    

    this.setTypeOfUser = function (user) {
        this.typeOfUser = user;
    };
    this.enterTypeOfUser = function () {
        this.typeOfUserElem.sendKeys(this.typeOfUser).click();
    }

    this.setCompanyName = function (name) {
        this.companyName = name;
    };
    this.enterCompanyName = function () {
        var n = Date.now();
        let name = this.companyName + n;
        this.companyNameElem.sendKeys(name);
    };

    this.setCompanyZip = function (zip) {
        this.companyZip = zip;
    };
    this.enterCompanyZip = function () {
        this.companyZipElem.sendKeys(this.companyZip);
    };

    this.clickOnSaveBtn = function () {
        this.saveBtnElem.click();
    };

    this.selectSheet = function () {
        this.selectWorkbookElem.sendKeys("E:\fortee2e\Data\All Southern no accessorials.xlsx");
    };

    this.uploadSheet = function () {
        this.uploadSheetElem.click();
    };
    
    this.setShipmentDate = function (date) {
        this.shipmentDate = date;
    };
    this.enterShipmentDate = function () {
        this.shipmentDateElem.sendKeys(this.shipmentDate)
    };

    this.setCarrier = function (carrier) {
        this.carrier = carrier;
    };
    this.enterCarrier = function () {
        this.carrierElem.sendKeys(this.carrier);
    };

    this.setOriginZip = function (origin) {
        this.originZip = origin;
    };
    this.enterOriginZip = function () {
        this.originZipElem.sendKeys(this.originZip);
    };

    this.setDestinationZip = function (destination) {
        this.destinationZip = origin;
    };
    this.enterDestinationZip = function () {
        this.destinationZipElem.sendKeys(this.destinationZip);
    };

    this.setPieces = function (piece) {
        this.pieces = piece;
    };
    this.enterPieces = function () {
        this.piecesElem.sendKeys(this.pieces);
    };

    this.setClassification = function (classification) {
        this.classification = classification;
    };
    this.enterClassification = function () {
        this.classificationElem.sendKeys(this.classification);
    };

    this.setWeight = function (weight) {
        this.weight = weight;
    };
    this.enterWeight = function () {
        this.weightElem.sendKeys(this.weight);
    };

    this.setfuelCharge = function (fuelCharge) {
        this.fuelCharge = fuelCharge;
    };
    this.enterFuelCharge = function () {
        this.fuelChargeElem.sendKeys(this.fuelCharge);
    };

    this.setInvoiceAmt = function (invoiceAmt) {
        this.invoiceAmt = invoiceAmt;
    };
    this.enterInvoiceAmt = function () {
        this.invoiceAmtElem.sendKeys(this.invoiceAmt);
    };
    
    this.clickOnAddBtn = function () {
        this.addRowBtn.click();
    };

    this.clickOnCarrierAnanlyticsBtn = function () {
        this.carrierAnalyticsBtn.click();
    };

};

module.exports = WorkbookPage;
