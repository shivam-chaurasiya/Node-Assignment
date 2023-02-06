const express = require('express');
const router1 = express.Router();
const checkauth = require('../middleware/usermid');

const {usercreate,
       Userlogin, Updateuserinfo} = require('../controllers/userfunctioncontroller');

router1.post('/create',  usercreate);

router1.post('/login',Userlogin);

router1.put('/updateuser' ,checkauth, Updateuserinfo)

module.exports = router1;