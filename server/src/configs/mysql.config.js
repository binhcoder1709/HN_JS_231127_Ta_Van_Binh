import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Lỗi kết nối: ", err);
    return;
  }
  console.log("Đã kết nối thành công tới MySQL");
});

export default connection;
