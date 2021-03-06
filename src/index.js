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

/**
 * Clientを削除する
 * @param {string} workspaceId 【必須】Workspaceを識別するID
 * @param {string} clientId 【必須】Clientを識別するID
 * @return {Object} 処理結果
 */
function deleteClient(workspaceId, clientId) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
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
function getAllProjects(workspaceId, params, page, pageSize, sortColumn, sortOrder) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したProjectを取得する
 * @param {string} workspaceId 【必須】Workspaceを識別するID
 * @param {string} projectId 【必須】Projectを識別するID
 * @return {Object} 処理結果
 */
function getSpecificProject(workspaceId, projectId) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * Projectを作成する
 * @param {string} workspaceId 【必須】Workspaceを識別するID
 * @param {string} name 【必須】
 * @param {Object} option
 * @return {Object} 処理結果
 */
function createProject(workspaceId, name, option) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * Projectを更新する
 * @param {string} workspaceId 【必須】Workspaceを識別するID
 * @param {string} projectId 【必須】Projectを識別するID
 * @param {Object} params
 * @return {Object} 処理結果
 */
function updateProject(workspaceId, projectId, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * Projectの見積もりを更新する
 * @param {string} workspaceId 【必須】Workspaceを識別するID
 * @param {string} projectId 【必須】Projectを識別するID
 * @param {{active: boolean, type: string, estimate: sting, reset: string|null}} timeEstimate
 * @param {{active: boolean, type: string, estimate: number, reset: string|null}} budgetEstimate
 * @return {Object} 処理結果
 */
function updateProjectEstimate(workspaceId, projectId, timeEstimate, budgetEstimate) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * Projectを削除する
 * @param {string} workspaceId 【必須】Workspaceを識別するID
 * @param {string} projectId 【必須】Projectを識別するID
 * @return {Object} 処理結果
 */
function deleteProject(workspaceId, projectId) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * Project内のTaskを取得する
 * @param {string} workspaceId 【必須】Workspaceを識別するID
 * @param {string} projectId 【必須】Projectを識別するID
 * @param {Object} params
 * @param {number} [page=1]
 * @param {number} [pageSize=50]
 * @return {Array<Object>} 処理結果
 */
function getAllTasks(workspaceId, projectId, params, page, pageSize) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したTaskを取得する
 * @param {string} workspaceId 【必須】Workspaceを識別するID
 * @param {string} projectId 【必須】Projectを識別するID
 * @param {string} taskId 【必須】Taskを識別するID
 * @return {Object} 処理結果
 */
function getSpecificTask(workspaceId, projectId, taskId) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * Taskを作成する
 * @param {string} workspaceId 【必須】Workspaceを識別するID
 * @param {string} projectId 【必須】Workspaceを識別するID
 * @param {string} name 【必須】
 * @param {Object} option
 * @return {Object} 処理結果
 */
function createTask(workspaceId, projectId, name, option) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * Taskを更新する
 * @param {string} workspaceId 【必須】Workspaceを識別するID
 * @param {string} projectId 【必須】Projectを識別するID
 * @param {string} taskId 【必須】Taskを識別するID
 * @param {Object} params
 * @return {Object} 処理結果
 */
function updateTask(workspaceId, projectId, taskId, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * Taskを削除する
 * @param {string} workspaceId 【必須】Workspaceを識別するID
 * @param {string} projectId 【必須】Projectを識別するID
 * @param {string} taskId 【必須】Taskを識別するID
 * @return {Object} 処理結果
 */
function deleteTask(workspaceId, projectId, taskId) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したユーザーのTime entryを取得する
 * @param {string} workspaceId 【必須】Workspaceを識別するID
 * @param {string} userId 【必須】Userを識別するID
 * @param {Object} params
 * @param {number} [page=1]
 * @param {number} [pageSize=50]
 * @return {Array<Object>} 処理結果
 */
function getUserTimeEntries(workspaceId, userId, params, page, pageSize) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したTime entryを取得する
 * @param {string} workspaceId 【必須】Workspaceを識別するID
 * @param {string} timeEntryId 【必須】Time entryを識別するID
 * @return {Object} 処理結果
 */
function getSpecificTimeEntry(workspaceId, timeEntryId) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}
