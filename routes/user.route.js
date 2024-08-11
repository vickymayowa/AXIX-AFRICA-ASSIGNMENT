const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");

router.post("/register", userController.registerUser);
router.get("/", userController.getAllUsers);
router.put("/:id", userController.editUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
