const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const addRoom = async (name, size, floorNumber, seats, hasProjector, hasTv) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [result] = await con.execute('INSERT INTO rooms (name, size, floor_number, seats, has_projector, has_tv) VALUES (?, ?, ?, ?, ?, ?)', [name, size, floorNumber, seats, hasProjector, hasTv]);
    await con.end();
    return result;
  } catch (error) {
    return error;
  }
};

const getRooms = async () => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [result] = await con.execute('SELECT * FROM rooms');
    await con.end();
    return result;
  } catch (error) {
    return error;
  }
};

const getRoomById = async (roomId) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [result] = await con.execute('SELECT * FROM rooms WHERE id = ?', [roomId]);
    await con.end();
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  addRoom,
  getRooms,
  getRoomById,
};
