import * as jwtAction from "../middleware/jwtAction.mjs";
import ratingController from "../controller/ratingController.mjs";
import express from "express";

const router = express.Router();

const initApiRating = (app) => {
    router.post("/create-rating", ratingController.handleCreateRating);
    router.get("/get-rating", ratingController.handleGetRating);
    router.delete("/delete-rating", ratingController.handleDeleteRating);
    router.put("/update-rating", ratingController.handleUpdateRating);

    return app.use("/v1", router);
};

export default initApiRating;
