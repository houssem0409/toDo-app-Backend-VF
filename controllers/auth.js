const User = require('../models/user');
const jwt = require('jsonwebtoken'); //to generate signed token
const expressJwt = require('express-jwt'); // for authorization check
const { hashSync, compare, compareSync } = require('bcrypt')
const moment = require('moment')

const { errorHandler } = require('../helpers/dbErrorHandler')

exports.signup = (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashSync(req.body.password, 10),
    })
    user
      .save()
      .then((user) => {
        res.send({
          success: true,
          message: 'user created successfuly ',
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
        })
      })
      .catch((err) => {
        res.send({
          success: false,
          message: 'Some think went wrong ! ',
          error: err,
        })
      })
  }
  

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            return res.status(401).send({
                success: false,
                message: 'Could Not Find This User ! ',
            })
        }
        if (!compareSync(req.body.password, user.password)) {
            return res.status(401).send({
                success: false,
                message: 'Incoorect Password  ! ',
            })
        }
        const payload = {
            name: user.name,
            email: user.email,
            id: user._id,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '90m' })
        return res.status(200).send({
            success: true,
            id: user._id,
            name: user.name,
            email: user.email,
            message: 'Logged in Successfuly !  ',
            token: 'Bearer ' + token,
            expireIn: moment().add(90, 'minutes').format('hh:mm:ss A'),
        })
    })
}
exports.signout = (req, res) => {
    res.clearCookie("t");
    res.json({ message: "Signout Success" })
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if (!user) {
        return res.status(403).json({
            error: "Access denied"
        });
    }
    next();
}

