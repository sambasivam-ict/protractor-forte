/**
 * Created by Rozario on 29/04/2020.
 */

var InternalViewForm = function () {
  this.orginzipcodeElem = $("input[formControlName=origin]");

  this.DestinationzipcodeElem = $("input[formControlName=destination]");

  this.ClassElem = $("input[formControlName=classification]");

  this.WeightElem = $("input[formControlName=weight]");

  this.AddBtnElem = element(by.className("logisticsBtn"));

  this.ClickGetQuoteElem = element(by.id("getQuote"));

  this.selectElemCompany = $("select[formControlName=customer]");

  this.viewBtnYrc = element(by.id("yrcView"));
  this.viewBtnFedex = element(by.id("economyView"));
  this.viewBtnReddaway = element(by.id("reddawayView"));

  this.selectAccessorials = element(by.id("selectedItems"));

  this.selectSpecificAccessorial = element(by.className("pure-checkbox"));

  this.clickDrowpDown = element(by.id("Capa_1"));

  //this.getQuoteElem = $("button[id=getQuote]");

  //this.selectCompanyElem = $(by.id("customer"));

  var OrginZipcode;
  var Destinationzipcode;
  var Class;
  var Weight;
  var highCostDollorPerCWT;
  var companyName;

  this.setOrginzipcode = function (orginzipcode) {
    this.orginzipcode = orginzipcode;
  };

  this.setHighCostDollorPerCWT = function (highCostDollorPerCWT) {
    this.highCostDollorPerCWT = highCostDollorPerCWT;
  };

  this.setCompanyName = function (companyName) {
    this.companyName = companyName;
  };

  this.getCompanyName = function () {
    return this.companyName;
  };

  this.selectCompany = function () {
    this.selectElemCompany.$('[value="157"]').click();
  };

  this.selectCompanyForRules = function () {
    this.selectElemCompany
      .element(by.cssContainingText("option", this.getCompanyName()))
      .click();
  };

  this.clickSelectAccessorialMultiSelect = function () {
    this.selectAccessorials.click();
  };

  this.clickLiftGateAccessorial = function () {
    this.selectSpecificAccessorial[0].click();
  };

  this.selectLiftgateAccessorial = function () {
    var selectElem = this.selectAccessorials;

    var listElems = selectElem.all(this.selectSpecificAccessorial);

    console.log("list items...", listElems);

    listElems[0].click();
  };

  this.clickDownIcon = function () {
    this.clickDrowpDown.click();
  };

  this.clickGetQuote = function () {
    this.ClickGetQuoteElem.click();
  };

  this.clickViewButtonYrc = function () {
    this.viewBtnYrc.click();
  };

  this.clickViewButtonFedex = function () {
    this.viewBtnFedex.click();
  };

  this.clickViewButtonReddaway = function () {
    this.viewBtnReddaway.click();
  };

  this.getOriginElem = function () {
    return this.orginzipcodeElem;
  };

  this.enterOrginZipcode = function () {
    console.log("this.originzipcodeel", this.orginzipcodeElem);
    this.orginzipcodeElem.sendKeys(this.orginzipcode);
  };

  this.setDestinationzipcode = function (destinationzipcode) {
    this.destinationzipcode = destinationzipcode;
  };

  this.enterdestinationzipcode = function () {
    this.DestinationzipcodeElem.sendKeys(this.destinationzipcode);
  };

  this.setClass = function (Class) {
    this.Class = Class;
  };

  this.enterClass = function () {
    this.ClassElem.sendKeys(this.Class);
  };

  this.setWeight = function (Weight) {
    this.Weight = Weight;
  };

  this.enterWeight = function () {
    this.WeightElem.sendKeys(this.Weight);
  };

  this.clickAddBtn = function () {
    this.AddBtnElem.click();
  };

  this.ClickGetQuote = async function () {
    this.ClickGetQuoteElem.click();
  };

  this.calulatHighCostChargeFromCWT = function () {
    return (
      (Number(this.Weight) / 100) *
      Number(this.highCostDollorPerCWT)
    ).toFixed(2);
  };

  this.calculateNetCharge = function (grossCharge, discount, fuelDiscount) {
    discountedRate = ((1 - discount / 100) * grossCharge).toFixed(2);
    fuelCharge = ((Number(discountedRate) * fuelDiscount) / 100).toFixed(2);
    netCharge = (Number(discountedRate) + Number(fuelCharge)).toFixed(2);

    console.log("discountedRate: ", discountedRate);
    console.log("fuelCharge: ", fuelCharge);
    console.log("netCharge: ", netCharge);

    var obj = {
      grossCharge,
      fuelDiscount,
      discountedRate: discountedRate,
      fuelCharge: fuelCharge,
      netCharge: netCharge,
    };

    return obj;
  };
};
module.exports = InternalViewForm;
