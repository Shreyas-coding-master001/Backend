import app from "./src/app.js";
import { createServer } from "http";
import {Server } from "socket.io";

const httpServer = createServer(app);
const io = new Server(httpServer, {/*options*/});

const listener = (eventName, ...args) => {
    console.log(eventName);
    console.log(args);
}

io.on("connection", (socket) => {
    console.log("NEW Connection Established");
    //Emits
    socket.emit("welcome","Hello, from Server");

    // // Can work Multiple Inputs and can use callback/Acknowlegment
    // socket.emit("message", 1, "2",{yes:"no"}, (resp) => {
    //     console.log(resp);
    // });

    // // TImeout
    // socket.timeout(5000).emit("my-event", "Personal",(err, resp) => {
    //     if(err){

    //     }
    //     else{
    //         console.log(resp);
    //     }
    // });
    

    // //Volatile -> Good for Games/ reliabilty = UDP/ Client not Connected then discards the event
    // let count= 0;
    // setInterval(() => {
    //     count++;
    //     socket.emit("ping", count);
    //     console.log(count);
    // }, 3000);

    //Listeners
    socket.onAny(listener);

    socket.offAny(listener);
});

httpServer.listen(3000, () => console.log("Server is running on port 3000"));