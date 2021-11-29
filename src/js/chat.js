"use strict"

//소켓에 클라이언트 socket io 가 담긴다.
const socket = io(); 

const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

/*엔터처리*/
chatInput.addEventListener("keypress", (event)=> {
    if(event.keyCode === 13){
        send();
    }
})

function send(){
    //front의 input에서 입력받은 내용
    const param = {
        name: nickname.value,
        msg: chatInput.value
    }
    socket.emit("chatting", param)
}

sendButton.addEventListener("click", send)

//emit으로 메세지 전달(채널 이름역할, 내용)
socket.emit("chatting2", "from front")

//서버에서 받아서 front로 전송
socket.on("chatting", (data)=> {
    //front로 보낼 html 태그 생성
    
    //서버에서 데이터를 받아서 계속 찍어낸다.
    const {name, msg, time} = data;
    const item = new LidModel(name, msg, time);
    item.makeLi()
    displayContainer.scrollTo(0, displayContainer.scrollHeight) /*스크롤 처리*/
})

function LidModel(name, msg, time){
    /*초기화 할당 */
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = () => {
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "received")/*서버에서 받은 이름과 같으면 sent*/
        const dom = `<span class="profile">
        <span class="user">${this.name}</span>
        <img class= "image" src="http://placeimg.com/50/50/any" alt="any">
        </span>
        <span class="message">${this.msg}</span>
        <span class="time">${this.time}</span>`;
        li.innerHTML = dom;
        chatList.appendChild(li)
    }
}