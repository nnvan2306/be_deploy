import { Op } from "sequelize";
import returnErrService from "../helps/returnErrService.mjs";
import { handleRemoveAvatar } from "../middleware/removeImage.mjs";
import db from "../models/index.mjs";
import funcReturn from "../helps/funcReturn.mjs";
// const { Op } = require("sequelize");

const handleCheckExits = async (code) => {
    let player = await db.Player.findOne({
        where: { code: code },
    });
    return player;
};

const createPlayerService = async (data) => {
    try {
        let check = await handleCheckExits(data.code);
        if (check) {
            return funcReturn("player is exits", 1, []);
        }

        await db.Player.create({
            code: data?.code,
            name: data?.name,
            nationality: data?.nationality,
            height: data?.height,
            weight: data?.weight,
            birthday: data?.birthday,
            teamId: data?.teamId,
            description: data?.description,
            location: data.location,
            isActive: data?.isActive,
            des_text: data?.des_text,
            avatar_url: `/images/${data?.avatar_url}`,
        });
        return funcReturn("create player successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getAllPlayerService = async () => {
    try {
        let players = await db.Player.findAll();
        return funcReturn("all players", 0, players);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getLimitPlayerService = async (page, pageSize) => {
    try {
        let offset = (page - 1) * pageSize;
        let { count, rows } = await db.Player.findAndCountAll({
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
        return funcReturn("players", 0, data);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const deletePlayerService = async (code) => {
    try {
        let check = await handleCheckExits(code);
        let path = check.avatar_url.split("/images/")[1];
        if (handleRemoveAvatar(path)) {
            await db.Player.destroy({
                where: { code: code },
            });

            return funcReturn("delete player successfully", 0, []);
        }
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updatePlayerService = async (data) => {
    try {
        if (!data.isChangeFile) {
            await db.Player.update(
                {
                    code: data.code,
                    name: data.name,
                    description: data.description,
                    des_text: data.des_text,
                    nationality: data.nationality,
                    height: data.height,
                    weight: data.weight,
                    birthday: data.birthday,
                    location: data.location,
                    teamId: data.teamId,
                },
                {
                    where: { id: data.id },
                }
            );
            return funcReturn("update player successfully", 0, []);
        }

        let path = data.avatar_url.split("/images/")[1];

        if (!handleRemoveAvatar(path)) {
            return funcReturn("can not remove avatar old", 1, []);
        }

        await db.Player.update(
            {
                code: data.code,
                name: data.name,
                description: data.description,
                des_text: data.des_text,
                nationality: data.nationality,
                height: data.height,
                weight: data.weight,
                birthday: data.birthday,
                teamId: data.teamId,
                avatar_url: `/images/${data.avatar}`,
                isActive: data.isActive,
                location: data.location,
            },
            { where: { id: data.id } }
        );

        return funcReturn("update player successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const searchPlayerService = async (textSearch) => {
    try {
        let checkType = textSearch / 1;
        let players;

        if (checkType) {
            players = await db.Player.findAll({
                where: { code: { [Op.like]: "%" + textSearch + "%" } },
            });
        } else {
            players = await db.Player.findAll({
                where: { name: { [Op.like]: "%" + textSearch + "%" } },
            });
        }

        return funcReturn("players", 0, players);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getPlayerActiveService = async () => {
    try {
        let players = await db.Player.findAll({
            where: { isActive: true },
            include: [{ model: db.Team }],
        });
        return funcReturn("all players", 0, players);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getOnePlayerService = async (id) => {
    try {
        let player = await db.Player.findOne({
            where: { id: id },
            include: [
                {
                    model: db.Team,
                    attributes: ["name"],
                },
            ],
        });
        return funcReturn("players", 0, player);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getPlayerDetailSeason = async (hostId, guestId) => {
    try {
        let players = await db.Player.findAll({
            where: {
                [Op.or]: [{ teamId: hostId }, { teamId: guestId }],
            },
        });

        return funcReturn("players", 0, players);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

module.exports = {
    createPlayerService,
    deletePlayerService,
    getAllPlayerService,
    getLimitPlayerService,
    getOnePlayerService,
    getPlayerActiveService,
    searchPlayerService,
    updatePlayerService,
    getPlayerDetailSeason,
};
