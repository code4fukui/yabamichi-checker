# やば道チェッカー (Yabamichi Checker)

[
![Built with Deno](https://img.shields.io/badge/built%20with-Deno-000000.svg?logo=deno)
](https://deno.land)

住民から寄せられたデータを基に、国高地区内の危険な道路や交差点を可視化し、確認するためのアプリケーションです。

![やば道チェッカーのスクリーンショット。経路と特定された危険箇所が地図上に表示されています。](https://user-images.githubusercontent.com/69106571/218246457-7e5650ae-5879-4c89-bdc0-e68a7b5a0d6d.PNG)

### [ライブデモ](https://yabamichi-checker.deno.dev/)

## 機能

- **経路の危険度分析**: 出発地と目的地を入力すると、経路上の報告された危険箇所をハイライトしたルートマップを表示します。
- **危険箇所ランキング**: 事故データや報告に基づき、最も危険な場所をランキング形式で表示します。
- **詳細情報**: 危険箇所のアイコンをクリックすると、地域住民から寄せられた説明や懸念事項を確認できます。
- **VR体験**: 特定の高リスクな交差点の3Dモデルを探索し、歩行者視点での危険性をより深く理解できます。

## 技術スタック

- **フレームワーク**: [Fresh](https://fresh.deno.dev/) (DenoベースのWebフレームワーク)
- **マッピング**: [Leaflet](https://leafletjs.com/) および [国土地理院 (GSI)](https://maps.gsi.go.jp/development/ichiran.html) の地図タイル。
- **ルーティング**: 自動車のルート生成に [openrouteservice API](https://api.openrouteservice.org/) を使用。
- **座標系**: 位置データのエンコードに [Geo3x3](https://geo3x3.com/) を使用。

## 使い始め方

### 前提条件

- システムに [Deno](https://deno.land/) がインストールされていること。
- [openrouteservice](https://api.openrouteservice.org/) のAPIキー。

### インストールとセットアップ

1. リポジトリをクローンします:
   ```bash
   git clone https://github.com/code4fukui/yabamichi-checker.git
   cd yabamichi-checker
   ```

2. サンプルから `.env` ファイルを作成します:
   ```bash
   cp .env.sample .env
   ```

3. `.env` ファイルに openrouteservice のAPIキーを追加します:
   ```env
   OPENROUTE_KEY="YOUR_API_KEY_HERE"
   ```

4. 開発サーバーを起動します:
   ```bash
   deno task start
   ```

5. ブラウザを開き、`http://localhost:8000` にアクセスします。

## データソース

危険箇所のデータは、地域の子どもたちにとって危険な場所の情報を収集している **キッズセーフ (KidsSafe)** プロジェクトから提供されています。

- [KidsSafe 国高 データリポジトリ](https://github.com/code4fukui/kunitaka)

## 謝辞

- **絵文字**: [Twemoji](https://twemoji.twitter.com/)
- **テンプレートエンジン**: [dejs](https://github.com/syumai/dejs)
- **コミュニティ**: [Code for Fukui Slack](https://codeforfukui.slack.com/join/shared_invite/zt-1g30n0mnr-g8y7eTAegytui4riQJ8d4A#/shared-invite/email) (`#やば道チェッカー` チャンネルにご参加ください)
