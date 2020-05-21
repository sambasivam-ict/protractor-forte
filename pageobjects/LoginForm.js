/**
 * Created by Rozario on 29/04/2020.
 */

var LogisticsLoginPage = function () {
  this.userNameElem = $("input[formControlName=email]");
  this.passwordElem = $("input[formControlName=password]");

  this.submitButton = element(by.id("validate"));

  var userName;
  var password;

  this.setUserName = function (userName) {
    this.userName = userName;
  };

  this.setPassWord = function (password) {
    this.password = password;
  };

  this.enterUserName = function () {
    this.userNameElem.clear();
    this.userNameElem.sendKeys(this.userName);
  };

  this.enterPassword = function () {
    this.passwordElem.clear();
    this.passwordElem.sendKeys(this.password);
  };

  this.clickSubmitButton = function () {
    this.submitButton.click();
  };
};

module.exports = LogisticsLoginPage;
//export default LogisticsLoginPage;
