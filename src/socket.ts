import io from "socket.io-client";
import { Base_Url } from "./types";
let socket = io(Base_Url || '');
export default socket;