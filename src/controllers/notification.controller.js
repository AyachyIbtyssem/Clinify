const notifService = require('../services/notification.service');

const getNotifications = async (req, res) => {
  try {
    const result = await notifService.getAllNotifications();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getNotification = async (req, res) => {
  try {
    const notif = await notifService.getNotificationById(req.params.id);
    res.json(notif);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const createNotification = async (req, res) => {
  try {
    const newNotif = await notifService.addNotification(req.body);
    res.status(201).json(newNotif);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateNotification = async (req, res) => {
  try {
    const updated = await notifService.updateNotification(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const deleteNotification = async (req, res) => {
  try {
    await notifService.deleteNotification(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getNotificationsByPatientId = async (req, res) => {
    try {
      const result = await notifService.getNotificationsByPatientId(req.params.patientId);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
module.exports = {
  getNotifications,
  getNotification,
  createNotification,
  updateNotification,
  deleteNotification,
  getNotificationsByPatientId,
};

