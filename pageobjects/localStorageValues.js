var localStorageValues = function () {
  var masterDataAP;
  var masterDataAR;

  /*
  the following two variables (apMasterDataByCompany, arMasterDataByCompany) will hold the master data vaulues as keyvalue pairs. 
  you can access with variablename.companyaname. For example, fedexeconmy values for ap can
  be retrieved by apMasterDataByCompany.FEDEXECONOMY, apMasterDataByCompany.REDDAWAY

  */

  var apMasterDataByCompany;
  var arMasterDataByCompany;

  this.getApMasterDataLocalStorage = async function () {
    var valuesList = await browser.executeScript(
      "return window.localStorage.getItem('aptableData');"
    );

    jSonDataValuesList = JSON.parse(valuesList);
    console.log("jSonDataValuesList localstorage:", jSonDataValuesList);

    this.setMasterDataAP(jSonDataValuesList);
    this.apMasterDataByCompany = jSonDataValuesList.reduce(
      reducemasterdataApArToObj,
      {}
    );

    return jSonDataValuesList;
  };

  var reducemasterdataApArToObj = function (acc, item) {
    var compName = item.companyName.split(" ").join("");
    acc[compName] = item;
    return acc;
  };

  this.getArMasterDataLocalStorage = async function () {
    var valuesList = await browser.executeScript(
      "return window.localStorage.getItem('artableData');"
    );

    jSonDataValuesList = JSON.parse(valuesList);
    console.log("jSonDataValuesList AR localstorage:", jSonDataValuesList);

    this.setMasterDataAR(jSonDataValuesList);
    this.arMasterDataByCompany = jSonDataValuesList.reduce(
      reducemasterdataApArToObj,
      {}
    );

    return jSonDataValuesList;
  };

  this.setMasterDataAP = function (masterDataAP) {
    this.masterDataAP = masterDataAP;
  };

  this.setMasterDataAR = function (masterDataAR) {
    this.masterDataAR = masterDataAR;
  };

  this.getApMasterDataByCompany = function () {
    return this.apMasterDataByCompany;
  };

  this.getArMasterDataByCompany = function () {
    return this.arMasterDataByCompany;
  };

  this.getApMasterDataForYRC = function () {
    return this.apMasterDataByCompany.YRC;
  };

  this.getArMasterDataForYRC = function () {
    return this.arMasterDataByCompany.YRC;
  };

  this.getAPMasterDataForFedexEco = function () {
    return this.apMasterDataByCompany.FEDEXECONOMY;
  };
  this.getARMasterDataForFedexEco = function () {
    return this.arMasterDataByCompany.FEDEXECONOMY;
  };

  this.getAPMasterDataForFedexPrio = function () {
    return this.apMasterDataByCompany.FEDEXPRIORITY;
  };
  this.getARMasterDataForFedexPrio = function () {
    return this.arMasterDataByCompany.FEDEXPRIORITY;
  };

  this.getAPMasterDataForReddaway = function () {
    return this.apMasterDataByCompany.REDDAWAY;
  };
  this.getARMasterDataForReddaway = function () {
    return this.arMasterDataByCompany.REDDAWAY;
  };
};

module.exports = localStorageValues;
