const router =  require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const Post = require("../models/post")


//UPDATE

router.put('/update/:id', async (req,res) =>{
    if(req.body.userid === req.params.id){
        if(req.body.password) {

        const salt = await bcrypt.genSalt(10)
        req.body.password= await bcrypt.hash(req.body.password,salt)
        }
try{
const updateuser = await User.findByIdAndUpdate(req.params.id,{
    $set: req.body,
},
{new :true}
)
return (res.status(200).json(updateuser))
} catch(err) {
    res.status(500).json(err)
}}
else{
    res.status(401).json("you are only allowed  to update yoour account !")
}
});

//DELETE
router.delete('/delete/:id', async (req,res) =>{
    if(req.body.userid === req.params.id){
        try{
            const user =await User.findById(req.params.id)
try{
    await Post.deleteMany({username:user.username})
   await User.findByIdAndDelete(req.params.id)
   return(res.status(200).json("user has been deleted"))

} catch(err) {
    res.status(500).json(err)
}}
     catch(err){
        return(res.status(404).json('user not found'))
   
    }
}else{
    res.status(401).json("you are only allowed  to delete yoour account !")
}
});

// GET ONE USER 
router.get('/:id', async (req,res)=>{
    try{
        const user =  await User.findById(req.params.id)
        const { password , ...others}= user._doc
        return(res.status(200).json(others))

    }catch(err){
     return(res.status(500).json(err))
    }
})

module.exports =router