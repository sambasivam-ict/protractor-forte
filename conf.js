var HtmlScreenshotReporter = require("protractor-jasmine2-screenshot-reporter");
var jasmineReporters = require("jasmine-reporters");

var reportsDirectory = "./reports";
var dashboardReportDirectory = reportsDirectory + "/dashboardReport";

//var HtmlScreenshotReporter = require("protractor-jasmine2-screenshot-reporter");
/*
var ScreenshotAndStackReporter = new HtmlScreenshotReporter({
  dest: detailsReportDirectory,
  filename: "E2ETestingReport.html",
  reportTitle: "E2E Testing Report",
  showSummary: true,
  reportOnlyFailedSpecs: false,
  captureOnlyFailedSpecs: true,
});
*/

exports.config = {
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    browserName: "chrome",
    //'platformName': 'Android',
    //'deviceName':'emulator-5554'
  },

  jasmineNodeOpts: {
    defaultTimeoutInterval: 2500000,
  },

  framework: "jasmine",
  seleniumAddress: "http://localhost:4444/wd/hub",
   specs: ["yrcquoteinternal_view.js", "fedexquoteInternal_view.js",  "reddawayquoteInternal_view.js", "yrcquote_with_companyrules.js", "fedexquote_with_companyrules.js", "reddawayquote_with_companyrules.js", "externalQuote_creation.js", "create_bol.js"],
//specs: ["work_book.js"],


  /*
  beforeLaunch: function () {
    return new Promise(function (resolve) {
      ScreenshotAndStackReporter.beforeLaunch(resolve);
    });
  },
*/
  onPrepare: function () {
    // xml report generated for dashboard
    jasmine.getEnv().addReporter(
      new jasmineReporters.JUnitXmlReporter({
        consolidateAll: true,
        savePath: reportsDirectory + "/xml",
        filePrefix: "xmlOutput",
      })
    );

    var fs = require("fs-extra");
    if (!fs.existsSync(dashboardReportDirectory)) {
      fs.mkdirSync(dashboardReportDirectory);
    }

    jasmine.getEnv().addReporter({
      specDone: function (result) {
        if (result.status == "failed") {
          browser.getCapabilities().then(function (caps) {
            var browserName = caps.get("browserName");

            browser.takeScreenshot().then(function (png) {
              var stream = fs.createWriteStream(
                dashboardReportDirectory +
                  "/" +
                  browserName +
                  "-" +
                  result.fullName +
                  ".png"
              );
              stream.write(new Buffer(png, "base64"));
              stream.end();
            });
          });
        }
      },
    });
  },

  onComplete: function () {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
      browserName = caps.get("browserName");
      browserVersion = caps.get("version");
      platform = caps.get("platform");

      var HTMLReport = require("protractor-html-reporter-2");
      testConfig = {
        reportTitle: "Protractor Test Execution Report",
        outputPath: dashboardReportDirectory,
        outputFilename: "index",
        screenshotPath: "./",
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true,
        testPlatform: platform,
      };
      new HTMLReport().from(
        reportsDirectory + "/xml/xmlOutput.xml",
        testConfig
      );
    });
  },
};
