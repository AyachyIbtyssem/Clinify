const Notification = require('../models/notification.model');

const findAllNotifications = () => Notification.findAll();

const findNotificationById = (id) => Notification.findByPk(id);

const createNotification = (data) => Notification.create(data);

const updateNotificationById = (id, data) => Notification.update(data, { where: { id } });

const deleteNotificationById = (id) => Notification.destroy({ where: { id } });
const findNotificationsByPatientId = (patientId) => 
    Notification.findAll({ where: { patientId } });

module.exports = {
  findAllNotifications,
  findNotificationById,
  createNotification,
  updateNotificationById,
  deleteNotificationById,
  findNotificationsByPatientId,
};
