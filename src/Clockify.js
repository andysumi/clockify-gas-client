class Clockify {  // eslint-disable-line
  constructor(apiKey) {
    this.client_ = new Client(apiKey);
  }

  /**
   * 全てのWorkspaceを取得する
   * @return {Array<Object>} 処理結果
   */
  getAllWorkspaces() {
    return this.client_.fetchGet('/workspaces');
  }

  /**
   * Workspace内のClientを取得する
   * @param {string} workspaceId 【必須】Workspaceを識別するID
   * @param {Object} params
   * @param {number} [page=1]
   * @param {number} [pageSize=50]
   * @param {string} sortColumn "NAME"
   * @param {string} sortOrder "ASCENDING" or "DESCENDING"
   * @return {Array<Object>} 処理結果
   */
  getAllClients(workspaceId, params, page, pageSize, sortColumn, sortOrder) {
    if (!workspaceId) throw new Error('"workspaceId" must be specified');

    params = params ? params : {};
    if (page) params['page'] = page;
    if (pageSize) params['page-size'] = pageSize;
    if (sortColumn) params['sort-column'] = sortColumn;
    if (sortOrder) params['sort-order'] = sortOrder;
    return this.client_.fetchGet(`/workspaces/${workspaceId}/clients`, params);
  }

  /**
   * Clientを作成する
   * @param {string} workspaceId 【必須】Workspaceを識別するID
   * @param {string} name 【必須】
   * @return {Object} 処理結果
   */
  createClient(workspaceId, name) {
    if (!workspaceId) throw new Error('"workspaceId" must be specified');
    if (!name) throw new Error('"name" must be specified');

    return this.client_.fetchPost(`/workspaces/${workspaceId}/clients`, { name: name });
  }

  /**
   * Clientを更新する
   * @param {string} workspaceId 【必須】Workspaceを識別するID
   * @param {string} clientId 【必須】Clientを識別するID
   * @param {Object} params
   * @return {Object} 処理結果
   */
  updateClient(workspaceId, clientId, params) {
    if (!workspaceId) throw new Error('"workspaceId" must be specified');
    if (!clientId) throw new Error('"clientId" must be specified');
    if (!params) throw new Error('"params" must be specified');

    return this.client_.fetchPut(`/workspaces/${workspaceId}/clients/${clientId}`, params);
  }
}
