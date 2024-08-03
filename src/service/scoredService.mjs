import funcReturn from "../helps/funcReturn.mjs";
import returnErrService from "../helps/returnErrService.mjs";
import db from "../models/index.mjs";

const handleCheckExit = async (id) => {
    let scored = await db.Scored.findOne({
        where: { id: id },
    });

    return scored;
};

const getScoredService = async (id) => {
    try {
        let scoreds = await db.Scored.findAll({
            where: { matchId: id },
        });
        return funcReturn("list scored", 0, scoreds);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const deleteScoredService = async (id) => {
    try {
        await db.Scored.destroy({
            where: { id: id },
        });
        return funcReturn("delete successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const createScoredService = async (data) => {
    try {
        await db.Scored.create({
            namePlayer: data.namePlayer,
            minuteGoal: data.minuteGoal,
            isPenalty: data.isPenalty,
            matchId: data.matchId,
            teamId: data.teamId,
        });
        return funcReturn("create scored successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateScoredService = async (data) => {
    try {
        let check = await handleCheckExit(data.id);
        if (!check) {
            return funcReturn("scored is not exit", 1, []);
        }
        console.log(data);
        await db.Scored.update(
            {
                namePlayer: data.namePlayer,
                minuteGoal: data.minuteGoal,
                isPenalty: data.isPenalty,
                matchId: data.matchId,
                teamId: data.teamId,
            },
            {
                where: { id: data.id },
            }
        );
        return funcReturn("update scored successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};
export {
    getScoredService,
    deleteScoredService,
    createScoredService,
    updateScoredService,
};
