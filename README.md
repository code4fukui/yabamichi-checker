# やば道チェッカー

<img src="https://user-images.githubusercontent.com/69106571/218246457-7e5650ae-5879-4c89-bdc0-e68a7b5a0d6d.PNG" width="256">

[アプリを開く](https://yabamichi-checker.deno.dev/)

## 目的

地域（国高地区）の人に対して危ない場所はどこか分かるように視覚化するアプリ

## 機能

- 危険度ランキング
- 検索した経路の危険な場所
- 危険な場所をとタップすると、人目線、車目線を体感できる
- 危ないと体験した場所に投稿可能
- 危険な場所の改善案の提案
- いいね機能

## リンク集

- [Slack](https://codeforfukui.slack.com/join/shared_invite/zt-1g30n0mnr-g8y7eTAegytui4riQJ8d4A#/shared-invite/email)\#やば道チェッカー

## 起動方法

1. [openrouteservice APIのAPIキーを取得](https://api.openrouteservice.org/)
2. .envファイルにAPIキーを設定

3. deno task start
4. open [http://localhost:8000/](http://localhost:8000/)

## Thanks

- 絵文字 [Twemoji](https://twemoji.twitter.com/)
- 地図 [Leaflet](https://leafletjs.com/)
- 座標変換 [Geo3x3](https://geo3x3.com/)
- テンプレートエンジン [dejs](https://github.com/syumai/dejs)
- データ [キッズセーフ](https://github.com/code4fukui/kunitaka)
