const express = require('express');
const router = express.Router();
const {DB_CONNECTION,DATABASE1,DATABASE2}=process.env
const mongodb=require('mongodb');
const multer = require('multer');
const courses=require('./Database/Courses')
const userschema=require('./Database/Usesrs')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const client = new mongodb.MongoClient(DB_CONNECTION);
const proplus = client.db(DATABASE1);
const storage90 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload90 = multer({ storage: storage90 });

router.post('/courses',async(req,res)=>{
  const courses=proplus.collection('courses')
  const category=proplus.collection('mastercategory')
  const result=await courses.find({status:1}).toArray()
  const result2=await category.find().toArray()
  let categorys=[]
       result2.map(item=>categorys.push([item.category,item.category_id]))
       console.log(categorys)
  res.json([result,categorys])
})
router.post("/images", upload90.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const filePath = req.file.path;
  const originalName = req.file.originalname;
  res.status(200).json({
      message: "File uploaded successfully",
      filePath: filePath,
      originalName: originalName,
    });
});
 
router.post('/publish', async (req, res) => {
  try {
      console.log(req.body);

       const { title, description, category_id, faq, image } = req.body.data;

       const courses = proplus.collection('courses');

       const courseList = await courses.find({ status: 1 }).sort({ course_id: -1 }).toArray();
      

       const newCourse = {
          title,
          course_id: courseList[0]?courseList[0].course_id+1:1,
          description,
          category_id,
          faq,
          image,
          status: 1  
      };

       await courses.insertOne(newCourse);

       res.status(201).json({ message: 'Course published successfully'});
  } catch (error) {
      console.error("Error ", error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

 router.post('/register', async(req, res) => {
  const { username, password,email } = req.body;
  console.log(req.body)
  const hashedPassword = bcrypt.hashSync(password, 8);
  
  
  const newCourse = {
    name: username,
    email: email,
    password: hashedPassword,    
    social_auth_provider: '',
    social_auth_id: '',
    jwt_access_token: String,
    jwt_refresh_token: String,
    devices: '',  
};

 await new userschema(newCourse).save();
  res.status(201).send({ message: 'User registered successfully!' });
});

 router.post('/login',async(req, res) => {
  const { username, password } = req.body;
  console.log(username)
   const userscol=proplus.collection('users');
  const user =await userscol.findOne({name:username})
  console.log(user)
  if (!user) return res.status(404).send('User not found.');

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

  const token = jwt.sign({ id: user.username }, 'your_secret_key', { expiresIn: 86400 }); 

  res.status(200).send({ auth: true, token });
});

router.post('/coursesdelete',async(req, res) => {
  console.log(req.body)
 const {course_id}=req.body
  const userscol=proplus.collection('courses');
  const user =await userscol.findOneAndDelete({course_id:course_id})
  if(user){
    res.json("success")
  }else{
    res.json("failed")
  }
})


//  function verifyToken(req, res, next) {
//   const token = req.headers['x-access-token'];
//   if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

//   jwt.verify(token, 'your_secret_key', (err, decoded) => {
//     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate.' });

//     req.userId = decoded.id;
//     next();
//   });
// }


module.exports = router;
