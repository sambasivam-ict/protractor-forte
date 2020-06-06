var ExternalDashboardForm = function () {
    this.rateQuoteElem = element(by.id("rateQuoteRequestTitle"));



    this.clickOnExternalDashboard = function () {
        this.rateQuoteElem.click();
      };
}
module.exports = ExternalDashboardForm;  