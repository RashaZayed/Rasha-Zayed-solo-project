const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
require("./config/mongoose.config");
require("./routes/user.routes")(app);
require("./routes/post.routes")(app);
app.listen(8000, () => console.log("The server is runing on port 8000 "));
