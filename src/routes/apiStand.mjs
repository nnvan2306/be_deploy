import * as jwtAction from "../middleware/jwtAction.mjs";
import standController from "../controller/standController.mjs";
import express from "express";

const router = express.Router();

const initApiStand = (app) => {
    router.post(
        "/create-stand",
        jwtAction.handleCheckToken,
        standController.handleCreateStand
    );
    router.delete(
        "/delete-stand",
        jwtAction.handleCheckToken,
        standController.handleDeleteStand
    );
    router.get("/get-stand", standController.handleGetStand);
    router.put(
        "/update-stand",
        jwtAction.handleCheckToken,
        standController.handleUpdateStand
    );
    return app.use("/v1", router);
};

export default initApiStand;
