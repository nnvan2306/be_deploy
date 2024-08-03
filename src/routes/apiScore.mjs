import jwtAction from "../middleware/jwtAction.mjs";
import scoredController from "../controller/scoredController.mjs";
import express from "express";

const router = express.Router();

const initApiScore = (app) => {
    router.get("/get-scored", scoredController.handleGetScored);
    router.delete(
        "/delete-scored",
        jwtAction.handleCheckToken,
        scoredController.handleDeleteScored
    );
    router.post(
        "/create-scored",
        jwtAction.handleCheckToken,
        scoredController.handleCreateScored
    );
    router.put(
        "/update-scored",
        jwtAction.handleCheckToken,
        scoredController.handleUpdateScored
    );

    return app.use("/v1", router);
};

export default initApiScore;
