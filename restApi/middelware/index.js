const express = require('express');
const auth    = require('./auth');
const verivy  = require('./verifikasi');
const router  = express.Router();

router.post('/api/v1/register', auth.register);
router.post('/api/v1/login', auth.login);


router.post('/api/v1/pilihcapil', verivy(2), auth.pilihcapil);

module.exports = router;
