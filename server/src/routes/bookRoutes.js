const { Router } = require('express');
const BookController = require('../controllers/BookController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

const router = Router();

router.get('/', BookController.getAll);           
router.get('/:id', BookController.getById);       

router.post('/', authenticate, authorizeAdmin, BookController.create);
router.put('/:id', authenticate, authorizeAdmin, BookController.update);
router.delete('/:id', authenticate, authorizeAdmin, BookController.delete);

module.exports = router;
