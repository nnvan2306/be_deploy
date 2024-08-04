import * as jwtAction from "../middleware/jwtAction.mjs";
import seasonController from "../controller/seasonController.mjs";
import express from "express";

const router = express.Router();

const initApiSeason = (app) => {
    router.post(
        "/create-season",
        // jwtAction.handleCheckToken,s
        seasonController.handleCreateSeason
    );
    router.get("/get-season", seasonController.handleGetLimitSeasons);
    router.delete(
        "/delete-season",
        // jwtAction.handleCheckToken,
        seasonController.handleDeleteSeason
    );
    router.put(
        "/update-season",
        // jwtAction.handleCheckToken,
        seasonController.handleUpdateSeason
    );

    return app.use("/v1", router);
};

export default initApiSeason;
