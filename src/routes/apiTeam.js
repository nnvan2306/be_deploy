import jwtAction from "../middleware/jwtAction";
import teamController from "../controller/teamController";
import { upload } from "../middleware/multer";
import express from "express";

const router = express.Router();

const initApiTeam = (app) => {
    router.post(
        "/create-team",
        jwtAction.handleCheckToken,
        upload.single("file"),
        teamController.handleCreateTeam
    );
    router.get("/get-team", teamController.handleGetTeam);
    router.delete(
        "/delete-team",
        jwtAction.handleCheckToken,
        teamController.handleDeleteTeam
    );
    router.put(
        "/update-team",
        jwtAction.handleCheckToken,
        upload.single("file"),
        teamController.handleUpdateTeam
    );
    router.post(
        "/search-team",
        jwtAction.handleCheckToken,
        teamController.handleSearchTeam
    );

    return app.use("/v1", router);
};

export default initApiTeam;
