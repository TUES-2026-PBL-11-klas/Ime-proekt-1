const db = require('../config/database');


class StatsController {
  static async getDashboardStats(req, res) {
    try {
      const [usersResult, booksResult, activeLoansResult, overdueLoansResult, recentLoansResult] = await Promise.all([
        db.query('SELECT COUNT(*) AS count FROM users'),
        db.query('SELECT COUNT(*) AS count FROM books'),
        db.query("SELECT COUNT(*) AS count FROM loans WHERE status = 'active'"),
        db.query("SELECT COUNT(*) AS count FROM loans WHERE status = 'active' AND due_date < NOW()"),
        db.query(
          `SELECT l.id, l.loan_date, l.due_date, l.return_date, l.status,
                  u.username, b.title AS book_title, b.author AS book_author
           FROM loans l
           JOIN users u ON u.id = l.user_id
           JOIN books b ON b.id = l.book_id
           ORDER BY l.loan_date DESC
           LIMIT 5`
        ),
      ]);

      return res.json({
        totalUsers: parseInt(usersResult.rows[0].count),
        totalBooks: parseInt(booksResult.rows[0].count),
        activeLoans: parseInt(activeLoansResult.rows[0].count),
        overdueLoans: parseInt(overdueLoansResult.rows[0].count),
        recentLoans: recentLoansResult.rows,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Сървърна грешка.' });
    }
  }
}

module.exports = StatsController;
