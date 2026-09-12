# charging_station_backend

> 充电桩系统后端服务（Node.js + Express + MongoDB）。

## 项目简介

为 `charging_station_uniapp`（微信小程序前端）提供后端 API。
主要功能：

- 用户注册 / 登录 / 手机号授权
- 余额管理（充值、消费、退款）
- 微信支付 V3（统一下单、回调、订单查询）
- 充电桩插座状态、订单状态管理与日志
- 阿里云 IoT MQTT 客户端：作为服务端中转到小程序端
- 充电桩硬件端 INA226 电流/电压采集接入

## 技术栈

- Node.js + Express
- MongoDB Atlas（mongoose / 原生 driver）
- 微信支付 V3（`wechatpay-node-v3`）
- 阿里云 IoT MQTT（`mqtt`）
- TailwindCSS（前端静态页面）

## 仓库结构

```
.
├── server.js                # 入口
├── package.json
├── .env.example             # 环境变量示例（复制为 .env 后填入）
├── cert/                    # 微信支付证书（被 .gitignore 忽略）
│   └── pay_cert/
├── src/
│   ├── config/              # 集中配置（config.js, wxpay.config.js）
│   ├── routes/              # Express 路由
│   ├── functions/           # 业务模块（微信支付、阿里云 MQTT 等）
│   ├── db/                  # MongoDB 数据访问层
│   └── ...
├── public/                  # 静态资源（含 Tailwind 编译产物）
├── scripts/                 # 一次性脚本（如 addPasswordField.js）
└── logs/                    # 日志目录
```

## 安全说明（重要）

本仓库**不包含任何真实密钥**。所有敏感信息（MongoDB 连接串、
微信 AppSecret、微信支付商户密钥、APIv3 密钥等）均通过 `.env`
环境变量注入。**历史提交中所有硬编码密钥均已删除。**

如果你 clone 后启动时报错提示缺少环境变量，请按下面"环境配置"
补齐 `.env` 文件。

## 环境配置

1. 安装依赖：
   ```bash
   npm install
   ```
2. 复制并编辑环境变量：
   ```bash
   cp .env.example .env
   ```
   然后填入以下信息：
   - `MONGO_URI`：MongoDB Atlas 连接串
   - `WX_APP_ID` / `WX_APP_SECRET`：微信小程序凭证
   - `WX_MCH_ID` / `WX_API_V3_KEY`：微信支付商户号与 APIv3 密钥
   - `WX_NOTIFY_DOMAIN`：支付回调地址（https）

3. 把微信支付商户证书放到 `cert/pay_cert/` 下：
   - `apiclient_cert.pem`
   - `apiclient_key.pem`

   该目录已被 `.gitignore` 忽略。

## 启动

```bash
# 开发模式
node server.js

# 或者使用 nodemon
npx nodemon server.js
```

服务默认监听 `process.env.PORT || 3000`。

## API 概览

主要路由前缀：

- `/api/phone` — 手机号授权相关
- `/api/wxpay/notify` — 微信支付回调
- `/api/qrPay` — 扫码支付
- `/api/balance` — 余额相关

详细接口字段请参考 `src/routes/*` 内每个路由的代码注释。

## 与前端的关联

本服务为 `charging_station_uniapp` 提供 API 与支付回调。
前端通过 HTTPS 调用，配置在 `WX_NOTIFY_DOMAIN` 中。

## License

MIT
