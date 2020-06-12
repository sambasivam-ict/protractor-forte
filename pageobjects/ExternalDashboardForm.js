var ExternalDashboardForm = function () {
    this.rateQuoteElem = element(by.id("rateQuoteRequestTitle"));
    this.createBolElem = element(by.id("bolTitle"));
    this.goToDashboardElem = element(by.id('dashboard'));

    this.clickOnExternalDashboard = function () {
        this.rateQuoteElem.click();
      };

      this.clickOnCreateBol = function () {
        this.createBolElem.click();
      };

      this.clickOnGoToDashboard = function () {
        this.goToDashboardElem.click();
      };
}
module.exports = ExternalDashboardForm;  