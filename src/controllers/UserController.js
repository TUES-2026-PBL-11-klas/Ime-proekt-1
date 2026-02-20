const User = require('../models/User');
const jwt = require('jsonwebtoken');


class UserController {
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Всички полета са задължителни.' });
      }

      const existing = await User.findByUsername(username);
      if (existing) {
        return res.status(409).json({ error: 'Потребителското име вече е заето.' });
      }

      const user = await User.create(username, email, password);
      return res.status(201).json(user.toJSON());
    } catch (err) {
      if (err.code === '23505') {
        return res.status(409).json({ error: 'Потребител с този email вече съществува.' });
      }
      console.error(err);
      return res.status(500).json({ error: 'Сървърна грешка.' });
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: 'Username и парола са задължителни.' });
      }

      const user = await User.findByUsername(username);
      if (!user) {
        return res.status(401).json({ error: 'Невалидни данни за вход.' });
      }

      const match = await user.comparePassword(password);
      if (!match) {
        return res.status(401).json({ error: 'Невалидни данни за вход.' });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '24h' },
      );

      return res.json({ token, user: user.toJSON() });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Сървърна грешка.' });
    }
  }

  static async getAll(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Сървърна грешка.' });
    }
  }
}

module.exports = UserController;
