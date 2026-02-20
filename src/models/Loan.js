const db = require('../config/database');

/**
 * Loan — модел за заем на книга.
 * Свързва потребител (user_id) с книга (book_id) чрез foreign keys.
 */
class Loan {
  constructor({ id, user_id, book_id, loan_date, due_date, return_date, status }) {
    this.id = id;
    this.userId = user_id;
    this.bookId = book_id;
    this.loanDate = loan_date;
    this.dueDate = due_date;
    this.returnDate = return_date;
    this.status = status;
  }

  /** Създава нов заем. */
  static async create(userId, bookId) {
    const { rows } = await db.query(
      `INSERT INTO loans (user_id, book_id)
       VALUES ($1, $2)
       RETURNING *`,
      [userId, bookId],
    );
    return new Loan(rows[0]);
  }

  /** Намира заем по ID. */
  static async findById(id) {
    const { rows } = await db.query('SELECT * FROM loans WHERE id = $1', [id]);
    return rows[0] ? new Loan(rows[0]) : null;
  }

  /** Връща всички активни заеми (с информация за книга и потребител). */
  static async findActive() {
    const { rows } = await db.query(
      `SELECT l.*, u.username, b.title AS book_title, b.author AS book_author
       FROM loans l
       JOIN users u ON u.id = l.user_id
       JOIN books b ON b.id = l.book_id
       WHERE l.status = 'active'
       ORDER BY l.loan_date DESC`,
    );
    return rows;
  }

  /** Връща просрочените заеми (due_date < NOW и все още активни). */
  static async findOverdue() {
    const { rows } = await db.query(
      `SELECT l.*, u.username, b.title AS book_title, b.author AS book_author
       FROM loans l
       JOIN users u ON u.id = l.user_id
       JOIN books b ON b.id = l.book_id
       WHERE l.status = 'active' AND l.due_date < NOW()
       ORDER BY l.due_date ASC`,
    );
    return rows;
  }

  /** Връща заемите на даден потребител. */
  static async findByUserId(userId) {
    const { rows } = await db.query(
      `SELECT l.*, b.title AS book_title, b.author AS book_author
       FROM loans l
       JOIN books b ON b.id = l.book_id
       WHERE l.user_id = $1
       ORDER BY l.loan_date DESC`,
      [userId],
    );
    return rows;
  }

  /** Маркира заема като върнат. */
  async markReturned() {
    const { rows } = await db.query(
      `UPDATE loans
       SET status = 'returned', return_date = NOW()
       WHERE id = $1
       RETURNING *`,
      [this.id],
    );
    if (rows[0]) Object.assign(this, new Loan(rows[0]));
    return this;
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      bookId: this.bookId,
      loanDate: this.loanDate,
      dueDate: this.dueDate,
      returnDate: this.returnDate,
      status: this.status,
    };
  }
}

module.exports = Loan;
