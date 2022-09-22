const User = require('../models/user');
const {errorHandler}  = require('../helpers/dbErrorHandler')
const _ = require("lodash");

exports.create = (req, res ) => {

    console.log(req.body);

   const user = new User(req.body)
   user.save((err, data) => {
       if(err) {
           return res.status(400).json({
               error: errorHandler(err)
           })
       }
       res.json(data);
   })
};

exports.userById = (req, res , next , id) => {

    User.findById(id).exec((err , user) => {
        if(err || !user) {
            return res.status(400).json({
                error : 'user does not exist !'
            })

        }
        req.user = user;
        next();
    })
};
exports.read = (req , res ) => {
    return res.json(req.user)
}
exports.update = (req, res ) => {

    const user = req.user
    user.name = req.body.name
    user.email = req.body.email
    user.password = req.body.password
    
    user.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data);
    })
 };
 exports.remove = (req, res ) => {
    const user = req.user
    console.log(user);
    user.remove((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
           id : data._id
    });
    })
 };
 exports.list = (req, res ) => {

    User.find().exec((err , data ) => {
        
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data);
        

    })
  
    
 };