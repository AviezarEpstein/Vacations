const jwt_decode = require("jwt-decode");
const vacationsDao = require("../dao/vacations-dao");

const io = require("socket.io")(3002, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let userIdToSocketsMap = new Map();

io.on("connection", (socket) => {
  console.log("New client has been connected");
  socket.on("user-details", (data) => {
    let decoded = jwt_decode(data);
    let id = decoded.id;
    userIdToSocketsMap.set(id, socket);
  });

  socket.on('cutHandShake', (token)=>{
    userIdToSocketsMap.delete(token);
  });
});

function exportId(){
  let idArray = new Array();
  for (let [id, socket] of userIdToSocketsMap) {
    idArray.push(id)
  }
  return idArray
}

function broadcast(userId, parameters) {
  let socket = userIdToSocketsMap.get(userId);
  // console.log("socket: ", socket);
  socket.emit('update-vacation',parameters);
}

module.exports = {broadcast, exportId};
