// const express = require('express');
// const router = express.Router();
// const adminController = require('../controllers/admin');
// const auth = require('../middleware/auth');

// // Public Routes
// router.get('/login', adminController.adminLoginPage);      // Line 7
// router.post('/login', adminController.adminLogin);         // Line 8
// router.get('/dashboard', auth('admin'), adminController.getAdminDashboard); // Line 9
// router.get('/workers', auth('admin'), adminController.getAdminWorkers);
// router.get('/clients', auth('admin'), adminController.getAdminClients);
// router.get('/verify-workers', auth('admin'), adminController.getVerifyWorkers);
// router.post('/verify-workers/:id', auth('admin'), adminController.verifyWorker);
// router.get('/categories', auth('admin'), adminController.getAdminCategories);
// router.post('/categories', auth('admin'), adminController.addCategory);
// router.get('/pairing', auth('admin'), adminController.getAdminPairing);
// router.get('/logout', adminController.adminLogout);

// module.exports = router;

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const auth = require('../middleware/auth'); 


router.get('/login', adminController.adminLoginPage);
router.post('/login', adminController.adminLogin);
router.get('/dashboard', auth('admin'), adminController.getAdminDashboard);
router.get('/workers', auth('admin'), adminController.getAdminWorkers);
router.get('/worker/:id', auth('admin'), adminController.getWorkerDetails);
router.get('/clients', auth('admin'), adminController.getAdminClients);
router.post('/worker/:id/verify', auth('admin'), adminController.updateWorkerVerification);
router.get('/logout', adminController.adminLogout);
router.get('/pairing', auth('admin'), adminController.getAllTasks);
router.post('/worker/:workerID/delete', auth('admin'), adminController.deleteWorker);
router.get('/delete-task/:id', auth('admin'), adminController.deleteTask);
router.get('/delete-client/:id', auth('admin'), adminController.deleteClient);
router.get('/client/:id/tasks', auth('admin'), adminController.getClientTasks);
router.post('/delete-task/:id', auth('admin'), adminController.deleteTask); // Route to delete a task
// router.post('/categories/:categoryId/services', auth('admin'), adminController.addServiceToCategory);
// router.get('/categories', auth('admin'), adminController.getAdminCategories);
// router.post('/categories', auth('admin'), adminController.addCategory);

module.exports = router;