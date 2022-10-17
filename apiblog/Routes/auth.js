const router =  require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt');
const  mongoose  = require('mongoose');


//REGISTER
router.post('/register', async (req,res)=>{
    try{

        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(req.body.password,salt)
        const newuser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashpassword
        })
       const user = await newuser.save()
       return(res.status(200).json(user))
    } catch(err){
        res.status(500).json(err)
    }

})
//LOGIN
// router.post('/login', async (req,res)=>{
//     try{
//     const user = await User.findOne({username:req.body.username});
//     if( !user) {return (res.status(400).json('wrong credentials'))}
                

  
//     const validate = await bcrypt.compare(req.body.password, user.password);
//      if (!validate) {return  ( res.status(400).json('wrong password'))}
//         mongoose.disconnect()
    
//     const { password,  ...others} =user._doc
//     return ( res.status(200).json(others))
//     }catch(err){
//         res.status(500).json(err)

//       }
// })
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
     if( !user)  {return(res.status(400).json("Wrong credentials!"))};
  
      const validate = await bcrypt.compare(req.body.password, user.password);
      if(!validate) { return ( res.status(400).json("Wrong credentials!"))};
  
      const { password, ...others } = user._doc;
       return(res.status(200).json(others));
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports =router