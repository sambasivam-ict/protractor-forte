var RateQuoteSelectForm = function () {
    this.ltlQuoteElem = element(by.id("rateQuoteTitle"));
    this.ltlQuoteLinesElem = element(by.id('ratequoteselectID'));

    this.clickOnLtlQuote = function () {
        this.ltlQuoteElem.click();
      };

      this.getLtlQuoteLines = function () {
       this.ltlQuoteLinesElem.getText();
      }
}
module.exports = RateQuoteSelectForm;  