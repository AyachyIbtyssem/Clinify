const express = require('express');
const router = express.Router();
const controller = require('../controllers/notification.controller');

router.get('/', controller.getNotifications);
router.get('/patient/:patientId', controller.getNotificationsByPatientId);
router.get('/:id', controller.getNotification);
router.post('/', controller.createNotification);
router.put('/:id', controller.updateNotification);
router.delete('/:id', controller.deleteNotification);


module.exports = router;
