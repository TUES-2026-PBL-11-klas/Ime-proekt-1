const { Router } = require('express');
const UserController = require('../controllers/UserController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

const router = Router();

// Регистрация
router.post('/register', UserController.register);

// Вход
router.post('/login', UserController.login);

// Списък с всички потребители (само admin)
router.get('/', authenticate, authorizeAdmin, UserController.getAll);

module.exports = router;
