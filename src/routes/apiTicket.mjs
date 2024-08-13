import * as jwtAction from "../middleware/jwtAction.mjs";
import ticketController from "../controller/ticketController.mjs";
import express from "express";

const router = express.Router();

const initApiTicket = (app) => {
    router.post("/create-ticket", ticketController.handleCreateTicket);
    router.put("/update-ticket", ticketController.handleUpdateTicket);
    router.patch(
        "/update-booking-ticket",
        ticketController.handleUpdateBookingTicket
    );
    router.delete("/delete-ticket", ticketController.handleDeleteTicket);
    router.delete("/delete-all-ticket", ticketController.handleDeleteAllTicket);
    router.get("/get-ticket", ticketController.handleGetTicket);
    router.get("/get-one-ticket", ticketController.handleGetOneTicket);

    return app.use("/v1", router);
};

export default initApiTicket;
