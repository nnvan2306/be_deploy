import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

export default function configCorsNew(app) {
    const corsOptions = {
        origin: [
            "https://fe-nha-admin.vercel.app",
            "http://localhost:3000",
            "http://localhost:5173",
        ],
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        allowedHeaders: "Content-Type,Authorization",
    };

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        res.header(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, OPTIONS"
        );
        if (req.method === "OPTIONS") {
            return res.sendStatus(200);
        }
        next();
    });

    app.use(cors(corsOptions));
}
