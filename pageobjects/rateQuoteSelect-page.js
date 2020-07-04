var RateQuoteSelectForm = function () {
    this.ltlQuoteElem = element(by.id("rateQuoteTitle"));



    this.clickOnLtlQuote = function () {
        this.ltlQuoteElem.click();
      };
}
module.exports = RateQuoteSelectForm;  