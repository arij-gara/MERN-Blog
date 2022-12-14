const router =  require('express').Router()
const User = require('../models/user')

const Post = require("../models/post")


//CREATE POST

router.post('/', async (req,res) =>{
    const newpost =  new Post(req.body)
  try{
    const savedpost = await newpost.save()
    res.status(200).json(savedpost)

} catch(err) {
    res.status(500).json(err)
}}

);




//UPDATE POST
router.put('/:id', async (req,res) =>{
    try{
        const post = await Post.findById(req.params.id)

       if(post.username === req.body.username){
        try{

            const updatedpost = await Post.findByIdAndUpdate( req.params.id,{
                $set: req.body,
            },
            
                {new:true}
            )
            return ( res.status(200).json(updatedpost))
        }catch(err){
            res.status(500).json(err)
        }
       

       }else{
        res.status(401).json('you can update only your post')
       }

    } catch(err){
        res.status(500).json(err)
    }
});
// DELETE POST
router.delete('/:id', async (req,res) =>{
    try{
        const post = await Post.findById(req.params.id)

       if(post.username === req.body.username){
        try{
            await post.delete()
            return ( res.status(200).json('post has been deleteted...'))
        }catch(err){
            res.status(500).json(err)
        }
       

       }else{
        res.status(401).json('you can delete only your post')
       }

    } catch(err){
        res.status(500).json(err)
    }
});

// GET Post
router.get('/:id', async (req,res)=>{
    try{
        const post =  await Post.findById(req.params.id)
        
        return(res.status(200).json(post))

    }catch(err){
     return(res.status(500).json(err))
    }
})

//GET ALL POSTS

router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let posts;
      if (username) {
        posts = await Post.find({ username });
      } else if (catName) {
        posts = await Post.find({
          categories: {
            $in: [catName],
          },
        });
      } else {
        posts = await Post.find();
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
 

module.exports =router