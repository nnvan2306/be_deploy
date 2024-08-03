import jwtAction from "../middleware/jwtAction.mjs";
import ticketController from "../controller/ticketController.mjs";
import express from "express";

const router = express.Router();

const initApiTicket = (app) => {
    router.post(
        "/create-ticket",
        jwtAction.handleCheckToken,
        ticketController.handleCreateTicket
    );
    router.put(
        "/update-ticket",
        jwtAction.handleCheckToken,
        ticketController.handleUpdateTicket
    );
    router.patch(
        "/update-booking-ticket",
        ticketController.handleUpdateBookingTicket
    );
    router.delete(
        "/delete-ticket",
        jwtAction.handleCheckToken,
        ticketController.handleDeleteTicket
    );
    router.delete(
        "/delete-all-ticket",
        jwtAction.handleCheckToken,
        ticketController.handleDeleteAllTicket
    );
    router.get("/get-ticket", ticketController.handleGetTicket);
    router.get("/get-one-ticket", ticketController.handleGetOneTicket);

    return app.use("/v1", router);
};

export default initApiTicket;
