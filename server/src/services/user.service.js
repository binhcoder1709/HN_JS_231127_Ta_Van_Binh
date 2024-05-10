import connection from "../configs/mysql.config.js";

// lấy toàn bộ bản ghi
const findAll = async () => {
  try {
    const sql = "SELECT * FROM users";
    const result = await new Promise((resolve, reject) => {
      connection.query(sql, (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(result);
      });
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// tìm kiếm bản ghi bằng email
const findByEmail = async (email) => {
  try {
    const sql = "SELECT * FROM users WHERE email = ?";
    const result = await new Promise((resolve, reject) => {
      connection.query(sql, [email], (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(result[0]);
      });
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// cập nhật role cho user
const updateRole = async (role, id) => {
  try {
    const sql = "UPDATE users SET role = ? WHERE id = ?";
    const result = await new Promise((resolve, reject) => {
      connection.query(sql, [role, id], (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(result);
      });
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// tìm kiếm 1 bản ghi bằng id
const findById = async (id) => {
  try {
    const sql = "SELECT * FROM users WHERE id = ?";
    const result = await new Promise((resolve, reject) => {
      connection.query(sql, [id], (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(result[0]);
      });
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// xoá 1 bản ghi theo id
const deleteById = async (id)=>
  {
    try {
      const sql = "DELETE FROM users WHERE id = ?";
      const result = await new Promise((resolve, reject) => {
        connection.query(sql, [id], (err, result) => {
          if (err) {
            console.error(err);
            reject(err);
          }
          resolve(result);
        });
      });
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
export { findAll, findByEmail, updateRole, findById, deleteById };
