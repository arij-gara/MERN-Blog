const  express = require('express')
const dotenv = require('dotenv')
const multer = require('multer')
const app = express()
const mongoose = require ('mongoose')
const authroute =require('./Routes/auth')
const userroute = require('./Routes/userroute')
const postroute = require('./Routes/postroute')
const categoryroute = require('./Routes/categoryroute')
const path =require('path')

var cors = require('cors');
app.use(cors());

dotenv.config()
app.use('/images', express.static(path.join(__dirname, '/images')));
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then( console.log('connected to mongodb'))
.catch((err)=>console.log(err))

//MULTER
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  const upload = multer({ storage: storage });

  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("file has been uploaded");
  });
  



app.use('/api/category',categoryroute)
app.use('/api/posts',postroute)
app.use('/api/users',userroute)
app.use('/api/auth',authroute)
app.use('/', (req,res)=>{
console.log('this is main url')
})

app.listen("5000", ()=> {
    console.log("backend is running")
})