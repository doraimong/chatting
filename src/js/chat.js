"use strict"

//소켓에 클라이언트 socket io 가 담긴다.
const socket = io(); 

//emit으로 메세지 전달(채널 이름역할, 내용)
socket.emit("chatting", "from front")

socket.on("chatting", (data)=> {
    console.log(data)
})

console.log(socket)