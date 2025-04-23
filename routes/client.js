// const express = require('express');
// const router = express.Router();
// const clientController = require('../controllers/client');
// const auth = require('../middleware/auth');

// // Public Routes
// router.get('/login', clientController.clientLoginPage);      // Line 7
// router.post('/login', clientController.clientLogin);         // Line 8
// router.get('/register', clientController.clientRegisterPage); // Line 9
// router.post('/register', clientController.clientRegister);    // Line 10

// // Protected Routes (require client authentication)
// router.get('/home', auth('client'), clientController.getClientHome);          // Likely Line 10 if error persists
// router.get('/profile', auth('client'), clientController.getClientProfile);
// router.post('/profile', auth('client'), clientController.updateClientProfile);
// router.get('/task', auth('client'), clientController.getClientTasks);
// router.post('/task', auth('client'), clientController.createTask);
// router.get('/task/:taskID', auth('client'), clientController.getTaskDetails);
// router.post('/task/:taskID/assign', auth('client'), clientController.assignTask);
// router.get('/notification', auth('client'), clientController.getClientNotifications);

// // Logout
// router.get('/logout', clientController.clientLogout);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const clientController = require('../controllers/client');
// const auth = require('../middleware/auth'); // Must be at the top

// router.get('/login', clientController.clientLoginPage);
// router.post('/login', clientController.clientLogin);
// router.get('/register', clientController.clientRegisterPage);
// router.post('/register', clientController.clientRegister);
// router.get('/home', auth('client'), clientController.getClientHome);
// router.get('/profile', auth('client'), clientController.getClientProfile);
// router.post('/update', auth('client'), clientController.updateClientProfile);
// router.get('/posttask', auth('client'), clientController.getPostTask);
// router.post('/posttask', auth('client'), clientController.postTask);
// router.get('/myrequests', auth('client'), clientController.getClientRequests);
// router.get('/notification', auth('client'), clientController.getClientNotifications);
// router.get('/logout', clientController.clientLogout);

// module.exports = router;

const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client');
const auth = require('../middleware/auth');

router.get('/login', clientController.clientLoginPage);
router.post('/login', clientController.clientLogin);
router.get('/register', clientController.clientRegisterPage);
router.post('/register', clientController.clientRegister);
router.get('/home', auth('client'), clientController.getClientHome);
router.get('/myrequests', auth('client'), clientController.getClientRequests);
router.post('/task/:taskId/complete', auth('client'), clientController.markTaskAsCompleted);
router.get('/profile', auth('client'), clientController.getClientProfile);
router.post('/update', auth('client'), clientController.updateClientProfile);
router.get('/post-task', auth('client'), clientController.getPostTask);
router.post('/post-task', auth('client'), clientController.postTask);
router.get('/task/:taskId', auth('client'), clientController.getTaskDetails);
router.get('/logout', clientController.clientLogout);
//router.get('/category/:id/services', auth('client'), clientController.getCategoryServices);
router.get('/task/:taskId/interested', auth('client'), clientController.viewInterestedWorkers);

module.exports = router;