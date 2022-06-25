require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const dbConnection = require('./config/DB');

const UserModel = require("./models/Users");

app.use(express.json());
app.use(cors());

dbConnection();



app.get("/getUsers", (request, response) => {

    // response.json(`server is working exactly`);
    UserModel.find({}, (err, result) => {
        if (!err) {
            response.json(result)
        } else {
            response.json(err)
        }
    })
})
app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save()
    res.json(user);
});

app.put("/updateUser", (req,res)=>{

const {name,age,userName,id} = req.body;
  try {
    UserModel.findById(id,(err,user)=>{
        // console.log(user);
        user.name = name;
        user.age = age;
        user.userName = userName
        user.save();
        res.send("Successfully updated in db")
    })
  } catch (error) {
    res.send("error while updating")
  }

});
app.delete("/deleteUser/:id" , async (req,res)=>{
   const id =  req.params.id;
   UserModel.findByIdAndRemove(id).exec();
   res.send("user deleted successfully")
})

const PORT = process.env.PORT || 8000;
app.listen( PORT, () => {
    console.log(`Server is running perfectly on port ${PORT}`)
})