require("dotenv").config(); // sd .env

export default function configCors(app) {
    app.use((req, res, next) => {
        res.setHeader(
            "Access-Control-Allow-Origin",
            process.env.REACT_URL
            // && process.env.NEXT_URL
        );
        res.setHeader(
            "Access-Control-Allow-Methods",
            "POST, GET, PUT ,OPTIONS , PATCH , DELETE"
        );
        res.setHeader(
            "Access-Control-Allow-Headers",
            "X-Requested-With,Content-Type"
        );
        res.header("Access-Control-Allow-Credentials", true);

        next();
    });
}
