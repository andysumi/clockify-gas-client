class Client {  // eslint-disable-line
  constructor(apiKey) {
    if (!apiKey) throw new Error('"apiKey" must be specified');

    this.baseUrl_ = 'https://api.clockify.me/api/v1';
    this.headers_ = { 'X-Api-Key': apiKey };
  }

  /**
   * Getリクエストを送信する
   * @param {string} path
   * @param {Object} params
   * @returns {Object} リクエスト結果
   */
  fetchGet(path, params) {
    params = params ? params : {};
    return this.fetch_('get', path, params);
  }

  /**
   * Postリクエストを送信する
   * @param {string} path
   * @param {Object} payload
   * @returns {Object} リクエスト結果
   */
  fetchPost(path, payload) {
    payload = payload ? payload : {};
    return this.fetch_('post', path, null, payload);
  }

  fetch_(method, path, params, payload) {
    const url = this.getApiUrl_(path, params);
    var option = {
      method: method,
      contentType: 'application/json',
      headers: this.headers_,
      muteHttpExceptions: true
    };
    if (payload) option.payload = JSON.stringify(payload);
    const response = UrlFetchApp.fetch(url, option);

    if (!/200|201/.test(response.getResponseCode())) {
      console.error(response.getContentText('utf-8'));
      return false;
    }

    return JSON.parse(response.getContentText('utf-8'));
  }

  getApiUrl_(path, params) {
    let url = this.baseUrl_ + path;

    if (params) {
      const temp = [];
      for (var key in params) {
        temp.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
      }
      url += '?' + temp.join('&');
    }
    return url;
  }
}
