const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { dbConfig, jwtSecretKey } = require('../config');

const salt = bcrypt.genSaltSync(10);

const registerUser = async (fullName, email, password) => {
  try {
    const hashedPassword = bcrypt.hashSync(password, salt);
    const con = await mysql.createConnection(dbConfig);
    const [result] = await con.execute('INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)', [fullName, email, hashedPassword]);
    await con.end();
    return result;
  } catch (error) {
    return error;
  }
};

const loginUser = async (email, password) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [result] = await con.execute('SELECT * FROM users WHERE email = ?', [email]);
    const doesPasswordMatch = bcrypt.compareSync(password, result[0].password);
    await con.end();

    if (!doesPasswordMatch) {
      return result.status(400).send('Incorrect email or password');
    }

    if (doesPasswordMatch) {
      const token = jwt.sign({ id: result[0].id, email: result[0].email }, jwtSecretKey);
      return token;
    }
  } catch (error) {
    return ({ error });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
