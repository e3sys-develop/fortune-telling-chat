# Fortune Fortune - AI占い師チャット

AI占い師があなたの悩みにお答えします。5人の個性豊かな占い師キャラクターとチャット形式で相談できる無料サービスです。

## セットアップ

### 必要な環境変数

このアプリケーションを動作させるには、Google Gemini APIキーが必要です。

1. `.env.example`を`.env`にコピーしてください
2. Google AI StudioでGemini APIキーを取得してください
3. `.env`ファイルの`VITE_GEMINI_API_KEY`にAPIキーを設定してください

```bash
cp .env.example .env
# .envファイルを編集してAPIキーを設定
```

### 開発サーバーの起動

```bash
npm install
npm run dev
```
