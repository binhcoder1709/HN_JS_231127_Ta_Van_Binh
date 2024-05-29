import connection from "../configs/mysql.config.js";

const findAll = async () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM authors";
    connection.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(result);
    });
  });
};

const createOne = async (data) => {
  return new Promise((resolve, reject) => {
    const { id, author_name, biography } = data;
    const sql =
      "INSERT INTO authors (id, author_name, biography) VALUES (?, ?, ?)";
    const values = [id, author_name, biography];
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(result);
    });
  });
};
// tìm kiếm 1 bản ghi bằng id
const findById = async (id) => {
  try {
    const sql = "SELECT * FROM authors WHERE id = ?";
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
const deleteById = async (id) => {
  try {
    // Xóa các bản ghi liên quan trong bảng `book_author` trước
    const deleteBookAuthorSql = "DELETE FROM book_author WHERE author_id = ?";
    await new Promise((resolve, reject) => {
      connection.query(deleteBookAuthorSql, [id], (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(result);
      });
    });

    // Sau đó xóa tác giả trong bảng `authors`
    const deleteAuthorSql = "DELETE FROM authors WHERE id = ?";
    const result = await new Promise((resolve, reject) => {
      connection.query(deleteAuthorSql, [id], (err, result) => {
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

export { findAll, createOne, findById, deleteById };
