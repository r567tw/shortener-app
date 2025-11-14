# 短網址生成器 (URL Shortener App)

一個使用 React + TypeScript + Vite 開發的短網址生成器應用程式，支援使用者登入、生成短網址、查看歷史紀錄等功能。

## 功能特色

- 🔐 **使用者登入認證**：透過 JWT Token 進行身份驗證
- 🔗 **短網址生成**：輸入長網址即可快速生成短網址
- 📊 **歷史紀錄**：查看所有生成過的短網址，支援分頁瀏覽
- 🎨 **現代化 UI**：使用 Tailwind CSS 打造簡潔美觀的介面
- 📱 **響應式設計**：支援桌面與行動裝置

## 技術棧

- **前端框架**：React 18
- **語言**：TypeScript
- **建置工具**：Vite
- **樣式**：Tailwind CSS
- **HTTP 客戶端**：Axios
- **路由**：React Router DOM
- **QR Code**：qrcode.react

## 專案結構

```
shortener-app/
├── src/
│   ├── components/     # 共用元件（Navbar）
│   ├── pages/          # 頁面元件（Login, Dashboard, History）
│   ├── assets/         # 靜態資源
│   ├── config.ts       # API 設定檔（環境變數）
│   ├── types.ts        # TypeScript 型別定義
│   ├── App.tsx         # 主應用程式元件
│   └── main.tsx        # 應用程式入口
├── public/             # 公開靜態資源
└── index.html          # HTML 模板
```

## 環境設定

在專案根目錄建立 `.env` 檔案，設定 API 端點：

```env
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_BASE_URL=https://your-domain.com
```

## 安裝與執行

### 安裝依賴

```bash
npm install
```

### 開發模式

```bash
npm run dev
```

應用程式將在 `http://localhost:5173` 啟動。

### 建置正式版本

```bash
npm run build
```

### 預覽建置結果

```bash
npm run preview
```

## 主要頁面

### 登入頁面 (`/login`)

- 使用者輸入帳號密碼進行登入
- 登入成功後將 JWT Token 存入 localStorage

### 短網址生成頁面 (`/dashboard`)

- 輸入原始網址
- 點擊生成按鈕即可產生短網址
- 顯示生成的短網址連結

### 歷史紀錄頁面 (`/history`)

- 查看所有生成過的短網址
- 顯示原始網址、短網址、點擊次數、建立時間
- 支援分頁功能

## API 整合

本專案與後端 API 整合，主要端點包括：

- `POST /api/login` - 使用者登入
- `POST /api/short-url` - 生成短網址
- `GET /api/short-url` - 取得短網址列表（支援分頁）

所有需要認證的 API 請求都會在 Header 中帶入 `Authorization: Bearer {token}`。

## 開發注意事項

- 本專案使用 TypeScript 嚴格模式（`strict: true`）
- 使用 `verbatimModuleSyntax` 要求明確區分型別匯入
- 遵循 ESLint 規則確保程式碼品質

## License

MIT
