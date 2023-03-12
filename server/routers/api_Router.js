const Router                    = require('express');
const router                    = new Router();

const Api_Customers    = require('../controllers/api_Customers')

//customers
router.get('/customers/customers', Api_Customers.getEntrys);  
router.get('/customers/customer',  Api_Customers.getEntry);  
router.post('/customers/customer_add',  Api_Customers.addEntry);
router.post('/customers/customer_update',  Api_Customers.updateEntry);
router.post('/customers/customer_delete',  Api_Customers.deleteEntry);


module.exports = router