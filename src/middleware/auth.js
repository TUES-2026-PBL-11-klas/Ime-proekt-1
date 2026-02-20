const jwt = require('jsonwebtoken');

/**
 * authenticate — middleware за JWT автентикация.
 * Проверява наличието и валидността на Bearer токен.
 */
function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Необходима е автентикация.' });
  }

  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded; // { id, role }
    next();
  } catch {
    return res.status(401).json({ error: 'Невалиден или изтекъл токен.' });
  }
}

/**
 * authorizeAdmin — middleware, което допуска само администратори.
 * Трябва да се използва след authenticate.
 */
function authorizeAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Нямате администраторски права.' });
  }
  next();
}

module.exports = { authenticate, authorizeAdmin };
