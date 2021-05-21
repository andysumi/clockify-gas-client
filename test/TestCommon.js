class TestCommon { // eslint-disable-line
  constructor() {
    const properties = PropertiesService.getScriptProperties();
    this.apiKey_ = properties.getProperty('API_KEY');
    this.workspaceId_ = properties.getProperty('WORKSPACE_ID');
    this.clientId_ = properties.getProperty('CLIENT_ID');
    this.clockify_ = new Clockify(this.apiKey_);
  }

  get workspaceId() {
    return this.workspaceId_;
  }

  get clientId() {
    return this.clientId_;
  }

  get clockify() {
    return this.clockify_;
  }
}
