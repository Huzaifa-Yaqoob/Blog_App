require("dotenv").config();
const express = require("express");
const cors = require("cors");
const user = require("./model/User");
const blog = require("./model/Blog");
const error = require("./controller/error");
const { DBConnect } = require("./controller/DB");

const app = express();


// Setting cros origin on localhost:3000
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// try to connect with DB and start listenint to localhost:5000
try {
    DBConnect();
    app.listen(5000);
} catch (error) {
    console.log(error);
}

// make upload folder static
app.use("/", express.static("uploads"));

// using middleware to PARSE json
app.use(express.json());


app.use("/user", user);

app.use("/blogs", blog);

app.use(error);
