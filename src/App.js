import "./App.css";
import { useState } from "react";
import axios from "axios";
import ChatBody from "./components/chatBody/ChatBody";
import DropFileInput from "./components/drop-file-input/DropFileInput";
const baseURL = "http://localhost:3001";
function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const onFileChange = (files) => {
    console.log(files);
  };
  return (
    <div className="App">
      <DropFileInput onFileChange={(files) => onFileChange(files)} />
      <ChatBody />
    </div>
  );
}
export default App;
