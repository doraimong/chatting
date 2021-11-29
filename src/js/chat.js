"use strict"

//소켓에 클라이언트 socket io 가 담긴다.
const socket = io(); 

const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");

sendButton.addEventListener("click", ()=>{
    //front의 input에서 입력받은 내용
    const param = {
        name: nickname.value,
        msg: chatInput.value
    }
    socket.emit("chatting", param)
})

//emit으로 메세지 전달(채널 이름역할, 내용)
socket.emit("chatting", "from front")

socket.on("chatting", (data)=> {
    console.log(data)
})

console.log(socket)