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
    const { id, book_name, description, price, author } = data;
    console.log(data);
    const sql1 = "INSERT INTO books (id, book_name, description, price) VALUES (?, ?, ?, ?)";
    const sql2 = "INSERT INTO book_author (book_id, author_id) VALUES (?, ?)";
    const values1 = [id, book_name, description, price];
    const values2 = [id, author];

    connection.beginTransaction((err) => {
      if (err) {
        console.error('Transaction Error:', err);
        return reject(err);
      }

      connection.query(sql1, values1, (err, result1) => {
        if (err) {
          return connection.rollback(() => {
            console.error('Insert books Error:', err);
            reject(err);
          });
        }

        connection.query(sql2, values2, (err, result2) => {
          if (err) {
            return connection.rollback(() => {
              console.error('Insert book_author Error:', err);
              reject(err);
            });
          }

          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                console.error('Commit Error:', err);
                reject(err);
              });
            }
            resolve({ result1, result2 });
          });
        });
      });
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
          resolve(result);
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
