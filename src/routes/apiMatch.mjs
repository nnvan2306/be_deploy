import jwtAction from "../middleware/jwtAction";
import matchController from "../controller/matchController";
import { uploadMatch } from "../middleware/multer";
import express from "express";

const router = express.Router();

const initApiMatch = (app) => {
    router.post(
        "/create-match",
        jwtAction.handleCheckToken,
        uploadMatch.single("file"),
        matchController.handleCreateMatch
    );
    router.get("/get-match", matchController.handleGetMatch);
    router.delete(
        "/delete-match",
        jwtAction.handleCheckToken,
        matchController.handleDeleteMatch
    );
    router.put(
        "/update-match",
        jwtAction.handleCheckToken,
        uploadMatch.single("file"),
        matchController.handleUpdateMatch
    );
    router.get("/search-match", matchController.handleSearchMatch);
    router.get("/get-match-by-id", matchController.handleGetMAtchById);

    return app.use("/v1", router);
};

export default initApiMatch;
