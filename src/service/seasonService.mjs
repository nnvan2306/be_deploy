import db from "../models/index.mjs";
import returnErrService from "../helps/returnErrService.mjs";
import funcReturn from "../helps/funcReturn.mjs";

const checkSeasonExitService = async (index) => {
    let check = await db.Season.findOne({
        where: { index: index },
    });
    return check;
};

const createSeasonService = async (data) => {
    try {
        let checkExits = await checkSeasonExitService(data.index);
        if (checkExits) {
            return funcReturn("season is exits", 1, []);
        }

        await db.Season.create({
            index: data.index,
            name: data.name,
            description: data.description,
            des_text: data.des_text,
        });

        return funcReturn("create season successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getAllSeasonsService = async () => {
    try {
        let seasons = await db.Season.findAll();
        return funcReturn("all seasons", 0, seasons);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getSeasonLimitService = async (page, pageSize) => {
    try {
        let offset = (page - 1) * pageSize;

        let { count, rows } = await db.Season.findAndCountAll({
            offset: offset,
            limit: pageSize,
        });
        let data = {
            items: rows,
            meta: {
                currentPage: page,
                totalIteams: count,
                totalPages: Math.ceil(count / pageSize),
            },
        };

        return funcReturn("gey limit seasons", 0, data);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const deleteSeasonService = async (index) => {
    try {
        await db.Season.destroy({
            where: { index: index },
        });
        return funcReturn("delete season successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateSeasonService = async (data) => {
    try {
        await db.Season.update(
            {
                index: data.index,
                name: data.name,
                description: data.description,
                des_text: data.des_text,
            },
            {
                where: { id: data.id },
            }
        );
        return funcReturn("update season successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

module.exports = {
    createSeasonService,
    getAllSeasonsService,
    getSeasonLimitService,
    deleteSeasonService,
    updateSeasonService,
};
