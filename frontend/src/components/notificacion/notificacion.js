import io from 'socket.io-client';

const  socket = io(process.env.REACT_APP_URL_CHAT);

export { socket };