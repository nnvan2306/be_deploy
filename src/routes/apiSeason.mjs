import * as jwtAction from "../middleware/jwtAction.mjs";
import seasonController from "../controller/seasonController.mjs";
import express from "express";

const router = express.Router();

const initApiSeason = (app) => {
    router.post(
        "/create-season",
        jwtAction.handleCheckToken,
        seasonController.handleCreateSeason
    );
    router.get("/get-season", seasonController.handleGetLimitSeasons);
    router.delete("/delete-season", seasonController.handleDeleteSeason);
    router.put("/update-season", seasonController.handleUpdateSeason);

    return app.use("/v1", router);
};

export default initApiSeason;
