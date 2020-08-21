var QuoteDetailCustomerViewForm = function () {

    this.totalGrossElem = element(by.id("totalGrossAR"));

    this.CaChargeElem = element(by.id("cAChargeYRCREDAWAY"));
  
    this.shipTypesElem = element(by.id("yrcshipTypesAP"));
  
    this.highCostElem = element(by.id("highCost"));

    this.fedexShipTypeElem = element(by.id("resultShipTypes"));

    this.reddawayNoServiceElem = element(by.id("servicenotavailable"));
  
  
    this.fedexEcoApGrossElem = element(by.id("economyAPtotalGrossCharge"));
    this.fedexEcoArGrossElem = element(by.id("economyARTotalGrossCharge"));
    this.fedexEcoArDiscountedRateElem = element(by.id("economyARDiscountedRate"));
    this.fedexEcoArNetChargeElem = element(by.id("economyARNetCharge"));
    
    this.fedexEcoArHighCostElem = element(by.id("economyARHighCost"));
    this.fedexEcoApCaChargeElem = element(by.id("economyAPCACharge"));
    this.fedexEcoArCaChargeElem = element(by.id("economyARCACharge"));
  
    this.fedexPriApGrossElem = element(by.id("priorityApTotal"));
    this.fedexPriArGrossElem = element(by.id("priorityArTotalGross"));
    this.fedexPriArDiscountedRateElem = element(by.id("priorityARDiscountedRate"));
    this.fedexPriArNetChargeElem = element(by.id("priorityARNetCharge"));
    //this.fedexPriApHighCostElem = element(by.id("priorityApCACharge"));
    //this.fedexPriArHighCostElem = element(by.id("priorityArCACharge"));
    //this.fedexPriApCaChargeElem = element(by.id("priorityApCACharge"));
    //this.fedexPriArCaChargeElem = element(by.id("priorityArCACharge"));
  
    this.reddawayApGrossElem = element(by.id("reddawayAPTotalGrossCharge"));
    this.reddawayArGrossElem = element(by.id("reddawayARTotalGrossCharge"));
    this.reddawayArDiscountedRateElem = element(by.id("reddawayARDiscountedrate"));
    this.reddawayArNetChargeElem = element(by.id("reddawayARNetCharge"));
    this.reddawayApHighCost = element(by.id("reddawayApHighCost"));
    this.reddawayArHighCost = element(by.id("reddawayARHighCost"));
    this.reddawayApCaCharge = element(by.id("reddawayAPCACharge"));
    this.reddawayArCaCharge = element(by.id("reddawayARCACharge"));
  
  
  
    this.getGrossCharge = async function () {
      return await this.totalGrossElem.getText();
    };
   
    this.getYrcShipTypes = async function () {
      return await this.yrcShipTypesElem.getText();
    };
    this.getCaCharge = async function () {
      return await this.CaChargeElem.getText();
    };
    
    this.getHighCost = async function () {
      return await this.highCostElem.getText();
    };
    this.getFedexShipType = async function () {
      return await this.fedexShipTypeElem.getText();
    };
  
    this.getReddawayNoService -  function () {
      return this.reddawayNoServiceElem.getText();
    }
    // this.getFedexEcoApGrossCharge = async function () {
    //   return await this.fedexEcoApGrossElem.getText();
    // };
    // this.getFedexEcoArGrossCharge = async function () {
    //   return await this.fedexEcoArGrossElem.getText();
    // };
    // this.getFedexEcoArDiscountedRate = async function () {
    //   return await this.fedexEcoArDiscountedRateElem.getText();
    // };
    // this.getFedexEcoArNetCharge = async function () {
    //   return await this.fedexEcoArNetChargeElem.getText();
    // };
  
    // this.getFedexEcoApHighCost = async function () {
    //   return await this.fedexEcoApHighCostElem.getText();
    // };
    // this.getFedexEcoArHighCost = async function () {
    //   return await this.fedexEcoArHighCostElem.getText();
    // };
    // this.getFedexEcoApCaCharge = async function () {
    //   return await this.fedexEcoApCaChargeElem.getText();
    // };
    // this.getFedexEcoArCaCharge = async function () {
    //   return await this.fedexEcoArCaChargeElem.getText();
    // };
  
    // this.fedexPriApGrossElem = element(by.id("priorityApTotal"));
    // this.fedexPriArGrossElem = element(by.id("priorityArTotalGross"));
    // this.fedexPriArDiscountedRateElem = element(by.id("priorityARDiscountedRate"));
    // this.fedexPriArNetChargeElem = element(by.id("priorityARNetCharge"));
    //this.fedexPriApHighCostElem = element(by.id("priorityApCACharge"));
    //this.fedexPriArHighCostElem = element(by.id("priorityArCACharge"));
    //this.fedexPriApCaChargeElem = element(by.id("priorityApCACharge"));
    //this.fedexPriArCaChargeElem = element(by.id("priorityArCACharge"));
  
    // this.getFedexPriApGrossCharge = async function () {
    //   return await this.fedexPriApGrossElem.getText();
    // };
    // this.getFedexPriArGrossCharge = async function () {
    //   return await this.fedexPriArGrossElem.getText();
    // };
    // this.getFedexPriArDiscountedRate = async function () {
    //   return await this.fedexPriArDiscountedRateElem.getText();
    // };
    // this.getFedexPriArNetCharge = async function () {
    //   return await this.fedexPriArNetChargeElem.getText();
    // };
  
    // this.getFedexPriApHighCost = async function () {
    //   return await this.fedexEcoApHighCostElem.getText();
    // };
    // this.getFedexEcoArHighCost = async function () {
    //   return await this.fedexEcoArHighCostElem.getText();
    // };
    // this.getFedexEcoApCaCharge = async function () {
    //   return await this.fedexEcoApCaChargeElem.getText();
    // };
    // this.getFedexEcoArCaCharge = async function () {
    //   return await this.fedexEcoArCaChargeElem.getText();
    // };
  
    // this.getReddawayApGrossCharge = async function () {
    //   return await this.reddawayApGrossElem.getText();
    // };
    // this.getReddawayArGrossCharge = async function () {
    //   return await this.reddawayArGrossElem.getText();
    // };
    // this.getReddawayArDiscountedRate = async function () {
    //   return await this.reddawayArDiscountedRateElem.getText();
    // };
    // this.getReddawayArNetCharge = async function () {
    //   return await this.reddawayArNetChargeElem.getText();
    // };
    // this.getReddawayApHighCost = async function () {
    //   return await this.reddawayApHighCost.getText();
    // };
    // this.getReddawayArHighCost = async function () {
    //   return await this.reddawayArHighCost.getText();
    // };
    // this.getReddawayApCaCharge = async function () {
    //   return await this.reddawayApCaCharge.getText();
    // };
    // this.getReddawayArCaCharge = async function () {
    //   return await this.reddawayArCaCharge.getText();
    // };
  };
  module.exports = QuoteDetailCustomerViewForm;
  