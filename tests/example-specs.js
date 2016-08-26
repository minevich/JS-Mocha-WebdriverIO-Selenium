require('colors');
var sauceSeleniumHost;
var sauceSeleniumPort = process.env.SELENIUM_PORT;
var tunnelId = process.env.TUNNEL_IDENTIFIER;
if (sauceSeleniumPort != undefined && tunnelId != undefined){
  sauceSeleniumHost = "localhost";
  sauceSeleniumPort = Number(sauceSeleniumPort);
} else {
  sauceSeleniumHost = "ondemand.saucelabs.com";
  sauceSeleniumPort = 80;
}
function setCICaps(caps){
  var extend = require('extend');
  var buildTag = process.env.BUILD_TAG;
  if (buildTag != undefined){
    caps = extend(true, caps, {"build": buildTag});
  }
  if (tunnelId != undefined){
    caps = extend(true, caps, {"tunnel-identifier": tunnelId});
  }
  return caps;
}
var webdriverio = require('webdriverio'),
    _ = require("lodash"),
    chai = require("chai"),
    assert = chai.assert,
    chaiAsPromised = require("chai-as-promised"),
    user = process.env.SAUCE_USERNAME,
    accessKey = process.env.SAUCE_ACCESS_KEY,
    SauceLabs = require("saucelabs"),
    saucelabs = new SauceLabs({
      username: user,
      password: accessKey
    }),
    DESIREDS = require('../desireds'),
    browserKey = process.env.BROWSER || 'chrome',
    desired = setCICaps(DESIREDS[browserKey]),
    sauceConfig = {
        desiredCapabilities: desired,
        host: sauceSeleniumHost,
        port: sauceSeleniumPort,
        user: user,
        key: accessKey,
        logLevel: "silent"
    };

chai.should();
chai.use(chaiAsPromised);

// building desired capability
desired.name = 'example with ' + browserKey;
desired.tags = ['tutorial'];

describe('mocha spec examples (' + desired.browserName + ')', function() {
    var client = {},
        allPassed = true,
        name = "";

    this.timeout(60000);


    beforeEach(function() {
        client = webdriverio.remote(sauceConfig);
        return client.init();
    });

    afterEach(function() {
        allPassed = allPassed && (this.currentTest.state === 'passed')

        // update sauce labs job
        saucelabs.updateJob(client.requestHandler.sessionID, { name: name, passed: allPassed }, function() {});

        console.log("SauceOnDemandSessionID=" + client.requestHandler.sessionID +" job-name=" + name);

        return client.end();
    });

  it("should get guinea pig page 1", function() {
    name = this.test.fullTitle();

    return client
      .url("https://saucelabs.com/test/guinea-pig")
      .getTitle()
      .should
      .eventually
      .be
      .equal("I am a page title - Sauce Labs");
  });

  it("should get guinea pig page 1", function() {
    name = this.test.fullTitle();

    return client
      .url("https://saucelabs.com/test/guinea-pig")
      .getTitle()
      .should
      .eventually
      .be
      .equal("I am a page title - Sauce Labs");
  });

  it("should get guinea pig page 2", function() {
    name = this.test.fullTitle();

    return client
      .url("https://saucelabs.com/test/guinea-pig")
      .getTitle()
      .should
      .eventually
      .be
      .equal("I am a page title - Sauce Labs");
  });

  it("should get guinea pig page 3", function() {
    name = this.test.fullTitle();

    return client
      .url("https://saucelabs.com/test/guinea-pig")
      .getTitle()
      .should
      .eventually
      .be
      .equal("I am a page title - Sauce Labs");
  });

});