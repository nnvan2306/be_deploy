import express from "express";

import {
    upload,
    uploadAvatar,
    uploadAvatarUser,
    uploadMatch,
    uploadStadium,
} from "../middleware/multer";

import jwtAction from "../middleware/jwtAction";
import initApiUser from "./apiUser";
import initApiSeason from "./apiSeason";
import initApiTeam from "./apiTeam";
import initApiPlayer from "./apiPlayer";
import initApiStatistic from "./apiStatistic";
import initApiRating from "./apiRating";
import initApiMatch from "./apiMatch";
import initApiScore from "./apiScore";
import initApiStadium from "./apiStadium";
import initApiStand from "./apiStand";
import initApiCalendar from "./apiCalendar";
import initApiTicket from "./apiTicket";
import initApiBill from "./apiBill";
import initApiEmail from "./apiEmail";
import initApiComment from "./apiComment";
import initApiFeedback from "./apiFeedback";

// const router = express.Router();

const initApiRoutes = (app) => {
    initApiUser(app);
    initApiSeason(app);
    initApiTeam(app);
    initApiPlayer(app);
    initApiStatistic(app);
    initApiRating(app);
    initApiMatch(app);
    initApiScore(app);
    initApiStadium(app);
    initApiStand(app);
    initApiCalendar(app);
    initApiTicket(app);
    initApiBill(app);
    initApiEmail(app);
    initApiComment(app);
    initApiFeedback(app);

    // router.all("*", jwtAction.handleCheckToken);
};

export default initApiRoutes;
