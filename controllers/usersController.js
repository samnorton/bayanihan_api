const { validationResult } = require("express-validator");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const usersQuery = require("../dbqueries/usersQuery");

exports.getAllUsers = async (req, res) => {
  try {
    let users = await usersQuery.getAllUsers();
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500);
  }
};

exports.getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    let user = await usersQuery.getUserById(id);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found!",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500);
  }
};

exports.registerUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }

  const {
    first_name,
    last_name,
    avatar_img,
    address,
    contact_number,
    email,
    password,
  } = req.body;
  try {
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    let user = await usersQuery.registerUser(
      first_name,
      last_name,
      avatar_img,
      address,
      contact_number,
      email,
      hashedPassword
    );

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "User registration failed! Database connection error!",
    });
  }
};

exports.updateUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }

  const {
    first_name,
    last_name,
    avatar_img,
    address,
    contact_number,
    email,
    password,
  } = req.body;
  const id = req.params.id;
  try {
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    let user = await usersQuery.updateUser(
      first_name,
      last_name,
      avatar_img,
      address,
      contact_number,
      email,
      hashedPassword,
      id
    );

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User updated failed! Database connection error!",
    });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    let findUser = await usersQuery.getUserById(id);

    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    let user = await usersQuery.deleteUser(id);

    return res.json({
      success: true,
      message: "User was successfully deleted!",
      data: user,
    });
  } catch (error) {
    return res.status(500);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await usersQuery.getUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password!",
      });
    }

    const foundUser = compareSync(password, user.password);

    if (foundUser) {
      user.password = undefined;
      const jsontoken = sign({ foundUser: user.password }, "qwe1234", {
        expiresIn: "1h",
      });
      return res.json({
        success: 1,
        message: "Login was successful!",
        token: jsontoken,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password!",
      });
    }
  } catch (error) {
    return res.status(500);
  }
};
