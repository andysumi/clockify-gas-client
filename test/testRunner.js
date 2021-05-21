function testRunner() { // eslint-disable-line no-unused-vars
  if ((typeof GasTap) === 'undefined') { // GasT Initialization. (only if not initialized yet.)
    eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gast/master/src/gas-tap-lib.js').getContentText());
  } // Class GasTap is ready for use now!

  const test = new GasTap();
  const common = new TestCommon();

  try {
    /***** Test cases ******************************/
    // Workspace
    testGetAllWorkspaces_(test, common);
    // Client
    testGetAllClients_(test, common);
    testCreateClient_(test, common);
    testUpdateClient_(test, common);
    /***********************************************/
  } catch (error) {
    test('Exception occurred', function f(assert) {
      Logger.log(error);
      assert.fail(error);
    });
  }

  test.finish();
}

function testGetAllWorkspaces_(test, common) {
  test('getAllWorkspaces() - 正常系', function (t) {
    const result = common.clockify.getAllWorkspaces();
    t.ok(result.length > 0, 'データが取得できること');
    t.ok(result[0] instanceof Object, 'Objectで取得できること');
  });
}

function testGetAllClients_(test, common) {
  test('getAllClients() - 異常系', function (t) {
    t.throws(function () {
      return common.clockify.getAllClients();
    },
    '"workspaceId"を指定していない場合はエラー');
  });

  test('getAllClients() - 正常系(paramsなし)', function (t) {
    const result = common.clockify.getAllClients(common.workspaceId);
    t.ok(result.length > 0, 'データが取得できること');
    t.ok(result[0] instanceof Object, 'Objectで取得できること');
  });

  test('getAllClients() - 正常系(paramsあり)', function (t) {
    const clientName = '株式会社ぴよ';
    const result = common.clockify.getAllClients(common.workspaceId, {
      archived: false,
      name: clientName,
    });
    t.equal(result[0].workspaceId, common.workspaceId, '"workspaceId"が正しいこと');
    t.equal(result[0].name, clientName, '"name"が正しいこと');
    t.equal(result[0].archived, false, '"archived"が正しいこと');
  });
}

function testCreateClient_(test, common) {
  test('createClient() - 異常系', function (t) {
    t.throws(function () {
      return common.clockify.createClient();
    },
    '"workspaceId"を指定していない場合はエラー');
  });

  test('createClient() - 正常系', function (t) {
    const clientName = 'Sandbox' + Utilities.formatDate(new Date(), 'JST', 'yyyyMMddHHmmss');
    const result = common.clockify.createClient(common.workspaceId, clientName);
    t.equal(result.workspaceId, common.workspaceId,  '"workspaceId"が正しいこと');
    t.equal(result.name, clientName, '"name"が正しいこと');
    t.equal(result.archived, false, '"archived"が正しいこと');
  });
}

function testUpdateClient_(test, common) {
  test('updateClient() - 異常系', function (t) {
    t.throws(function () {
      return common.clockify.updateClient();
    },
    '引数を指定していない場合はエラー');
  });

  test('updateClient() - 正常系', function (t) {
    const clientName = 'Sandbox' + Utilities.formatDate(new Date(), 'JST', 'yyyyMMddHHmmss');
    const result = common.clockify.updateClient(common.workspaceId, common.clientId, { name: clientName, archived: false });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.workspaceId, common.workspaceId, '"workspaceId"が正しいこと');
    t.equal(result.id, common.clientId, '"clientId"が正しいこと');
    t.equal(result.name, clientName, '"name"が正しいこと');
    t.equal(result.archived, false, '"archived"が正しいこと');
  });
}
