import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import '../chat/chat.css';
import queryString from 'query-string';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from "./Message";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";


let socket;

const ChatPedido = (props) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = process.env.REACT_APP_URL_CHAT;

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
      console.log(message)
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      console.log(message)
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <Modal isOpen={true} className="w-4/5">
        <ModalHeader className="bg-black">
          <Link to={props.urlRedirect} className="text-white font-bold">Salir</Link>
        </ModalHeader>
        <ModalBody className="bg-black">
          <div className="outerContainer">
            <div className="containerChat">
              <ScrollToBottom className="messages">
                  {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
              </ScrollToBottom>
              <form className="formChat">
                  <input
                  className="inputChat"
                  type="text"
                  placeholder="Escriba un mensaje"
                  value={message}
                  onChange={({ target: { value } }) => setMessage(value)}
                  onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                  />
                  <button className="sendButtonChat" onClick={e => sendMessage(e)}>Enviar</button>
              </form>
            </div>
          
          </div>
        </ModalBody>
    </Modal>
    
  );
}

export default ChatPedido;