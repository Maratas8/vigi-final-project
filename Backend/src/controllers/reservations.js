const express = require('express');
const Joi = require('joi');
const reservationsEntity = require('../models/reservations');
const { isLoggedIn } = require('../middleware');

const router = express.Router();

const reservationSchema = Joi.object({
  roomId: Joi.number().integer().required(),
  reservedFrom: Joi.date().required(),
  reservedTo: Joi.date().required(),
  comment: Joi.string().trim(),
});

const handleReserveRoom = async (req, res) => {
  let reservationData = req.body;
  const userId = req.user.id;

  try {
    reservationData = await reservationSchema.validateAsync(reservationData);
  } catch (error) {
    return res.status(400).send(error);
  }

  try {
    const {
      roomId, reservedFrom, reservedTo, comment,
    } = reservationData;
    const data = await reservationsEntity
      .addReservation(userId, roomId, reservedFrom, reservedTo, comment);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

const handleShowReservations = async (req, res) => {
  try {
    const data = await reservationsEntity.getReservations();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

router.post('/reservations', isLoggedIn, handleReserveRoom);
router.get('/reservations', handleShowReservations);

module.exports = router;
