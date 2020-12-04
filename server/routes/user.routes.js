const mongoose = require("mongoose");
const { auth } = require("../middlewares/auth");

const UserController = require("../controllers/user.controllers");

module.exports = (app) => {
  app.get("/", function (req, res) {
    res.status(200).send(`Welcome to login , sign-up api`);
  });
  // adding new user (sign-up route)
  app.post("/api/register", UserController.registerUser);

  // login user
  app.post("/api/login", UserController.login);
  // get the user to the profile
  app.get("/api/profile", auth, UserController.profile);
  //get user by id to access the post creator info
  app.get('/api/user/:id' , auth, UserController.getUser)
  //upload endpoint
  app.post('/api/upload' ,(req,res)=>{
    if(req.files === null){
      return res.status(400).json({message: "No message uploaded"})
    }
    const file = req.files.file; //req.files.img
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});


  //logout user
  app.get("/api/logout", auth, UserController.logout);
};
