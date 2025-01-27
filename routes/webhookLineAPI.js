var express = require('express');
const webhookAPIController = require('../controllers/webhookAPIController');
var router = express.Router();

router.post('/api', webhookAPIController.execute);


module.exports = router;
