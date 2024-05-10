import connection from "../configs/mysql.config.js";

const findAll = async () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM books";
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
    const { id, book_name, description, price } = data;
    const sql =
      "INSERT INTO books (id, book_name, description, price) VALUES (?, ?, ?, ?); INSERT INTO book_author (id)";
    const values = [id, book_name, description, price];
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
    const sql = "SELECT * FROM books WHERE id = ?";
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

const updateById = async (data, id) => {
  try {
    const { book_name, description, price } = data;
    const sql =
      "UPDATE books SET book_name = ?, description = ?, price= ? WHERE id = ?";
    const result = await new Promise((resolve, reject) => {
      connection.query(
        sql,
        [book_name, description, price, id],
        (err, result) => {
          if (err) {
            console.error(err);
            reject(err);
          }
          resolve(result[0]);
        }
      );
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
    const sql = "DELETE FROM books WHERE id = ?";
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
};
export { findAll, createOne, findById, deleteById, updateById };
