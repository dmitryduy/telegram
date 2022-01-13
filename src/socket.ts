import io from "socket.io-client";
let socket = io("https://telegram-server-part.herokuapp.com");
export default socket;