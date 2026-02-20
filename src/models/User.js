const db = require('../config/database');
const bcrypt = require('bcrypt');

/**
 * User — модел, който капсулира бизнес логиката за потребител.
 * Демонстрира ООП принципи: капсулация и статични методи за CRUD.
 */
class User {
  constructor({ id, username, email, password, role, created_at }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = created_at;
  }

  /** Създава нов потребител (регистрация). */
  static async create(username, email, plainPassword) {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const { rows } = await db.query(
      `INSERT INTO users (username, email, password)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [username, email, hashedPassword],
    );
    return new User(rows[0]);
  }

  /** Намира потребител по ID. */
  static async findById(id) {
    const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0] ? new User(rows[0]) : null;
  }

  /** Намира потребител по username. */
  static async findByUsername(username) {
    const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    return rows[0] ? new User(rows[0]) : null;
  }

  /** Връща всички потребители (без паролите). */
  static async findAll() {
    const { rows } = await db.query(
      'SELECT id, username, email, role, created_at FROM users ORDER BY id',
    );
    return rows;
  }

  /** Проверява дали дадена парола съвпада с хешираната. */
  async comparePassword(plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
  }

  /** Връща потребителя без паролата (за отговори на API). */
  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt,
    };
  }
}

module.exports = User;
