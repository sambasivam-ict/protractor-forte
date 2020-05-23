var LocalStorageValues = function () {
  var masterDataAP;

  var masterDataAR;

  this.getApMasterDataLocalStorage = async function () {
    var valuesList = await browser.executeScript(
      "return window.localStorage.getItem('aptableData');"
    );

    this.setMasterDataAP(valuesList);

    return JSON.parse(valuesList);
  };

  this.getArMasterDataLocalStorage = async function () {
    var valuesList = await browser.executeScript(
      "return window.localStorage.getItem('artableData');"
    );
    this.setMasterDataAR = valuesList;
    return JSON.parse(valuesList);
  };

  this.setMasterDataAP = function (masterDataAP) {
    this.masterDataAP = masterDataAP;
  };

  this.setMasterDataAR = function (masterDataAR) {
    this.masterDataAR = masterDataAR;
  };
};

module.exports = LocalStorageValues;
