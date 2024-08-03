import returnErrService from "../helps/returnErrService.mjs";
import db from "../models/index.mjs";
import funcReturn from "../helps/funcReturn.mjs";

const createCalendarTeamService = async (hostId, guestId, calendarId) => {
    try {
        await db.Calendar_Team.create({
            teamId: hostId,
            calendarId: calendarId,
        });

        await db.Calendar_Team.create({
            teamId: guestId,
            calendarId: calendarId,
        });

        return funcReturn("create successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const deleteCalendarTeamService = async (calendarId) => {
    try {
        await db.Calendar_Team.destroy({
            where: {
                calendarId: calendarId,
            },
        });

        return funcReturn("delete successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateCalendarTeamService = async (
    hostIdOld,
    guestIdOld,
    hostIdNew,
    guestIdNew,
    calendarId
) => {
    try {
        if (hostIdOld !== hostIdNew) {
            await db.Calendar_Team.update(
                {
                    teamId: hostIdNew,
                    calendarId: calendarId,
                },
                {
                    where: {
                        calendarId: calendarId,
                        teamId: hostIdOld,
                    },
                }
            );
        }
        if (guestIdOld !== guestIdNew) {
            await db.Calendar_Team.update(
                {
                    teamId: guestIdNew,
                    calendarId: calendarId,
                },
                {
                    where: {
                        calendarId: calendarId,
                        teamId: guestIdOld,
                    },
                }
            );
        }

        return funcReturn("update successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};
export {
    createCalendarTeamService,
    deleteCalendarTeamService,
    updateCalendarTeamService,
};
