import React, { Component, useState, createRef, useEffect } from "react";

import "./chatContent.css";
import Avatar from "../avatar/Avatar";
import ChatItem from "./ChatItem";
import axios from "axios";
// const baseURL = "https://server.shelltunes.com";

const baseURL = "http://localhost:4000";

export default function ChatWidget({apiKey, username, room, containerStyle, widgetStyle, icon, iconStyle }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="chat-widget" style={containerStyle}>
      {isChatOpen ? (
        <ChatContent apiKey={apiKey} username={username} room={room} onClose={toggleChat} />
      ) : (
        <div className="widget-button" style={widgetStyle} onClick={toggleChat}>
          <img style={iconStyle} src={icon}/>
        </div>
      )}
    </div>
  );
}


function ChatContent({ apiKey, username, onClose  }) {
  const messagesEndRef = createRef(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [room, setRoom] = useState("");

  useEffect(() => {
    if (apiKey) {
      // const messageData = {
      //   room: room,
      //   author: username,
      //   message: currentMessage,
      //   time:
      //     new Date(Date.now()).getHours() +
      //     ":" +
      //     new Date(Date.now()).getMinutes()
      // };
      const body = {
        apiKey: apiKey
      };
      axios
        .post(`${baseURL}/api/chatroom/messages`, body)
        .then((response) => {
          setMessageList(response?.data?.chats?.messages);
          setRoom(response?.data?.room)
          console.log("res me ", response);
        });
    }
  }, [room]);

  const langChain = () => {
    const messageData = {
      room: room,
      author: username,
      message: currentMessage,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes()
    };
    const body = {
      apiKey: apiKey,
      room: room,
      messages: messageData,
      user: username
    };
    console.log("MES ", currentMessage);
    axios
      .post(`${baseURL}/api/chatbot?message=${currentMessage}`, body)
      .then((response) => {
        console.log("res me ", response);

        const body = {
          apiKey: apiKey
        };
        axios
          .post(`${baseURL}/api/chatroom/messages`, body)
          .then((response) => {
            // setMessageList((prev) => [...prev, response?.data?.messages]);
            setMessageList(response?.data?.chats?.messages);
            console.log("AI RESPONSE ", response);
          });
      });
  };

  return (
    <div key={room} className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            <Avatar
              isOnline="active"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
            />
            <p>ASK ME ANY {room}</p>
            <button onClick={onClose}>CLOSE</button>
          </div>
        </div>

        <div className="blocks">
          <div className="settings">
            <button className="btn-nobg">
              <i className="fa fa-cog"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="content__body">
        <div key={room} className="chat__items">
          {messageList?.map((itm, index) => {
            return (
              <ChatItem
                key={room}
                animationDelay={index + 2}
                // key={itm.time}
                user={username === itm?.author ? "me" : "other"}
                msg={itm?.message}
                author={itm?.author}
                // image={itm.image}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="content__footer">
        <div className="sendNewMessage">
          <button className="addFiles">
            <i className="fa fa-plus"></i>
          </button>
          <input
            type="text"
            placeholder="Type a message here"
            value={currentMessage}
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            // onKeyPress={(event) => {
            //   event.key === "Enter" && sendMessage();
            // }}
          />
          <button
            onClick={langChain}
            // onClick={sendMessage}
            className="btnSendMsg"
            id="sendMsgBtn"
          >
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
