const express = require('express');
const router = express.Router();
const { submitAnswers, healthCheck } = require('../controllers/birthdayController');

// Health check
router.get('/health', healthCheck);

// Submit birthday answers
router.post('/answers', submitAnswers);

module.exports = router;
