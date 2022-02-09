const express = require('express');
const Joi = require('joi');
const authEntity = require('../models/auth');

const router = express.Router();

const userSchema = Joi.object({
  fullName: Joi.string().trim(),
  email: Joi.string().email().trim().lowercase()
    .required(),
  password: Joi.string().required(),
});

const handleRegisterUser = async (req, res) => {
  let userData = req.body;
  try {
    userData = await userSchema.validateAsync(userData);
  } catch (error) {
    return res.status(400).send(error);
  }

  try {
    const { fullName, email, password } = userData;
    const data = await authEntity.registerUser(fullName, email, password);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

const handleLoginUser = async (req, res) => {
  let userData = req.body;

  try {
    userData = await userSchema.validateAsync(userData);
  } catch (error) {
    return res.status(400).send(error);
  }

  try {
    const { email, password } = userData;
    const token = await authEntity.loginUser(email, password);
    return res.send({ message: 'Succsessfully logged in', token });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

router.post('/register', handleRegisterUser);
router.post('/login', handleLoginUser);

module.exports = router;
