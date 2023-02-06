const { default: mongoose } = require('mongoose');

const PostUser =require('../models/postSchema')


const getPost = (req,res,next) => {
    PostUser.find()
    .then(result => {
        res.status(200).json({
            userData : result
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
}

const Createpost = (req,res,next) => {
    const user = new PostUser({
        userid: req.userid,
        Title: req.body.Title,
        description: req.body.description,
       })
    user.save()
    .then(result =>{
        console.log(result)
        res.status(200).json({
            newPostUser: result
        })
     })

     .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
     })
}

const deletePost = (req,res,next)=>{
    PostUser.remove({_id:req.params.id})
    .then(result =>{
        res.status(200).json({
            message:'message deleted',
            result:result
        })
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        })
    })
}

const updatePost = (req,res,next) =>{
    const userupdatebyid =mongoose.Types.ObjectId( req.params._id);
    console.log(userupdatebyid);
     PostUser.findOneAndUpdate({_id:req.params.id},{
    $set:{
      Title : req.body.Title,
      description: req.body.description  
    }
    })
    .then(result=>{
      res.status(200).json({
          updated:result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
          error:err
      })
    })
  }


module.exports = {getPost,Createpost, deletePost, updatePost};