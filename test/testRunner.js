function testRunner() { // eslint-disable-line no-unused-vars
  if ((typeof GasTap) === 'undefined') { // GasT Initialization. (only if not initialized yet.)
    eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gast/master/src/gas-tap-lib.js').getContentText());
  } // Class GasTap is ready for use now!

  var test = new GasTap();
  var common = new TestCommon();

  try {
    /***** Test cases ******************************/
    // Workspace
    testGetAllWorkspaces_(test, common);
    // Client
    testGetAllClients_(test, common);
    testCreateClient_(test, common);
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
  var client = common.getClient();

  test('getAllWorkspaces() - 正常系', function (t) {
    var result = client.getAllWorkspaces();
    t.ok(result.length > 0, 'データが取得できること');
    t.ok(result[0] instanceof Object, 'Objectで取得できること');
  });
}

function testGetAllClients_(test, common) {
  var client = common.getClient();

  test('getAllClients() - 異常系', function (t) {
    t.throws(function () {
      return client.getAllClients();
    },
    '"workspaceId"を指定していない場合はエラー');
  });

  test('getAllClients() - 正常系(paramsなし)', function (t) {
    var result = client.getAllClients(common.workspaceId);
    t.ok(result.length > 0, 'データが取得できること');
    t.ok(result[0] instanceof Object, 'Objectで取得できること');
  });

  test('getAllClients() - 正常系(paramsあり)', function (t) {
    var result = client.getAllClients(common.workspaceId, {
      archived: false,
      name: '株式会社ぴよ',
    });
    t.deepEqual(
      result[0],
      {
        id: '608c04dcfa42981cadb8bbce',
        name: '株式会社ぴよ',
        workspaceId: common.workspaceId,
        archived: false,
        address: null
      },
      'データが正しいこと');
  });
}
function testCreateClient_(test, common) {
  var client = common.getClient();

  test('createClient() - 異常系', function (t) {
    t.throws(function () {
      return client.createClient();
    },
    '"workspaceId"を指定していない場合はエラー');
  });

  test('createClient() - 正常系', function (t) {
    var clientName = '有限会社そいや';
    var result = client.createClient(common.workspaceId, clientName);
    t.equal(result.workspaceId, common.workspaceId,  '"workspaceId"が正しいこと');
    t.equal(result.name, clientName, '"name"が正しいこと');
    t.equal(result.archived, false, '"archived"が正しいこと');
  });
}
