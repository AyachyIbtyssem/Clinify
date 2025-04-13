const notificationRepo = require('../repositories/notification.repository');

const getAllNotifications = async () => await notificationRepo.findAllNotifications();

const getNotificationById = async (id) => {
  const notif = await notificationRepo.findNotificationById(id);
  if (!notif) throw new Error('Notification not found');
  return notif;
};

const addNotification = async (data) => await notificationRepo.createNotification(data);

const updateNotification = async (id, data) => {
  const updated = await notificationRepo.updateNotificationById(id, data);
  if (updated[0] === 0) throw new Error('Notification not found');
  return updated;
};

const deleteNotification = async (id) => {
  const deleted = await notificationRepo.deleteNotificationById(id);
  if (!deleted) throw new Error('Notification not found');
  return deleted;
};

const getNotificationsByPatientId = async (patientId) => {
    return await notificationRepo.findNotificationsByPatientId(patientId);
  };

module.exports = {
  getAllNotifications,
  getNotificationById,
  addNotification,
  updateNotification,
  deleteNotification,
  getNotificationsByPatientId,
};
