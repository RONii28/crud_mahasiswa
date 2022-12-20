require("dotenv").config();
const loginSchema = require("../validation/login.schema");
const bcrypt = require("bcrypt");
const db = require("../../databases");
const jwt = require("jsonwebtoken");

// error
const { Api400Error, Api401Error, Api403Error, Api404Error, Api422Error} = require("../middlewares/errors/ApiErrors");

module.exports = class authController {
  static async login(req, res, next) {
    try {
    // validate input from body
    const {error, value} = loginSchema.validate(req.body);
    if (error) {
      throw new Api422Error("validation error", error.details);
    }

    // checking username dan password by authentication
    const mahasiswa = await db("mahasiswa")
        .where({nim: value.nim})
        .first()
        .catch(error => {
          throw new Api400Error(error.message);
        });

    if (!mahasiswa) {
        throw new Api401Error("nim not registered");
    } else if (!bcrypt.compareSync(value.password, mahasiswa.password)) {
        throw new Api401Error("wrong password");
    }

    // generate token
    const token = jwt.sign({
        id: mahasiswa.id,
        nim: mahasiswa.nim,
        password: mahasiswa.password
    }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_TIME_EXPIRED
  
    });

    return res.json({
      success: true,
      message: "mahasiswa successfully logged in",
      token
    })

    } catch (error) {
      next (error);
    }
  }
}
