const User = require('../models/User');
const jwt = require('jsonwebtoken');


class UserController {
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Всички полета са задължителни.' });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Невалиден формат на email адрес.' });
      }

      // Validate password length
      if (password.length < 6) {
        return res.status(400).json({ error: 'Паролата трябва да бъде поне 6 символа.' });
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

      // Always include username in the JWT payload.
      // (If for any reason the DB row mapping is missing `user.username`, fall back to the login input.)
      const usernameForToken = user.username || username;

      const token = jwt.sign(
        { id: user.id, role: user.role, username: usernameForToken },
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

  static async updateRole(req, res) {
    try {
      const { id } = req.params;
      const { role } = req.body;

      if (!role || !['admin', 'user'].includes(role)) {
        return res.status(400).json({ error: 'Невалидна роля. Допустими стойности: admin, user.' });
      }

      // Prevent admin from changing their own role
      if (parseInt(id) === req.user.id) {
        return res.status(400).json({ error: 'Не можете да промените собствената си роля.' });
      }

      const updatedUser = await User.updateRole(id, role);
      if (!updatedUser) {
        return res.status(404).json({ error: 'Потребителят не е намерен.' });
      }

      return res.json(updatedUser);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Сървърна грешка.' });
    }
  }
}

module.exports = UserController;
