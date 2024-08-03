import calendarController from "../controller/calendarController.mjs";
import * as jwtAction from "../middleware/jwtAction.mjs";
import express from "express";

const router = express.Router();

const initApiCalendar = (app) => {
    router.post(
        "/create-calendar",
        jwtAction.handleCheckToken,
        calendarController.handleCreateCalendar
    );
    router.get("/get-calender", calendarController.handleGetCalendar);
    router.delete(
        "/delete-calendar",
        jwtAction.handleCheckToken,
        calendarController.handleDeleteCalendar
    );
    router.put(
        "/update-calendar",
        jwtAction.handleCheckToken,
        calendarController.handleUpdateCalendar
    );
    router.get(
        "/get-nearest-calendar",
        calendarController.handleGetNearestCalendar
    );

    return app.use("/v1", router);
};

export default initApiCalendar;
