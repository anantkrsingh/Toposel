const { loginUser, registerUser ,searchUser} = require("../controllers/auth");

const express = require("express");
const { validateLogin ,validateRegister, requireSignIn,isRequestValidated} = require("../middlewares");

const authRoute = express.Router();

authRoute.post("/login", validateLogin, isRequestValidated, loginUser);
authRoute.post("/register", validateRegister, isRequestValidated, registerUser);
authRoute.get("/search", requireSignIn, searchUser);

module.exports =  authRoute;
