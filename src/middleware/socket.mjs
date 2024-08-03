import { Server } from "socket.io";

const io = new Server(8081);

export const handleSocket = () => {
    io.on("connection", (socket) => {
        socket.emit("revalue", "sen succeed");
    });
};
