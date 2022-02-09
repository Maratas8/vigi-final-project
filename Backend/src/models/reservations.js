const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const addReservation = async (userId, roomId, reservedFrom, reservedTo, comment) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [result] = await con.execute('INSERT INTO room_reservations (user_id, room_id, reserved_from, reserved_to, comment) VALUES (?, ?, ?, ?, ?)', [userId, roomId, reservedFrom, reservedTo, comment]);
    await con.end();
    return result;
  } catch (error) {
    return error;
  }
};

const getReservations = async () => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [result] = await con.execute('SELECT room_reservations.*, users.fullname, rooms.name, rooms.size, rooms.floor_number, rooms.seats, rooms.has_projector, rooms.has_tv FROM room_reservations JOIN users ON room_reservations.user_id = users.id JOIN rooms ON room_reservations.room_id = rooms.id ORDER BY room_reservations.reserved_to DESC');
    await con.end();
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  addReservation,
  getReservations,
};
