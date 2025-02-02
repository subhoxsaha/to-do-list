require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// ......................................//

const User = require("./models/User.model");
const TodoModel = require("./models/Data.model");

mongoose.connect(`${process.env.DB_URL}`)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Connection Error:", err));;
const saltRounds = 10;

//........................................//

app.use(cookieParser());
app.use(
  cors({
    //https://to-do-list-15y6.vercel.app
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
//......................................//

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      try {
        const newUser = await User.create({
        name,
        email,
        password: hash,
      });
      res.json(newUser);
      } catch (error) {
        res.json(error)
      }
      

    });
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    res.json(false);
  } else {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        jwt.sign(
          { email, id: user._id },
          process.env.SECRET,
          {},
          (err, token) => {
            res.cookie("token", token);
            res.json(true);
          }
        );
      } else {
        res.json(false);
      }
    });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.SECRET, {}, (err, info) => {
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("logout successfully");
});

app.post("/add", async (req, res) => {
  const {userId, title, content, status} = req.body;
  try{
    const todo = await TodoModel.create({userId: userId, todoTitle : title, todoContent : content, })
    res.json(todo)
}
catch (err) {  
  res.json({ error: "mistake" });
}

});

app.post('/getTodo',async (req,res)=>{
   const {userId}=req.body;
//    res.json({userId})
    const todo=await TodoModel.find({userId:userId});
    res.json(todo)

})

app.post('/delete',async (req,res)=>{

  try {
    const {id}=req.body;
    const deletedTodo = await TodoModel.findByIdAndDelete(id);
    res.send(deletedTodo)
  } catch (error) {
    
    res.send('failed to delete')
  }
})
app.post('/update',async (req,res)=>{

  try {
    const {id, checked}=req.body;
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { status: checked }, 
      { new: true } 
    );
    res.send(updatedTodo)
  } catch (error) {
    
    res.send('failed to delete')
  }
})
app.post('/test',async (req,res)=>{
   res.send('hello world')
})

//.....................................//

app.listen(process.env.PORT, () => {
  console.log(
    `App is running on http://localhost:${process.env.PORT} & frontend running on http://localhost:5173`
  );
});
