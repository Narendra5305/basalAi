
const express = require('express');
const http = require('http'); 
const { Server } = require('socket.io');
const cors = require('cors');
require("dotenv").config();
const {toConnectDB} = require("./config")




const app = express();
const server = http.createServer(app); 
app.use(express.json())


const {OpeningRouter} = require("./routes/openingRoute")
const {ApplicationRouter} = require("./routes/application");
const { UserRouter } = require('./routes/userRoute');


const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST", "PUT"], 
  },
});


app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT"], 
}));





io.on("connection" ,( socket)=>{
    console.log("new user is connected")

    socket.on("newInterViewRequestCreated" ,(data)=>{
      io.emit("newInterViewRequestCreated" , data)
    })

    socket.on("disconnect" ,()=>{
      
      console.log("user is disconnected")
    })

})


const passIoMidd = (req,res , next) =>{
  req.io = io ;
  next()
}

// all the routes
app.use('/users', UserRouter );
app.use('/opening', OpeningRouter );
app.use('/application', passIoMidd ,ApplicationRouter );





app.get("/" ,(req,res) =>{
    res.send("this is job portal api")
})

server.listen(8080 ,()=>{
    toConnectDB() // for connect to DB (mongoDb database)
    console.log("server is running at http://localhost:8080/")
})
