const express = require("express");
const {
  createSessionController,
  messageController,
} = require("../controllers/chatController");

const router = express.Router();

router.post("/session", createSessionController);
router.post("/message", messageController);

module.exports = router;
