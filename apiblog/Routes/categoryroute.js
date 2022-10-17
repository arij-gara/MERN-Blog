const router =  require('express').Router()
const Category = require('../models/category')


router.post('/', async (req,res)=>{
    const newcategory = await new Category(req.body)
    try{
      const savedcategory = await newcategory.save()
      return(res.status(200).json(savedcategory))
    }catch(err){
        res.status(500).json(err)
    }
})
//GET ALL CATEGORIES

router.get('/', async (req,res)=>{
 
    try{
        const categories = await Category.find()
      return(res.status(200).json(categories))
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports =router