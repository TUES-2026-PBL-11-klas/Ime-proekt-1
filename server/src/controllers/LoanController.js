const Loan = require('../models/Loan');
const Book = require('../models/Book');


class LoanController {
  static async borrow(req, res) {
    try {
      const userId = req.user.id; // от JWT middleware
      const { bookId } = req.body;

      if (!bookId) {
        return res.status(400).json({ error: 'bookId е задължително поле.' });
      }

      const book = await Book.findById(bookId);
      if (!book) return res.status(404).json({ error: 'Книгата не е намерена.' });
      if (book.available <= 0) {
        return res.status(400).json({ error: 'Няма налични копия на тази книга.' });
      }

      const success = await book.decrementAvailable();
      if (!success) {
        return res.status(400).json({ error: 'Няма налични копия на тази книга.' });
      }

      const loan = await Loan.create(userId, bookId);
      return res.status(201).json(loan.toJSON());
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Сървърна грешка.' });
    }
  }

  static async returnBook(req, res) {
    try {
      const loan = await Loan.findById(req.params.id);
      if (!loan) return res.status(404).json({ error: 'Заемът не е намерен.' });

      if (loan.status === 'returned') {
        return res.status(400).json({ error: 'Книгата вече е върната.' });
      }

      if (req.user.role !== 'admin' && loan.userId !== req.user.id) {
        return res.status(403).json({ error: 'Нямате права за тази операция.' });
      }

      await loan.markReturned();

      const book = await Book.findById(loan.bookId);
      if (book) await book.incrementAvailable();

      return res.json({ message: 'Книгата е върната успешно.', loan: loan.toJSON() });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Сървърна грешка.' });
    }
  }

  static async getMyLoans(req, res) {
    try {
      const loans = await Loan.findByUserId(req.user.id);
      return res.json(loans);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Сървърна грешка.' });
    }
  }

  static async getActive(req, res) {
    try {
      const loans = await Loan.findActive();
      return res.json(loans);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Сървърна грешка.' });
    }
  }

  static async getOverdue(req, res) {
    try {
      const loans = await Loan.findOverdue();
      return res.json(loans);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Сървърна грешка.' });
    }
  }
}

module.exports = LoanController;
