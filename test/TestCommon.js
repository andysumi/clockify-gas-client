class TestCommon { // eslint-disable-line
  constructor() {
    const properties = PropertiesService.getScriptProperties();
    this.apiKey_ = properties.getProperty('API_KEY');
    this.workspaceId_ = properties.getProperty('WORKSPACE_ID');
    this.client_ = JSON.parse(properties.getProperty('CLIENT'));
    this.project_ = JSON.parse(properties.getProperty('PROJECT'));
    this.task_ = JSON.parse(properties.getProperty('TASK'));
    this.clockify_ = new Clockify(this.apiKey_);
  }

  get workspaceId() {
    return this.workspaceId_;
  }

  get client() {
    return this.client_;
  }

  get project() {
    return this.project_;
  }

  get task() {
    return this.task_;
  }

  get clockify() {
    return this.clockify_;
  }
}
