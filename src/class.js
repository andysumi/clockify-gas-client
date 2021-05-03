(function (global) {
  var ClockifyClient = (function () {

    function ClockifyClient(apiKey) {
      if (!apiKey) throw new Error('apiKey must be specified');

      this.baseEndpoint_ = 'https://api.clockify.me/api/v1';
      this.headers_ = { 'X-Api-Key': apiKey };
    }

    ClockifyClient.prototype.getAllWorkspaces = function () {
      return this.fetchGet_('/workspaces');
    };

    ClockifyClient.prototype.fetchGet_ = function (path, params) {
      params = params ? params : {};
      return this.fetch_('get', path, params);
    };

    ClockifyClient.prototype.fetch_ = function (method, path, params) {
      var url = this.getApiUrl_(path, params);
      var option = {
        method: method,
        contentType: 'application/json',
        headers: this.headers_,
        muteHttpExceptions: true
      };
      var response = UrlFetchApp.fetch(url, option);
      var statusCode = response.getResponseCode();
      var content = response.getContentText('utf-8');

      if (statusCode !== 200) {
        console.log(Utilities.formatString('%s: %s',statusCode, content));
        return false;
      }

      return JSON.parse(response.getContentText('utf-8'));
    };

    ClockifyClient.prototype.getApiUrl_ = function (path, params) {
      var url = this.baseEndpoint_ + path;

      if (params) {
        var temp = [];
        for (var key in params) {
          temp.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
        }
        url += '?' + temp.join('&');
      }
      return url;
    };

    return ClockifyClient;
  })();

  return global.ClockifyClient = ClockifyClient;
})(this);
