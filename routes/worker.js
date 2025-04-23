

const express = require('express');
const router = express.Router();
const workerController = require('../controllers/worker');
const auth = require('../middleware/auth'); // Must be at the top

router.get('/login', workerController.workerLoginPage);
router.post('/login', workerController.workerLogin);
router.get('/register', workerController.workerRegisterPage);
router.post('/register', workerController.workerRegister);
router.get('/home', auth('worker'), workerController.getWorkerHome);
// router.get('/home', sessionAuth, workerController.getWorkerHome);
router.get('/task/:taskID/view', auth('worker'), workerController.getWorkerTaskView);
router.get('/profile', auth('worker'), workerController.getWorkerProfile);
router.post('/update', auth('worker'), workerController.updateWorkerProfile);
router.get('/logout', workerController.workerLogout);
router.post('/task/:taskID/apply', auth('worker'), workerController.applyForTask);

module.exports = router;

