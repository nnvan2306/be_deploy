import express from "express";

const router = express.Router();

const initApiTest = (app) => {
    router.get("/test", (req, res) => {
        res.send("test ok");
    });

    return app.use("/v1", router);
};

export default initApiTest;
