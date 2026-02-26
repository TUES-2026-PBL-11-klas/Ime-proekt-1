const jwt = require('jsonwebtoken');
const User = require('../models/User');

function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Необходима е автентикация.' });
  }

  const token = header.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET || 'secret', async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Невалиден или изтекъл токен.' });
    }

    const userId = decoded && typeof decoded === 'object' ? decoded.id : undefined;
    if (!userId) {
      return res.status(401).json({ error: 'Невалиден токен.' });
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ error: 'Невалиден токен.' });
      }

      // Attach the fresh user from DB to the request (not the JWT payload).
      req.user = user.toJSON(); // { id, username, email, role, createdAt }
      next();
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Сървърна грешка.' });
    }
  });
}

function authorizeAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Нямате администраторски права.' });
  }
  next();
}

module.exports = { authenticate, authorizeAdmin };
