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

  /**
   * Clientを削除する
   * @param {string} workspaceId 【必須】Workspaceを識別するID
   * @param {string} clientId 【必須】Clientを識別するID
   * @return {Object} 処理結果
   */
  deleteClient(workspaceId, clientId) {
    if (!workspaceId) throw new Error('"workspaceId" must be specified');
    if (!clientId) throw new Error('"clientId" must be specified');

    return this.client_.fetchDelete(`/workspaces/${workspaceId}/clients/${clientId}`);
  }

  /**
   * Workspace内のProjectを取得する
   * @param {string} workspaceId 【必須】Workspaceを識別するID
   * @param {Object} params
   * @param {number} [page=1]
   * @param {number} [pageSize=50]
   * @param {string} sortColumn "NAME", "CLIENT_NAME", "DURATION"
   * @param {string} sortOrder "ASCENDING" or "DESCENDING"
   * @return {Array<Object>} 処理結果
   */
  getAllProjects(workspaceId, params, page, pageSize, sortColumn, sortOrder) {
    if (!workspaceId) throw new Error('"workspaceId" must be specified');

    params = params ? params : {};
    if (page) params['page'] = page;
    if (pageSize) params['page-size'] = pageSize;
    if (sortColumn) params['sort-column'] = sortColumn;
    if (sortOrder) params['sort-order'] = sortOrder;
    return this.client_.fetchGet(`/workspaces/${workspaceId}/projects`, params);
  }

  /**
   * 指定したProjectを取得する
   * @param {string} workspaceId 【必須】Workspaceを識別するID
   * @param {string} projectId 【必須】Projectを識別するID
   * @return {Object} 処理結果
   */
  getSpecificProject(workspaceId, projectId) {
    if (!workspaceId) throw new Error('"workspaceId" must be specified');
    if (!projectId) throw new Error('"projectId" must be specified');

    return this.client_.fetchGet(`/workspaces/${workspaceId}/projects/${projectId}`);
  }

  /**
   * Projectを作成する
   * @param {string} workspaceId 【必須】Workspaceを識別するID
   * @param {string} name 【必須】
   * @param {Object} option
   * @return {Object} 処理結果
   */
  createProject(workspaceId, name, option) {
    if (!workspaceId) throw new Error('"workspaceId" must be specified');

    let params = { name: name };
    if (option) {
      for (const key in option) {
        params[key] = option[key];
      }
    }
    return this.client_.fetchPost(`/workspaces/${workspaceId}/projects`, params);
  }

  /**
   * Projectを更新する
   * @param {string} workspaceId 【必須】Workspaceを識別するID
   * @param {string} projectId 【必須】Projectを識別するID
   * @param {Object} params
   * @return {Object} 処理結果
   */
  updateProject(workspaceId, projectId, params) {
    if (!workspaceId) throw new Error('"workspaceId" must be specified');
    if (!projectId) throw new Error('"workspaceId" must be specified');

    return this.client_.fetchPut(`/workspaces/${workspaceId}/projects/${projectId}`, params);
  }

  /**
 * Projectの見積もりを更新する
 * @param {string} workspaceId 【必須】Workspaceを識別するID
 * @param {string} projectId 【必須】Projectを識別するID
 * @param {{active: boolean, type: string, estimate: string, reset: string|null}} timeEstimate
 * @param {{active: boolean, type: string, estimate: number, reset: string|null}} budgetEstimate
 * @return {Object} 処理結果
 */
  updateProjectEstimate(workspaceId, projectId, timeEstimate, budgetEstimate) {
    if (!workspaceId) throw new Error('"workspaceId" must be specified');
    if (!projectId) throw new Error('"workspaceId" must be specified');

    let params = {};
    if (timeEstimate) {
      params['timeEstimate'] = timeEstimate;
    }
    if (budgetEstimate) {
      params['budgetEstimate'] = budgetEstimate;
    }
    return this.client_.fetchPatch(`/workspaces/${workspaceId}/projects/${projectId}/estimate`, params);
  }
}
