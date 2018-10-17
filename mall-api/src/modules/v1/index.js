const router = require('express').Router();

const auth = require('./auth/routes');
const product = require('./product/routes');
const common = require('./common/routes');

router.use(auth);
router.use(product);
router.use(common);
module.exports = router;
