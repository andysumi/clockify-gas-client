var TestCommon = function () { // eslint-disable-line no-redeclare
  var properties = PropertiesService.getScriptProperties();
  this.apiKey = properties.getProperty('API_KEY');
};

TestCommon.prototype.getClient = function () {
  this.client = new ClockifyClient(this.apiKey);
  return this.client;
};
