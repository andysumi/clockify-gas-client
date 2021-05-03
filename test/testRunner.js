function testRunner() { // eslint-disable-line no-unused-vars
  if ((typeof GasTap) === 'undefined') { // GasT Initialization. (only if not initialized yet.)
    eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gast/master/src/gas-tap-lib.js').getContentText());
  } // Class GasTap is ready for use now!

  var test = new GasTap();
  var common = new TestCommon();

  try {
    /***** Test cases ******************************/
    testGetAllWorkspaces_(test, common);
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
