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

  this.selectElemComapny = $("select[formControlName=customer]");

 // this.viewBtnFedex = element(by.id("view2"));

  this.selectAccessorials = element(by.id("selectedItems"));

  this.selectSpecificAccessorial = element(by.className("pure-checkbox"));

  this.clickDrowpDown = element(by.id("Capa_1"));

  //this.getQuoteElem = $("button[id=getQuote]");

  //this.selectCompanyElem = $(by.id("customer"));

  var OrginZipcode;
  var Destinationzipcode;
  var Class;
  var Weight;

  this.setOrginzipcode = function (orginzipcode) {
    this.orginzipcode = orginzipcode;
  };

  this.selectCompany = function () {
    this.selectElemComapny.$('[value="157"]').click();
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

  this.clickDrowpDown = function () {
    this.clickDrowpDown.click();
  };

  this.clickGetQuote = function () {
    this.ClickGetQuoteElem.click();
  };
/*
  this.clickViewButtonFedex = function () {
    this.viewBtnFedex.click();
  };

  */

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
/*
  this.ClickGetQuote = asyncfunction (){
    this.ClickGetQuoteElem.click();

  };
  */
    }

module.exports = InternalViewForm;
