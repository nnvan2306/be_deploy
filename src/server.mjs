import express from "express";
import { createServer } from "https"; // Sử dụng https thay vì http
import { Server as SocketIO } from "socket.io";
import testConnection from "./config/connectDb.mjs";
import initApiRoutes from "./routes/api.mjs";
import configCors from "./config/configCors.mjs";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { createCommentSocket } from "./service/socketComment.mjs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs"; // Đọc file hệ thống
import configCorsNew from "./config/configCorsNew.mjs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8081;

// Đường dẫn tới các file chứng chỉ SSL
const httpsServer = createServer({
    key: readFileSync("/etc/letsencrypt/live/api.nha.vandev.top/privkey.pem"),
    cert: readFileSync(
        "/etc/letsencrypt/live/api.nha.vandev.top/fullchain.pem"
    ),
});

// config cors
configCorsNew(app);

//config cookie-parser
app.use(cookieParser());

const io = new SocketIO(httpsServer, {
    cors: {
        origin: "https://fe-nha-production.vercel.app",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    },
});

io.on("connect", (socket) => {
    createCommentSocket(socket);
});

//config body parser
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

//test connection
try {
    testConnection();
} catch (error) {
    console.log(error);
}

//public /images
app.use("/v1/images", express.static(__dirname + "/public/logoTeams"));
app.use("/v1/images", express.static(__dirname + "/public/avatarPlayers"));
app.use("/v1/images", express.static(__dirname + "/public/nhaImages"));
app.use("/v1/videos", express.static(__dirname + "/public/matchs"));
app.use("/v1/images", express.static(__dirname + "/public/stadiums"));
app.use("/v1/images", express.static(__dirname + "/public/avatarUsers"));

//init API routes
initApiRoutes(app);
