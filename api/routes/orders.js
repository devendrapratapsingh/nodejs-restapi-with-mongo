const express = require('express')
const router = express.Router();

const orderController = require('../controllers/orders');
const checkAuth = require('../auth-gaurd/check-auth')
router.get('/',checkAuth, orderController.orders_get_all);

router.post('/',checkAuth, orderController.order_create);


router.get('/:id',checkAuth, orderController.order_get);

router.delete('/:id',checkAuth,orderController.order_delete);
module.exports = router;