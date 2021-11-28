const express = require("express");
const http = require("http")    //http 가 있어야 socket을 쓸 수 있다.
const app = express();
const path = require("path");
const server = http.createServer(app);
const socketIO = require("socket.io")

const io = socketIO(server);    //socket에 server를 담는다 -> io를 통해서 메세지 전달 등 제어 할거다

app.use(express.static(path.join(__dirname, "src")))   //1. 보여줄 폴더를 지정 

const PORT = process.env.PORT || 5000;  //프로세스 환경에 포트가 지정되어있으면 전자 

//연결이 되었을때
io.on("connection",(socket)=>{
    console.log('소켓 연결완료');
})

server.listen(PORT, ()=> console.log("server is running ")) //app을 server로 바꿈