const db = require('../config/database');

/**
 * Book — модел за книга.
 * Поддържа CRUD операции, сортиране по автор и филтриране по жанр.
 */
class Book {
  constructor({ id, title, author, genre, isbn, published_year, copies, available, created_at }) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.isbn = isbn;
    this.publishedYear = published_year;
    this.copies = copies;
    this.available = available;
    this.createdAt = created_at;
  }

  /* ────────── CRUD ────────── */

  /** Добавя нова книга в каталога. */
  static async create({ title, author, genre, isbn, published_year, copies }) {
    const { rows } = await db.query(
      `INSERT INTO books (title, author, genre, isbn, published_year, copies, available)
       VALUES ($1, $2, $3, $4, $5, $6, $6)
       RETURNING *`,
      [title, author, genre, isbn || null, published_year || null, copies || 1],
    );
    return new Book(rows[0]);
  }

  /** Редактира съществуваща книга. */
  static async update(id, fields) {
    const { title, author, genre, isbn, published_year, copies } = fields;
    const { rows } = await db.query(
      `UPDATE books
       SET title = COALESCE($1, title),
           author = COALESCE($2, author),
           genre = COALESCE($3, genre),
           isbn = COALESCE($4, isbn),
           published_year = COALESCE($5, published_year),
           copies = COALESCE($6, copies)
       WHERE id = $7
       RETURNING *`,
      [title, author, genre, isbn, published_year, copies, id],
    );
    return rows[0] ? new Book(rows[0]) : null;
  }

  /** Изтрива книга по ID. */
  static async delete(id) {
    const { rowCount } = await db.query('DELETE FROM books WHERE id = $1', [id]);
    return rowCount > 0;
  }

  /** Намира книга по ID. */
  static async findById(id) {
    const { rows } = await db.query('SELECT * FROM books WHERE id = $1', [id]);
    return rows[0] ? new Book(rows[0]) : null;
  }

  /* ────────── Списъци, сортиране, филтриране ────────── */

  /**
   * Връща списък с книги. Поддържа:
   *  - sortBy=author  → сортиране по автор (азбучен ред)
   *  - genre=...      → филтриране по жанр
   */
  static async findAll({ sortBy, genre } = {}) {
    let text = 'SELECT * FROM books';
    const params = [];

    if (genre) {
      params.push(genre);
      text += ` WHERE genre = $${params.length}`;
    }

    if (sortBy === 'author') {
      text += ' ORDER BY author ASC';
    } else {
      text += ' ORDER BY id ASC';
    }

    const { rows } = await db.query(text, params);
    return rows.map((r) => new Book(r));
  }

  /** Намалява бройката свободни копия с 1 (при заемане). */
  async decrementAvailable() {
    const { rows } = await db.query(
      `UPDATE books SET available = available - 1
       WHERE id = $1 AND available > 0
       RETURNING *`,
      [this.id],
    );
    if (rows[0]) Object.assign(this, new Book(rows[0]));
    return rows.length > 0;
  }

  /** Увеличава бройката свободни копия с 1 (при връщане). */
  async incrementAvailable() {
    const { rows } = await db.query(
      `UPDATE books SET available = available + 1
       WHERE id = $1
       RETURNING *`,
      [this.id],
    );
    if (rows[0]) Object.assign(this, new Book(rows[0]));
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      genre: this.genre,
      isbn: this.isbn,
      publishedYear: this.publishedYear,
      copies: this.copies,
      available: this.available,
      createdAt: this.createdAt,
    };
  }
}

module.exports = Book;
