const pool = require("../ config/dbConfig");

const util = require("util");
const query = util.promisify(pool.query).bind(pool);

let usersQuery = {};

usersQuery.getAllUsers = async () => {
  try {
    const results = await query("SELECT * FROM users");
    return results;
  } catch (error) {
    return error;
  }
};

usersQuery.getUserById = async (id) => {
  try {
    const results = await query(
      `SELECT id, name, email, avatar FROM users WHERE id=?`,
      [id]
    );
    return results[0];
  } catch (error) {
    return error;
  }
};

usersQuery.registerUser = async (
  first_name,
  last_name,
  avatar_img,
  address,
  contact_number,
  email,
  password
) => {
  try {
    const results = await query(
      `INSERT INTO users (first_name, last_name, avatar_img, address, contact_number, email, password) VALUES(?, ?, ?, ?, ?, ?, ?)`,
      [
        first_name,
        last_name,
        avatar_img,
        address,
        contact_number,
        email,
        password,
      ]
    );
    return results;
  } catch (error) {
    return error;
  }
};

usersQuery.updateUser = async (
  first_name,
  last_name,
  avatar_img,
  address,
  contact_number,
  email,
  password,
  id
) => {
  try {
    const results = await query(
      `UPDATE users SET first_name=?, last_name=?, avatar_img=?, address=?, contact_number=?, email=?, password=? WHERE id=?`,
      [
        first_name,
        last_name,
        avatar_img,
        address,
        contact_number,
        email,
        password,
        id,
      ]
    );
    return results[0];
  } catch (error) {
    return error;
  }
};

usersQuery.deleteUser = async (id) => {
  try {
    const results = await query(`DELETE from users WHERE id=?`, [id]);
    return results[0];
  } catch (error) {
    return error;
  }
};

usersQuery.getUserByEmail = async (email) => {
  try {
    const results = await query(`SELECT * from users WHERE email=?`, [email]);
    return results[0];
  } catch (error) {
    return error;
  }
};

module.exports = usersQuery;
