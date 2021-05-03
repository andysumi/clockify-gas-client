/**
 * Clockify Clientのインスタンスを作成する
 * @param {String} apiKey 【必須】APIキー
 * @return {ClockifyClient} Clockify Clientのインスタンス
 */
function create(apiKey) { // eslint-disable-line no-unused-vars
  return new ClockifyClient(apiKey);
}

/**
 * 全てののWorkspaceを取得する
 * @return {Array<Object>} 処理結果
 */
function getAllWorkspaces() { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}
