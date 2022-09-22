const express = require('express')
const router = express.Router()

const {
    create, userById , read , update , remove , list
}= require('../controllers/user');

const todo = require('../models/user');

router.get('/user/:userId', read)

router.post('/user/create',

 create);

 router.put('/user/update/:userId',

 update);

 
 router.delete('/user/:userId',

 remove);
 router.get('/users', list)

 router.param('userId', userById);



module.exports= router;