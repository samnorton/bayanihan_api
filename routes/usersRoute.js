const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");
const { checkToken } = require("../middlewares/authMiddleware");
const { check } = require("express-validator");

const validate = [
  check("first_name")
    .isLength({ min: 2, max: 20 })
    .withMessage("First name should be between 2 to 20 characters"),
  check("last_name")
    .isLength({ min: 2, max: 20 })
    .withMessage("Last name should be between 2 to 20 characters"),
  check("contact_number")
    .isLength({ min: 11, max: 12 })
    .withMessage("Contact number should be between 11 to 12 digits"),
  check("email").isEmail().withMessage("Email should be a valid email"),
  check("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password should be between 8 to 20 characters"),
];

router.get("/", checkToken, getAllUsers);
router.get("/:id", checkToken, getUserById);
router.post("/", checkToken, validate, registerUser);
router.post("/login", loginUser);
router.patch("/:id", checkToken, validate, updateUser);
router.delete("/:id", checkToken, deleteUser);

module.exports = router;
