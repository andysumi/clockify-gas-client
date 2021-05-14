(function (global) {
  var ClockifyClient = (function () {

    function ClockifyClient(apiKey) {
      if (!apiKey) throw new Error('"apiKey" must be specified');

      this.baseEndpoint_ = 'https://api.clockify.me/api/v1';
      this.headers_ = { 'X-Api-Key': apiKey };
    }

    ClockifyClient.prototype.getAllWorkspaces = function () {
      return this.fetchGet_('/workspaces');
    };

    ClockifyClient.prototype.getAllClients = function (workspaceId, params, page, pageSize, sortColumn, sortOrder) {
      if (!workspaceId) throw new Error('"workspaceId" must be specified');

      params = params ? params : {};
      if (page) params['page'] = page;
      if (pageSize) params['page-size'] = pageSize;
      if (sortColumn) params['sort-column'] = sortColumn;
      if (sortOrder) params['sort-order'] = sortOrder;
      return this.fetchGet_('/workspaces/' + workspaceId + '/clients', params);
    };

    ClockifyClient.prototype.createClient = function (workspaceId, name) {
      if (!workspaceId) throw new Error('"workspaceId" must be specified');
      if (!name) throw new Error('"name" must be specified');

      return this.fetchPost_('/workspaces/' + workspaceId + '/clients', {name: name});
    };

    ClockifyClient.prototype.fetchGet_ = function (path, params) {
      params = params ? params : {};
      return this.fetch_('get', path, params);
    };

    ClockifyClient.prototype.fetchPost_ = function (path, payload) {
      payload = payload ? payload : {};
      return this.fetch_('post', path, null, payload);
    };

    ClockifyClient.prototype.fetch_ = function (method, path, params, payload) {
      var url = this.getApiUrl_(path, params);
      var option = {
        method: method,
        contentType: 'application/json',
        headers: this.headers_,
        muteHttpExceptions: true
      };
      if (payload) option.payload = JSON.stringify(payload);
      var response = UrlFetchApp.fetch(url, option);
      var statusCode = response.getResponseCode();
      var content = response.getContentText('utf-8');

      if (statusCode !== 200 || statusCode !== 201) {
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
