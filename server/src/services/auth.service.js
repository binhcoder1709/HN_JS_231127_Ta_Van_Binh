import connection from "../configs/mysql.config.js";

// đăng ký dữ liệu
const createOne = (data) => {
  return new Promise((resolve, reject) => {
    const { id, user_name, email, password, phone_number, address, role } =
      data;
    const sql =
      "INSERT INTO users (id, user_name, email, password, phone_number, address, role) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
      id,
      user_name,
      email,
      password,
      phone_number,
      address,
      role,
    ];
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(result);
    });
  });
};

// đăng nhập dữ liệu
const login = async (data) => {
  return new Promise((resolve, reject) => {
    const { email, password } = data;
    const sql = "SELECT * FROM users WHERE email=? AND password=?";
    const values = [email, password];
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(result);
    });
  });
};

export { createOne, login };
