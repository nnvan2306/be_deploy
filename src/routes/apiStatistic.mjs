import * as jwtAction from "../middleware/jwtAction.mjs";
import statisticController from "../controller/statisticController.mjs";
import express from "express";

const router = express.Router();

const initApiStatistic = (app) => {
    router.post("/create-statistic", statisticController.handleCreateStatistic);
    router.get(
        "/get-statistic-player",
        statisticController.handleGetStatisticPlayer
    );
    router.put("/update-statistic", statisticController.handleUpdateStatistic);
    router.delete("/delete-statistic", statisticController.deleteStatistic);
    router.get(
        "/get-statistic-season",
        statisticController.handleGetStatisticSeason
    );

    return app.use("/v1", router);
};

export default initApiStatistic;
