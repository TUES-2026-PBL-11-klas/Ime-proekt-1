const { Router } = require('express');
const BookController = require('../controllers/BookController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

const rodter = Router();

// Публични ендпойнти
router.get('/', BookController.getAll);           // списък + сортиране/филтриране
router.get('/:id', BookController.getById);       // детайли за книга

// Администраторски ендпойнти
router.post('/', authenticate, authorizeAdmin, BookController.create);
router.put('/:id', authenticate, authorizeAdmin, BookController.update);
router.delete('/:id', authenticate, authorizeAdmin, BookController.delete);

module.exports = router;
