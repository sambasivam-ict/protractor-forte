var CreateBolSummaryForm = function () {
    this.yrcOriginZipCodeElem = element(by.id('yrcshipperpostal'));
    this.yrcDestinationCodeElem = element(by.id('yrcconsigneepostalcode'));
    this.yrcCarrierSCACCodeElem = element(by.id('yrcserviceType'));
    this.yrcRateElem = element(by.id('yrcRate'));
    this.yrcCreatePickUpBtnElem = element(by.id(''));
    this.fedexEcoOriginZipCodeElem = element(by.id('sipperpostalcde'));
    this.fedexEcoDestinationCodeElem = element(by.id('consigneepostalcode'));
    this.fedexEcoCarrierSCACCodeElem = element(by.id('serviceTypeid'));
    this.fedexEcoRateElem = element(by.id('ratebill'));
    this.fedexEcoPrintBolElem = element(by.id('printbol2'));
    this.fedexEcoCreatePickupElem = element(by.id('pickup1'));
    this.fedexEcoFinishPickupLaterElem = element(by.id('finishpickup'));
    this.reddawayOriginZipCodeElem = element(by.id('reddshipperpostalcode'));
    this.reddawayDestinationCodeElem = element(by.id('reddconsigneepostalcode'));
    this.reddawayCarrierSCACCodeElem = element(by.id('reddawayservicetype'));
    this.reddawayRateElem = element(by.id('reddrate'));
    // this.reddawayPrintBolElem = element(by.id('printbol2'));
    // this.reddawayCreatePickupElem = element(by.id('pickup1'));
    // this.reddawayFinishPickupLaterElem = element(by.id('finishpickup'));

    this.getYrcOriginZip = async function () {
        return await this.yrcOriginZipCodeElem.getText().trim();
      };
      this.getYrcDestinationZip = async function () {
        return await this.yrcDestinationCodeElem.getText().trim();
      };

      this.getYrcCarrier = async function () {
        return await this.yrcCarrierSCACCodeElem.getText().trim();
      };
      this.getYrcRate = async function () {
        return await this.yrcRateElem.getText();
      };


      this.getFedexEcoOriginZip = async function () {
        return await this.fedexEcoOriginZipCodeElem.getText().trim();
      };
      this.getFedexEcoDestinationZip = async function () {
        return await this.fedexEcoDestinationCodeElem.getText().trim();
      };

      this.getFedexEcoCarrier = async function () {
        return await this.fedexEcoCarrierSCACCodeElem.getText().trim();
      };
      this.getFedexEcoRate = async function () {
        return await this.fedexEcoRateElem.getText();
      }

      this.getReddawayOriginZip = async function () {
        return await this.reddawayOriginZipCodeElem.getText().trim();
      };
      this.getReddawayDestinationZip = async function () {
        return await this.reddawayDestinationCodeElem.getText().trim();
      };

      this.getReddawayCarrier = async function () {
        return await this.reddawayCarrierSCACCodeElem.getText().trim();
      };
      this.getReddawayRate = async function () {
        return await this.reddawayRateElem.getText();
      }
};

module.exports = CreateBolSummaryForm;