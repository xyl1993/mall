const router = require('express').Router();

const auth = require('./auth/routes');
const product = require('./product/routes');
const common = require('./common/routes');
const homeSetting = require('./homeSetting/routes');
const order = require('./order/routes');
const shopping = require('./shopping/routes');
const user = require('./user/routes');
const tplConfig = require('./tplConfig/routes');

router.use(auth);
router.use(product);
router.use(common);
router.use(homeSetting);
router.use(order);
router.use(shopping);
router.use(user);
router.use(tplConfig);
module.exports = router;
