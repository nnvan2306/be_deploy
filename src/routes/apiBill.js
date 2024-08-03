import express from "express";
import billController from "../controller/billController";
import jwtAction from "../middleware/jwtAction";

const router = express.Router();

const initApiBill = (app) => {
    router.post("/create-bill", billController.handleCreateBill);
    router.delete("/delete-bill", billController.handleDeleteBill);
    router.get("/get-bill", billController.handleGetBill);
    router.patch(
        "/update-active-bill",
        jwtAction.handleCheckToken,
        billController.handleUpdateActiveBill
    );

    return app.use("/v1", router);
};

export default initApiBill;
