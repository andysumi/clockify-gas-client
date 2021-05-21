function testRunner() { // eslint-disable-line no-unused-vars
  if ((typeof GasTap) === 'undefined') { // GasT Initialization. (only if not initialized yet.)
    eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gast/master/src/gas-tap-lib.js').getContentText());
  } // Class GasTap is ready for use now!

  const test = new GasTap();
  const common = new TestCommon();

  try {
    /***** Test cases ******************************/
    testWorkspaceMethods_(test, common);
    testClientMethods_(test, common);
    /***********************************************/
  } catch (error) {
    test('Exception occurred', function f(assert) {
      Logger.log(error);
      assert.fail(error);
    });
  }

  test.finish();
}

function testWorkspaceMethods_(test, common) {
  test('getAllWorkspaces() - 正常系', function (t) {
    const result = common.clockify.getAllWorkspaces();
    t.ok(result.length > 0, 'データが取得できること');
    t.ok(result[0] instanceof Object, 'Objectで取得できること');
  });
}

function testClientMethods_(test, common) {
  test('getAllClients()', function (t) {
    // params指定なし
    const clients = common.clockify.getAllClients(common.workspaceId);
    t.ok(clients.length > 0, 'データが取得できること');
    t.ok(clients[0] instanceof Object, 'Objectで取得できること');

    // params指定あり
    const clientName = '株式会社ぴよ';
    const client = common.clockify.getAllClients(common.workspaceId, {
      archived: false,
      name: clientName,
    });
    t.equal(client[0].workspaceId, common.workspaceId, '"workspaceId"が正しいこと');
    t.equal(client[0].name, clientName, '"name"が正しいこと');
    t.equal(client[0].archived, false, '"archived"が正しいこと');
  });

  test('Client CRUD', function (t) {
    //Create
    let clientName = 'Sandbox' + Utilities.formatDate(new Date(), 'JST', 'yyyyMMddHHmmss');
    const createdClient = common.clockify.createClient(common.workspaceId, clientName);
    t.equal(createdClient.workspaceId, common.workspaceId,  '"workspaceId"が正しいこと');
    t.equal(createdClient.name, clientName, '"name"が正しいこと');
    t.equal(createdClient.archived, false, '"archived"が正しいこと');

    // Update
    clientName = `Updated ${clientName}`;
    const updatedClient = common.clockify.updateClient(common.workspaceId, createdClient.id, { name: clientName, archived: true });
    t.ok(updatedClient instanceof Object, 'Objectで取得できること');
    t.equal(updatedClient.workspaceId, common.workspaceId, '"workspaceId"が正しいこと');
    t.equal(updatedClient.id, createdClient.id, '"clientId"が正しいこと');
    t.equal(updatedClient.name, clientName, '"name"が正しいこと');
    t.equal(updatedClient.archived, true, '"archived"が正しいこと');

    // Delete
    const deletedClient = common.clockify.deleteClient(common.workspaceId, updatedClient.id);
    t.ok(deletedClient instanceof Object, 'Objectで取得できること');
    t.equal(deletedClient.workspaceId, common.workspaceId, '"workspaceId"が正しいこと');
    t.equal(deletedClient.id, updatedClient.id, '"clientId"が正しいこと');
    t.equal(deletedClient.name, clientName, '"name"が正しいこと');
    t.equal(deletedClient.archived, true, '"archived"が正しいこと');
  });
}
