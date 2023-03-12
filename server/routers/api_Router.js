const Router                    = require('express');
const router                    = new Router();

const Api_Customers    = require('../controllers/api_Customers')
const Api_Users    = require('../controllers/api_Users')

//customers
router.get('/customers/customers', Api_Customers.getEntrys);  
router.get('/customers/customer',  Api_Customers.getEntry);  
router.post('/customers/customer_add',  Api_Customers.addEntry);
router.post('/customers/customer_update',  Api_Customers.updateEntry);
router.post('/customers/customer_delete',  Api_Customers.deleteEntry);

//users
router.get('/users/users', Api_Users.getEntrys);  
router.get('/users/user',  Api_Users.getEntry);  
router.post('/users/user_add',  Api_Users.addEntry);
router.post('/users/user_update',  Api_Users.updateEntry);
router.post('/users/user_delete',  Api_Users.deleteEntry);


module.exports = router