import returnErrService from "../helps/returnErrService.mjs";
import db from "../models/index.mjs";
import funcReturn from "../helps/funcReturn.mjs";

const getStatisticPlayerService = async (id) => {
    try {
        let player = await db.Statistic.findAll({
            where: { playerId: id },
            include: {
                model: db.Season,
                attributes: ["index", "name"],
            },
        });

        return funcReturn("ststistics player", 0, player);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const handleCheckStatisticExits = async (seasonId, playerId) => {
    let statistic = await db.Statistic.findOne({
        where: { seasonId: seasonId, playerId: playerId },
    });

    return statistic;
};

const handleCheckExits = async (id) => {
    let statistic = await db.Statistic.findOne({
        where: { id: id },
    });

    return statistic;
};

const createStatisticService = async (data) => {
    try {
        let check = await handleCheckStatisticExits(
            data.seasonId,
            data.playerId
        );
        if (check) {
            return funcReturn("statistic is exits !", 1, []);
        }

        await db.Statistic.create({
            goal: data.goal,
            assist: data.assist,
            yellowCard: data.yellowCard,
            redCard: data.redCard,
            pA: data.pA,
            seasonName: data.seasonName,
            playerId: data.playerId,
            seasonId: data.seasonId,
        });

        return funcReturn("create Statistic successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateStatisticService = async (data) => {
    try {
        await db.Statistic.update(
            {
                goal: data.goal,
                assist: data.assist,
                yellowCard: data.yellowCard,
                redCard: data.redCard,
                pA: data.pA,
                seasonName: data.seasonName,
                seasonId: data.seasonId,
                playerId: data.playerId,
            },
            {
                where: { id: data.id },
            }
        );

        return funcReturn("update Statistic successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const deleteStatisticService = async (id) => {
    try {
        console.log(id);
        let check = await handleCheckExits(id);
        if (!check) {
            return funcReturn("statistic is not exits !", 1, []);
        }

        await db.Statistic.destroy({
            where: { id: id },
        });

        return funcReturn("delete Statistic successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getStatisticSeasonService = async (seasonId) => {
    try {
        let statistics = await db.Statistic.findAll({
            where: { seasonId: seasonId },
            include: {
                model: db.Player,
                attributes: ["name", "avatar_url"],
                include: {
                    model: db.Team,
                    attributes: ["name", "logo_url"],
                },
            },
        });
        return funcReturn("statistics ", 0, statistics);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

export {
    createStatisticService,
    deleteStatisticService,
    getStatisticPlayerService,
    getStatisticSeasonService,
    updateStatisticService,
};
