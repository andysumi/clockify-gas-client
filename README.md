[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp) [![Test and deploy to development](https://github.com/andysumi/clockify-gas-client/actions/workflows/deploy_development.yml/badge.svg)](https://github.com/andysumi/clockify-gas-client/actions/workflows/deploy_development.yml) [![.github/workflows/deploy_production.yml](https://github.com/andysumi/clockify-gas-client/actions/workflows/deploy_production.yml/badge.svg)](https://github.com/andysumi/clockify-gas-client/actions/workflows/deploy_production.yml)

# clockify-gas-client

Google Apps Script用の[Clockify](https://clockify.me)ライブラリ

## スクリプトID

`1Y86MadgwQYK46sUYDhNwsb55emkANWRVqIz4bt5Lj4JLX9FgZfRCIyj2`

## 使い方

1. [ライブラリをプロジェクトに追加する](https://developers.google.com/apps-script/guides/libraries)
2. [API key](https://clockify.me/user/settings)を取得する

### コードサンプル

```js
function myFunction() {
  const apiKey = PropertiesService.getScriptProperties().getProperty('API_KEY');
  const client = ClockifyClient.create(apiKey);
  const data = client.getAllWorkspaces();
  console.log(JSON.stringify(data, null , '\t'));
}
```

## リファレンス

[Clockify API](https://clockify.me/developers-api)
