import * as jwtAction from "../middleware/jwtAction.mjs";
import standController from "../controller/standController.mjs";
import express from "express";

const router = express.Router();

const initApiStand = (app) => {
    router.post("/create-stand", standController.handleCreateStand);
    router.delete("/delete-stand", standController.handleDeleteStand);
    router.get("/get-stand", standController.handleGetStand);
    router.put("/update-stand", standController.handleUpdateStand);
    return app.use("/v1", router);
};

export default initApiStand;
