const mongoose  = require('mongoose');
const UserCREATE = require('../models/userfunctionSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usercreate = (req,res,next) =>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({
                error:err
            })
        }
        else{
            const userCREATE = new UserCREATE({
                  firstname:req.body.firstname,
                 lastname:req.body.lastname,
                 gender:req.body.gender,
                 email:req.body.email,
                 phone:req.body.phone,
                 password:hash
            })
            userCREATE.save()
            .then(result =>{
               // console.log(result)
                res.status(200).json({
                    newUserCREATE: result
                })
             })
        
             .catch(err => {
               // console.log(err);
                res.status(500).json({
                    error:err
                })
             })
        }
    })
}


const Updateuserinfo = async (req, res) => {
 const name = req.body.name; 
 const user = await User.findOne({ _id: req.id });
  user.name = name || user.name;
   user.save() 
   .then((data) => {
     res.json({
     message: "user is updated",
     updatedUser: data,
    });
   })
    .catch((err) => {
      res.json({
         message: err.message,
         });
         });
    };

const key = process.env.KEY;

const Userlogin = (req,res,next) =>{
    UserCREATE.find({email:req.body.email})
    .exec()
    .then(userlogin =>{
        if(userlogin < 1){
            return res.status(401).json({
                msg: "USER NOT FOUND"
            })
        }
        bcrypt.compare(req.body.password,userlogin[0].password,(err,result) =>{
            if(!result){
                return res.status(401).json({
                    msg: "password not matched"
                })
            }
            if(result){
               const token = jwt.sign({
                userid:userlogin[0]._id,
                firstname:userlogin[0].firstname,
                lastname:userlogin[0].lastname,
                gender:userlogin[0].gender,
                email:userlogin[0].email,
                phone:userlogin[0].phone,
               
             },
             key,
             {
                expiresIn:"96h"
             }
             );
             res.status(200).json({
                firstname:userlogin[0].firstname,
                lastname:userlogin[0].lastname,
                gender:userlogin[0].gender,
                email:userlogin[0].email,
                phone:userlogin[0].phone,
                token: token
             })
            }
        })
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        })
    })
}

module.exports = {usercreate,Userlogin, Updateuserinfo};