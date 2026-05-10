const { getOne, getQuery, insert } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static create({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const userId = insert(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    return { id: userId, username, email };
  }

  static findByEmail(email) {
    return getOne('SELECT * FROM users WHERE email = ?', [email]);
  }

  static findByUsername(username) {
    return getOne('SELECT * FROM users WHERE username = ?', [username]);
  }

  static findById(id) {
    return getOne(
      'SELECT id, username, email, created_at FROM users WHERE id = ?',
      [id]
    );
  }

  static verifyPassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}

module.exports = User;
