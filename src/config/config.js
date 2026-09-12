require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  // 不在启动时崩溃，但日志明显，方便排查
  console.error('[config] 缺少环境变量 MONGO_URI，请在 .env 中配置');
}

// 默认连接字符串已不再硬编码，必须从 .env 注入
const uri = MONGO_URI || '';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const connectDB = async () => {
  try {
    if (!uri) {
      throw new Error('MONGO_URI is empty; check your .env file');
    }
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error('MongoDB 连接失败:', error.message);
    process.exit(1);
  }
};

module.exports = { connectDB, client };
