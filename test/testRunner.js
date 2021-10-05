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
    testProjectMethods_(test, common);
    testTaskMethods_(test, common);
    testTimeEntryMethods_(test, common);
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
    const client = common.clockify.getAllClients(common.workspaceId, {
      archived: false,
      name: common.client.name,
    });
    t.deepEqual(client[0], common.client, 'Clientのデータが正しいこと');
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
    const updatedClient = common.clockify.updateClient(common.workspaceId, createdClient.id, {
      name:     clientName,
      archived: true
    });
    t.equal(updatedClient.name, clientName, '"name"が正しいこと');
    t.equal(updatedClient.archived, true, '"archived"が正しいこと');

    // Delete
    const deletedClient = common.clockify.deleteClient(common.workspaceId, updatedClient.id);
    t.ok(deletedClient instanceof Object, 'Objectで取得できること');

    t.equal(common.clockify.getAllClients(common.workspaceId, { name: clientName }).length, 0, 'Clientが存在しないこと');
  });
}

function testProjectMethods_(test, common) {
  test('getAllProjects()', function (t) {
    // params指定なし
    const projects = common.clockify.getAllProjects(common.workspaceId);
    t.ok(projects.length > 0, 'データが取得できること');
    t.ok(projects[0] instanceof Object, 'Objectで取得できること');

    // params指定あり
    const project = common.clockify.getAllProjects(common.workspaceId, {
      archived: false,
      name: common.project.name,
    });
    t.deepEqual(project[0], common.project, 'Projectのデータが正しいこと');
  });

  test('getSpecificProject()', function (t) {
    const project = common.clockify.getSpecificProject(common.workspaceId, common.project.id);
    t.deepEqual(project, common.project, 'Projectのデータが正しいこと');
  });

  test('Project CRUD', function (t) {
    //Create
    let projectName = 'Sandbox' + Utilities.formatDate(new Date(), 'JST', 'yyyyMMddHHmmss');
    const option = {
      clientId: common.client.id,
      color: '#f44336',
      note: 'This is project\'s note',
      billable: false,
      isPublic: true
    };
    const createdProject = common.clockify.createProject(common.workspaceId, projectName, option);
    t.equal(createdProject.name, projectName, '"name"が正しいこと');
    t.equal(createdProject.clientId, option.clientId, '"clientId"が正しいこと');
    t.equal(createdProject.color, option.color, '"color"が正しいこと');
    t.equal(createdProject.note, option.note, '"note"が正しいこと');
    t.equal(createdProject.billable, option.billable, '"billable"が正しいこと');
    t.equal(createdProject.public, option.isPublic, '"public"が正しいこと');

    // Update estimate
    const estimate = {
      active: true,
      type: 'MANUAL',
      estimate: 'PT1H30M',
      resetOption: null
    };
    const estimatedProject = common.clockify.updateProjectEstimate(common.workspaceId, createdProject.id, estimate);
    t.deepEqual(estimatedProject.timeEstimate, estimate, '"timeEstimate"が正しいこと');

    // Update
    projectName = `Updated ${projectName}`;
    const updatedProject = common.clockify.updateProject(common.workspaceId, createdProject.id, { name: projectName, archived: true });
    t.equal(updatedProject.name, projectName, '"name"が正しいこと');
    t.equal(updatedProject.archived, true, '"archived"が正しいこと');

    // Delete
    const deletedClient = common.clockify.deleteProject(common.workspaceId, createdProject.id);
    t.ok(deletedClient instanceof Object, 'Objectで取得できること');

    t.notOk(common.clockify.getSpecificProject(common.workspaceId, createdProject.id), 'Projectが存在しないこと');
  });
}

function testTaskMethods_(test, common) {
  test('getAllTasks()', function (t) {
    // params指定なし
    const tasks = common.clockify.getAllTasks(common.workspaceId, common.project.id);
    t.ok(tasks.length > 0, 'データが取得できること');
    t.ok(tasks[0] instanceof Object, 'Objectで取得できること');

    // params指定あり
    const task = common.clockify.getAllTasks(common.workspaceId, common.project.id, {
      'is-active': true,
      name: common.task.name,
    });
    t.deepEqual(task[0], common.task, 'Taskのデータが正しいこと');
  });

  test('getSpecificTask()', function (t) {
    const task = common.clockify.getSpecificTask(common.workspaceId, common.project.id, common.task.id);
    t.deepEqual(task, common.task, 'Taskのデータが正しいこと');
  });

  test('Client CRUD', function (t) {
    //Create
    let taskName = 'Sandbox' + Utilities.formatDate(new Date(), 'JST', 'yyyyMMddHHmmss');
    const createdTask = common.clockify.createTask(common.workspaceId, common.project.id, taskName);
    t.equal(createdTask.projectId, common.project.id, '"projectId"が正しいこと');
    t.equal(createdTask.name, taskName, '"name"が正しいこと');
    t.equal(createdTask.status, 'ACTIVE', '"archived"が正しいこと');

    taskName = `Updated ${taskName}`;
    const updatedTask = common.clockify.updateTask(common.workspaceId, common.project.id, createdTask.id, { name: taskName, status: 'DONE' });
    t.equal(updatedTask.name, taskName, '"name"が正しいこと');
    t.equal(updatedTask.status, 'DONE', '"status"が正しいこと');

    // Delete
    const deletedTask = common.clockify.deleteTask(common.workspaceId, common.project.id, createdTask.id);
    t.ok(deletedTask instanceof Object, 'Objectで取得できること');

    t.notOk(common.clockify.getSpecificTask(common.workspaceId, common.project.id, createdTask.id), 'Taskが存在しないこと');
  });
}

function testTimeEntryMethods_(test, common) {
  test('getUserTimeEntries()', function (t) {
    // params指定なし
    const timeEntries = common.clockify.getUserTimeEntries(common.workspaceId, common.userId);
    t.ok(timeEntries.length > 0, 'データが取得できること');
    t.ok(timeEntries[0] instanceof Object, 'Objectで取得できること');

    // params指定あり
    const timeEntry = common.clockify.getUserTimeEntries(common.workspaceId, common.userId, {
      project: common.project.id,
      start: '2021-10-01T00:00:00Z',
      end: '2021-10-31T00:00:00Z',
    });
    t.deepEqual(timeEntry[0], common.timeEntry, 'Time entryのデータが正しいこと');
  });

  test('getSpecificTimeEntry()', function (t) {
    const timeEntry = common.clockify.getSpecificTimeEntry(common.workspaceId, common.timeEntry.id);
    t.deepEqual(timeEntry, common.timeEntry, 'Time entryのデータが正しいこと');
  });
}
