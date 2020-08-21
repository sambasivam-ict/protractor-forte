var HeaderForm = function () {
    this.salesElem = element(by.id('sales'));
    this.workbookElem = element(by.id('workbook'));
    this.welcomeUserElem = element(by.id('navbarDropdownMenuLink'));
    this.logoutElem = element(by.id('wlcm-item'));

    this.clickOnSales = function () {
        this.salesElem.click();
    };

    this.clickOnWorkbook = function () {
        this.workbookElem.click();
    };

    this.clickOnWelcomeMenu = function () {
        this.welcomeMenuElem.click();
      };

      this.clickOnLogoutUser = function () {
        this.logoutElem.click();
      };
};
module.exports = HeaderForm;