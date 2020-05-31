var QuoteDetailForm = function () {
  this.yrcApGrossElem = element(by.id("yrcAPGrosscharge"));
  this.yrcArGrossElem = element(by.id("yrcARGross"));

  this.yrcArDiscountedRateElem = element(by.id("yrcArDiscountedRate"));
  this.yrcArNetChargeElem = element(by.id("yrcArNetCahrge"));

  this.yrcApCaChargeElem = element(by.id("yrcApAdditional"));
  this.yrcArCaChargeElem = element(by.id("yrcArAdditional"));

  this.yrcShipTypesElem = element(by.id("yrcshipTypesAP"));

  this.yrcApHighCostElem = element(by.id("yrcApHighCost"));
  this.yrcArHighCostElem = element(by.id("yrcArHighCost"));

  // this.fedexEcoApGrossElem = element(by.id(""));
  // this.fedexEcoArGrossElem = element(by.id(""));

  
  this.getYrcApGrossCharge = async function () {
    //var grossCharge = await this.yrcApGrossElem.getText();
    return await this.yrcApGrossElem.getText();
  };
  this.getYrcArGrossCharge = async function () {
    return await this.yrcArGrossElem.getText();
  };

  this.getYrcArDiscountedRate = async function () {
    return await this.yrcArDiscountedRateElem.getText();
  };

  this.getYrcArNetCharge = async function () {
    return await this.yrcArNetChargeElem.getText();
  };
};
module.exports = QuoteDetailForm;
