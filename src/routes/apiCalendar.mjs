import calendarController from "../controller/calendarController.mjs";
import * as jwtAction from "../middleware/jwtAction.mjs";
import express from "express";

const router = express.Router();

const initApiCalendar = (app) => {
    router.post("/create-calendar", calendarController.handleCreateCalendar);
    router.get("/get-calender", calendarController.handleGetCalendar);
    router.delete("/delete-calendar", calendarController.handleDeleteCalendar);
    router.put("/update-calendar", calendarController.handleUpdateCalendar);
    router.get(
        "/get-nearest-calendar",
        calendarController.handleGetNearestCalendar
    );

    return app.use("/v1", router);
};

export default initApiCalendar;
