// const express = require('express');
// const User = require('../models/userModel');
// const router = express.Router();

// router.post('/', async (req, res) => {
//   const user = new User(req.body);
//   await user.save();
//   res.status(201).send(user);
// });

// router.get('/:id', async (req, res) => {
//   const user = await User.findById(req.params.id);
//   res.status(200).send(user);
// });

// module.exports = router;

const express = require("express");
const { register, login, resetPassword, getProfile, updateProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/reset-password", resetPassword);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;

