var ExternalDashboardForm = function () {
    this.rateQuoteElem = element(by.id("rateQuoteRequestTitle"));
    this.rateQuoteLinesElem = element(by.id('rateQuoteRequestPara'));
    this.createBolElem = element(by.id("bolTitle"));
    this.goToDashboardElem = element(by.id('dashboard'));
    this.welcomeUserElem = element(by.id('navbarDropdownMenuLink1'));
    this.welcomeMenuElem = element(by.id('wlcm-menu1'));
    this.logoutElem = element(by.id('wlcm-item1'));

    this.clickOnExternalDashboard = function () {
        this.rateQuoteElem.click();
      };

      this.getRateQuoteLines = function () {
        this.rateQuoteLinesElem.getText();
      }

      this.clickOnCreateBol = function () {
        this.createBolElem.click();
      };

      this.clickOnGoToDashboard = function () {
        this.goToDashboardElem.click();
      };

      this.clickOnWelcomeUser = function () {
        this.welcomeUserElem.click();
      };

      this.clickOnWelcomeMenu = function () {
        this.welcomeMenuElem.click();
      };

      this.clickOnLogoutUser = function () {
        this.logoutElem.click();
      };
}
module.exports = ExternalDashboardForm;  