(function (global) {
  var ClockifyClient = (function () {

    function ClockifyClient(apiKey) {
      if (!apiKey) throw new Error('apiKey must be specified');

      this.baseEndpoint_ = 'https://api.clockify.me/api/v1';
      this.headers_ = { 'X-Api-Key': apiKey };
    }

    return ClockifyClient;
  })();

  return global.ClockifyClient = ClockifyClient;
})(this);
