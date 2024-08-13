import * as jwtAction from "../middleware/jwtAction.mjs";
import scoredController from "../controller/scoredController.mjs";
import express from "express";

const router = express.Router();

const initApiScore = (app) => {
    router.get("/get-scored", scoredController.handleGetScored);
    router.delete("/delete-scored", scoredController.handleDeleteScored);
    router.post("/create-scored", scoredController.handleCreateScored);
    router.put("/update-scored", scoredController.handleUpdateScored);

    return app.use("/v1", router);
};

export default initApiScore;
