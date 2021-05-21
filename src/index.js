/**
 * Clockify Clientのインスタンスを作成する
 * @param {String} apiKey 【必須】APIキー
 * @return {ClockifyClient} Clockify Clientのインスタンス
 */
function create(apiKey) { // eslint-disable-line no-unused-vars
  return new Clockify(apiKey);
}

/**
 * 全てのWorkspaceを取得する
 * @return {Array<Object>} 処理結果
 */
function getAllWorkspaces() { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
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
function getAllClients(workspaceId, params, page, pageSize, sortColumn, sortOrder) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * Clientを作成する
 * @param {string} workspaceId 【必須】Workspaceを識別するID
 * @param {string} name 【必須】
 * @return {Object} 処理結果
 */
function createClient(workspaceId, name) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * Clientを更新する
 * @param {string} workspaceId 【必須】Workspaceを識別するID
 * @param {string} clientId 【必須】Clientを識別するID
 * @param {Object} params
 * @return {Object} 処理結果
 */
function updateClient(workspaceId, clientId, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}
