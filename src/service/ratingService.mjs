import funcReturn from "../helps/funcReturn.mjs";
import returnErrService from "../helps/returnErrService.mjs";
import db from "../models/index.mjs";

const handleCheckExits = async (seasonId, teamId) => {
    let rating = await db.Rating.findOne({
        where: { seasonId: seasonId, teamId: teamId },
    });
    return rating;
};

const handleCheckCountRatingSeason = async (seasonId) => {
    let ratings = await db.Rating.findAll({
        where: { seasonId: seasonId },
    });
    if (ratings.length < 20) {
        return true;
    }
    return false;
};

const handleFindRatingById = async (id) => {
    let rating = await db.Rating.findOne({
        where: { id: id },
    });
    return rating;
};

const createRatingService = async (data) => {
    try {
        // check exits
        let check = await handleCheckExits(data.seasonId, data.teamId);
        if (check) {
            return funcReturn("rating is exits !", 1, []);
        }

        //check count rating
        let checkCount = await handleCheckCountRatingSeason(data.seasonId);
        if (!checkCount) {
            return funcReturn(" one season have 20 ratings !", 1, []);
        }

        //  create
        await db.Rating.create({
            win: data.win,
            lose: data.lose,
            draw: data.draw,
            totalGoal: data.totalGoal,
            totalLostGoal: data.totalLostGoal,
            seasonId: data.seasonId,
            teamId: data.teamId,
        });

        return funcReturn("create rating successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const handleGetAllRatingService = async () => {
    try {
        let rating = await db.Rating.findAll({
            include: { model: db.Team },
        });
        return funcReturn("all rating", 0, rating);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const handleGetRatingSeasonService = async (seasonId) => {
    try {
        let rating = await db.Rating.findAll({
            where: { seasonId: seasonId },
            include: {
                model: db.Team,
                include: [
                    {
                        model: db.Match,
                        where: { seasonId: seasonId },
                        attributes: [
                            "hostId",
                            "guestId",
                            "hostGoal",
                            "guestGoal",
                            "date",
                        ],
                    },
                ],
            },
        });

        return funcReturn(`rating season ${seasonId}`, 0, rating);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const handleDeleteRatingService = async (id) => {
    try {
        await db.Rating.destroy({
            where: { id: id },
        });
        return funcReturn("delete rating successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const handleUpdateRatingService = async (data) => {
    try {
        //check exits
        let rating = await handleFindRatingById(data.id);

        if (
            rating.seasonId !== +data.seasonId ||
            rating.teamId !== +data.teamId
        ) {
            let checkExit = await handleCheckExits(data.seasonId, data.teamId);

            if (checkExit) {
                return funcReturn("rating is exits !", 1, []);
            }
        }
        //check count rating
        let checkCount = await handleCheckCountRatingSeason(data.seasonId);
        if (!checkCount) {
            return funcReturn(" one season have 20 ratings !", 1, []);
        }

        await db.Rating.update(
            {
                win: data.win,
                lose: data.lose,
                draw: data.draw,
                totalGoal: data.totalGoal,
                totalLostGoal: data.totalLostGoal,
                seasonId: data.seasonId,
                teamId: data.teamId,
            },
            {
                where: { id: data.id },
            }
        );
        return funcReturn("update rating successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

export {
    createRatingService,
    handleGetAllRatingService,
    handleGetRatingSeasonService,
    handleDeleteRatingService,
    handleUpdateRatingService,
};
