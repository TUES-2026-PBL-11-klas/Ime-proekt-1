const { Router } = require('express');
const LoanController = require('../controllers/LoanController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

const router = Router();

// Потребителски ендпойнти (изискват автентикация)
router.post('/', authenticate, LoanController.borrow);                // заемане
router.put('/:id/return', authenticate, LoanController.returnBook);   // връщане
router.get('/my', authenticate, LoanController.getMyLoans);           // моите заеми

// Администраторски ендпойнти
router.get('/active', authenticate, authorizeAdmin, LoanController.getActive);
router.get('/overdue', authenticate, authorizeAdmin, LoanController.getOverdue);

module.exports = router;
