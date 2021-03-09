import {io} from 'socket.io-client'

const {REACT_APP_BACKEND_URL} = process.env
const socket = io(REACT_APP_BACKEND_URL)

export default socket
