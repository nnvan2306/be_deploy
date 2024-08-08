import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

export default function configCorsNew(app) {
    const corsOption = {
        origin: [
            "https://fe-nha-admin.vercel.app",
            "http://localhost:3000",
            "http://localhost:5173",
        ],
        credentials: true,
    };

    app.use(cors(corsOption));
}
