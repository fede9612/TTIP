import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from 'query-string';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from "./Message";


let socket;

const ChatPedido = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'http://localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);

    socket = io(ENDPOINT);
    console.log(window.location.search)
    setRoom(room);
    setName(name)
    console.log(room)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, window.location.search]); 
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
        <div className="container">
        <ScrollToBottom className="messages">
            {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
        </ScrollToBottom>
        <form className="form">
            <input
            className="input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            />
            <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
        </form>
        </div>
        
    </div>
  );
}

export default ChatPedido;