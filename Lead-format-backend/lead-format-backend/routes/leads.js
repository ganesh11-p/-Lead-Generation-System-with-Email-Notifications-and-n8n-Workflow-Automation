const express = require('express');
const router = express.Router();

const { processLead } = require('../controllers/leadController');

router.post('/', processLead);

module.exports = router;
