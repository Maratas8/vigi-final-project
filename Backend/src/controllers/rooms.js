const express = require('express');
const Joi = require('joi');
const roomsEntity = require('../models/rooms');
const { isLoggedIn } = require('../middleware');

const router = express.Router();

const roomSchema = Joi.object({
  name: Joi.string().trim(),
  size: Joi.number().integer().required(),
  floorNumber: Joi.string().required(),
  seats: Joi.number().integer().required(),
  hasProjector: Joi.boolean().required(),
  hasTv: Joi.boolean().required(),
});

const handleCreateRoom = async (req, res) => {
  let roomData = req.body;

  try {
    roomData = await roomSchema.validateAsync(roomData);
  } catch (error) {
    return res.status(400).send(error);
  }

  try {
    const {
      name, size, floorNumber, seats, hasProjector, hasTv,
    } = roomData;
    const data = await roomsEntity.addRoom(name, size, floorNumber, seats, hasProjector, hasTv);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

const handleShowRooms = async (req, res) => {
  try {
    const data = await roomsEntity.getRooms();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

const handleShowRoomById = async (req, res) => {
  try {
    const { roomId } = req.params;
    const data = await roomsEntity.getRoomById(roomId);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

router.post('/rooms', isLoggedIn, handleCreateRoom);
router.get('/rooms', handleShowRooms);
router.get('/rooms/:roomId', isLoggedIn, handleShowRoomById);

module.exports = router;
