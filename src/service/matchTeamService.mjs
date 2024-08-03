import returnErrService from "../helps/returnErrService.mjs";
import db from "../models/index";

const createMatchTeamService = async (data, key) => {
    try {
        key === "hostId"
            ? await db.Match_Team.create({
                  matchId: data.id,
                  teamId: data.hostId,
              })
            : await db.Match_Team.create({
                  matchId: data.id,
                  teamId: data.guestId,
              });
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateMatchTeamService = async (matchId, idOld, idNew) => {
    try {
        await db.Match_Team.update(
            {
                teamId: idNew,
            },
            {
                where: { matchId: matchId, teamId: idOld },
            }
        );
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

module.exports = {
    createMatchTeamService,
    updateMatchTeamService,
};
