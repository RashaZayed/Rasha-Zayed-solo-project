const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/socialMediaUsers", {useNewUrlParser: true , useUnifiedTopology:true})
.then(()=> console.log("Established connection with the database"))
.catch((err)=> conssole.log("Something went error with the connection with the database"))