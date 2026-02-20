const Book = require('../models/Book');


class BookController {
  static async getAll(req, res) {
    try {
      const { sortBy, genre } = req.query;
      const books = await Book.findAll({ sortBy, genre });
      return res.json(books.map((b) => b.toJSON()));
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Сървърна грешка.' });
    }
  }

  static async getById(req, res) {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) return res.status(404).json({ error: 'Книгата не е намерена.' });
      return res.json(book.toJSON());
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Сървърна грешка.' });
    }
  }

  static async create(req, res) {
    try {
      const { title, author, genre } = req.body;
      if (!title || !author || !genre) {
        return res.status(400).json({ error: 'title, author и genre са задължителни.' });
      }
      const book = await Book.create(req.body);
      return res.status(201).json(book.toJSON());
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Сървърна грешка.' });
    }
  }

  static async update(req, res) {
    try {
      const book = await Book.update(req.params.id, req.body);
      if (!book) return res.status(404).json({ error: 'Книгата не е намерена.' });
      return res.json(book.toJSON());
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Сървърна грешка.' });
    }
  }

  static async delete(req, res) {
    try {
      const deleted = await Book.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Книгата не е намерена.' });
      return res.json({ message: 'Книгата е изтрита успешно.' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Сървърна грешка.' });
    }
  }
}

module.exports = BookController;
