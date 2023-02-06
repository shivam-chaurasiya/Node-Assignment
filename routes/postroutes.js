const express = require('express');
const {getPost, Createpost, deletePost , updatePost} = require('../controllers/postcontroller');
const router = express.Router();

const checkauth = require('../middleware/usermid');

router.get('/', checkauth, getPost);



router.post('/',checkauth, Createpost);
 
router.delete('/:id',checkauth, deletePost);

router.put('/:id' , checkauth, updatePost);



module.exports = router;