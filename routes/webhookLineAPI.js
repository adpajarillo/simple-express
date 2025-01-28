var express = require('express');
const webhookAPIController = require('../controllers/webhookAPIController');
var router = express.Router();
const line = require('@line/bot-sdk');
const lineConfig = require('../utils/lineConfig');

router.post('/callback', line.middleware(lineConfig), webhookAPIController.handleEvent);


module.exports = router;
