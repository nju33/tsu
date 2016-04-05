module.exports = {
  'Demo test Google' : function (browser) {
    browser
      .url('http://www.google.com')
      .pause(3000)
      .end();
  }
};
