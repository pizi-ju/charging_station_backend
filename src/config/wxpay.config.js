const fs = require('fs');
const path = require('path');

require('dotenv').config();

function required(key) {
  const v = process.env[key];
  if (!v) {
    throw new Error(`[wxpay.config] 缺少环境变量 ${key}，请在 .env 中配置`);
  }
  return v;
}

module.exports = {
    // 小程序配置
    appId: process.env.WX_APP_ID || '',
    appSecret: process.env.WX_APP_SECRET || '',

    // 商户配置
    mchId: process.env.WX_MCH_ID || '',
    // V3需要证书路径而非单一API密钥
    publicKey: fs.readFileSync(path.join(__dirname, '../../cert/pay_cert/apiclient_cert.pem')),
    privateKey: fs.readFileSync(path.join(__dirname, '../../cert/pay_cert/apiclient_key.pem')),
    apiV3Key: process.env.WX_API_V3_KEY || '',

    // 回调域名
    domain: process.env.WX_NOTIFY_DOMAIN || ''
};
