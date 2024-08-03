import emailController from "../controller/emailController.mjs";
import express from "express";

const router = express.Router();

const initApiEmail = (app) => {
    router.post("/send-email", emailController.handleSendEmail);

    return app.use("/v1", router);
};

export default initApiEmail;
