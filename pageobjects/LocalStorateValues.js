var LocalStorageValues = function () {
  this.getYRCApDiscount = function () {
    var valuesList = browser.executeScript(
      "return window.localStorage.getItem('aptableData');"
    );

    if (valuesList.length > 0) {
      return valuesList[2].discount;
    } else return null;
  };
};

module.exports = LocalStorageValues;
