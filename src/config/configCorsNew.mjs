import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

export default function configCorsNew(app) {
    const corsOption = {
        origin: [
            "https://api.nha.vandev.top",
            "http://localhost:3000",
            "http://localhost:5173",
        ],
        credentials: true,
    };

    app.use(cors(corsOption));
}
