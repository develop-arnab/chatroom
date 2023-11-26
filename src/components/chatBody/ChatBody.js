import React from "react";
import ChatWidget from "../chatContent/ChatWidget";
// import ChatWidget from "shelltunes-react-chatbot"

export default function ChatBody() {
  return (
    <ChatWidget
      apiKey={'zerodha1234'}
      containerStyle={{ backgroundColor: "yellow" }}
      widgetStyle={{
        backgroundColor: "white",
        width: 60,
        height: 60,
        borderRadius: 30,
      }}
      icon={require("../../assets/chat_icon.png")}
      iconStyle={{ width: 60, height: 60, borderRadius: 30 }}
      username={"Arjun"}
      room={"MongoRoom"}
    />
  );
}
