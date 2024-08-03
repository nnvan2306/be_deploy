import initApiUser from "./apiUser.mjs";
import initApiSeason from "./apiSeason.mjs";
import initApiTeam from "./apiTeam.mjs";
import initApiPlayer from "./apiPlayer.mjs";
import initApiStatistic from "./apiStatistic.mjs";
import initApiRating from "./apiRating.mjs";
import initApiMatch from "./apiMatch.mjs";
import initApiScore from "./apiScore.mjs";
import initApiStadium from "./apiStadium.mjs";
import initApiStand from "./apiStand.mjs";
import initApiCalendar from "./apiCalendar.mjs";
import initApiTicket from "./apiTicket.mjs";
import initApiBill from "./apiBill.mjs";
import initApiEmail from "./apiEmail.mjs";
import initApiComment from "./apiComment.mjs";
import initApiFeedback from "./apiFeedback.mjs";
import initApiTest from "./apiTest.mjs";

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
    initApiTest(app);
};

export default initApiRoutes;
