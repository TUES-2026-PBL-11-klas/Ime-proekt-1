const { Router } = require('express');
const StatsController = require('../controllers/StatsController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

const router = Router();

// Статистики за таблото (само admin)
router.get('/', authenticate, authorizeAdmin, StatsController.getDashboardStats);

module.exports = router;
