const express = require("express");
const cors = require("cors");
const pgp = require("pg-promise")();
const logger = require("morgan");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

const cn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};
const db = pgp(cn);

app.get("/users", async (req, res) => {
  try {
    
    const query = `SELECT * from users;`;
    const result = await db.any(query);
    console.log(result);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.get("/movies", async (req, res) => {
  try {
    const query = "SELECT * FROM movies";
    const result = await db.any(query);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

app.get("/search", async (req, res) => {
  const { title } = req.query;
  try {
    const query = `SELECT * FROM movies WHERE title ILIKE $1;`;
    const result = await db.manyOrNone(query, [title]);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

app.get("/", (req, res) => {
  res.send("Server is running");
});


const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




//middleware///////////////////////////////////////////////////////////
function validateTitle(req, res, next) {
  let { title } = req.query;
  if(title === undefined) {
    console.error("Invalid title.");
    return res.status(400).json({ error: 'Invalid title.' });
  }
  const sanitizedTitle = title
  .replace(/[%_]/g, '\\$&')  // Escape % and _ characters
  .replace(/\?/g, '_')       // Replace ? with _
  .replace(/\*/g, '%')       // Replace * with %
  .normalize('NFC'); 
  req.query.title = sanitizedTitle;
  next();
}

function detectSqlInjection(input) {
  // 定义可能表示SQL注入的模式
  const sqlPatterns = [
    /\b(SELECT|INSERT|UPDATE|DELETE|DROP|TRUNCATE|ALTER|CREATE|TABLE|FROM|WHERE|AND|OR|UNION|JOIN|INNER JOIN|OUTER JOIN|LEFT JOIN|RIGHT JOIN)\b/i,
    /--/,          // SQL 注释
    /;/,           // 多语句查询
    /\/\*/,        // 多行注释开始
    /\*\//,        // 多行注释结束
    /'.*'/,        // 单引号字符串
    /".*"/,        // 双引号字符串
    /\b(EXEC|EXECUTE)\b/i,  // 执行存储过程
    /\b(CHAR|NCHAR|VARCHAR|NVARCHAR)\b/i,  // 字符串数据类型
    /\b(WAITFOR DELAY|WAITFOR TIME)\b/i,  // 时间延迟攻击
    /\b(BENCHMARK|SLEEP)\b/i,  // 基准测试或睡眠函数
    /\b(LOAD_FILE|INTO OUTFILE|INTO DUMPFILE)\b/i,  // 文件操作
    /\b(INFORMATION_SCHEMA|SCHEMA_NAME|TABLE_NAME|COLUMN_NAME)\b/i,  // 元数据查询
    /\b(CASE WHEN.*THEN.*ELSE)\b/i,  // CASE语句
    /\b(CONVERT|CAST)\b/i,  // 数据类型转换
  ];

  // 检查输入是否匹配任何SQL注入模式
  const detectedPatterns = sqlPatterns.filter(pattern => pattern.test(input));

  if (detectedPatterns.length > 0) {
    return {
      isSuspicious: true,
      detectedPatterns: detectedPatterns.map(p => p.toString())
    };
  }

  return {
    isSuspicious: false,
    detectedPatterns: []
  };
}