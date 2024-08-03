import jwtAction from "../middleware/jwtAction.mjs";
import stadiumController from "../controller/stadiumController.mjs";
import { uploadStadium } from "../middleware/multer.mjs";
import express from "express";

const router = express.Router();

const initApiStadium = (app) => {
    router.post(
        "/create-stadium",
        jwtAction.handleCheckToken,
        uploadStadium.single("file"),
        stadiumController.handleCreateStadium
    );
    router.get("/get-stadium", stadiumController.handleGetStadium);
    router.delete(
        "/delete-stadium",
        jwtAction.handleCheckToken,
        stadiumController.handleDeleteStadium
    );
    router.put(
        "/update-stadium",
        jwtAction.handleCheckToken,
        uploadStadium.single("file"),
        stadiumController.handleUpdateStadium
    );

    return app.use("/v1", router);
};

export default initApiStadium;
