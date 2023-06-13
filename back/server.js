const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();
app.use(bodyParser.json());
app.use(cors());



const Users = new mongoose.model('User', new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
}));
//VERIFY JWT token
const verifyJWT = async(req,res,next)=>{
    const token = req.headers['x-access-token'];
    if (!token) {
        res.send({message: 'you may need token to get here!'});
    }
    else{
       jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
            if (err) {
                res.send({auth:false,message: 'authentication failed!'})
            }
            else{
                req.userId = decoded.id;
                next();
            }
       })
    }
}

//register - sign up
app.post('/api/register',async(req,res)=>{
    const{password,email} = req.body;
    const existedEmail = await Users.findOne({email: email});
    if (existedEmail) {
        res.send({
            auth: false,
            message: 'email already used!'
        })
        return;
    }
    const salt = await bcrypt.genSalt(10); //500ms
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await Users({
        email: email,
        password: hashedPassword,
    })
    await newUser.save();
    res.send({
        auth: true,
        data: newUser,
        message: 'user signed up successfully!',
    })
});

// login - sign in
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const existedEmail = await Users.findOne({ email: email });
  if (!existedEmail) {
    res.send({ success: false, message: 'email not found!' });
  } else {
    const isValid = await bcrypt.compare(password, existedEmail.password);
    if (!isValid) {
      res.send({ success: false, message: 'password is incorrect!' });
    } else {
      const id = existedEmail._id;
      const token = jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: '1d',
      });
      res.send({
        success: true,
        user: {
          id: existedEmail._id,
          email: existedEmail.email,
          password: existedEmail.password,
        },
        token: token,
        message: 'user logged in successfully!',
      });
    }
  }
});

//get users
app.get('/api/users',verifyJWT,async(req,res)=>{
    const users = await Users.find();

    res.json({
        data: users,
        message: 'data get successfully!'
    })
})
//logut
app.post('/api/logout',(req,res)=>{
    const{token} = req.headers['x-access-token'];
    jwt.destroy(token);
})

app.listen(process.env.PORT,()=>{
    console.log(`App listening on PORT:${process.env.PORT}`);
})
mongoose.connect(process.env.DB_KEY).then(()=>{
    console.log('Mongo DB connected!');
}).catch((err)=>{
    console.log(err);
})
