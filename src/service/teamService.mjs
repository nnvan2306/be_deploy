import db from "../models/index.mjs";
import returnErrService from "../helps/returnErrService.mjs";
import { handleRemoveLogo } from "../middleware/removeImage.mjs";
import funcReturn from "../helps/funcReturn.mjs";

const checkTeamExits = async (name) => {
    let check = await db.Team.findOne({
        where: { name: name },
    });
    return check;
};

const handleCheckById = async (id) => {
    let check = await db.Team.findOne({
        where: { id: id },
    });
    return check;
};

const createTeamService = async (data) => {
    try {
        // check exits
        let checkExits = await checkTeamExits(data.name);
        if (checkExits) {
            return funcReturn("team is exits", 1, []);
        }
        // create
        await db.Team.create({
            name: data.name,
            logo_url: `/images/${data.logo_url}`,
            description: data.description,
            des_text: data.des_text,
        });

        return funcReturn("create team successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getAllTeamService = async () => {
    try {
        let teams = await db.Team.findAll();
        return funcReturn("all teams", 0, teams);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getTeamLimitService = async (page, pageSize) => {
    try {
        let offset = (page - 1) * pageSize;
        let { count, rows } = await db.Team.findAndCountAll({
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

        return funcReturn("list teams", 0, data);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const deleteTeamService = async (id) => {
    try {
        let team = await handleCheckById(id);
        let path = team?.dataValues?.logo_url.split("/images/")[1];
        if (handleRemoveLogo(path)) {
            await db.Team.destroy({
                where: { id: id },
            });
            return funcReturn("delete team successfully", 0, []);
        } else {
            return returnErrService();
        }
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateTeamService = async (data) => {
    try {
        if (!data.isChangeFile) {
            await db.Team.update(
                {
                    name: data.name,
                    description: data.description,
                    des_text: data.des_text,
                },
                {
                    where: { id: data.id },
                }
            );
        } else {
            let path = data.logo_url.split("/images/")[1];
            if (handleRemoveLogo(path)) {
                await db.Team.update(
                    {
                        name: data.name,
                        description: data.description,
                        des_text: data.des_text,
                        logo_url: `/images/${data.logo}`,
                    },
                    {
                        where: { id: data.id },
                    }
                );
            }
        }
        return funcReturn("update team successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

export {
    createTeamService,
    getAllTeamService,
    getTeamLimitService,
    deleteTeamService,
    updateTeamService,
};
