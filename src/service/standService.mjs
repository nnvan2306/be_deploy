import db from "../models/index.mjs";
import returnErrService from "../helps/returnErrService.mjs";
import funcReturn from "../helps/funcReturn.mjs";

const handleCheckExits = async (array) => {
    for (const item of array) {
        {
            let stand = await db.Stand.findOne({
                where: { name: item.name, stadiumId: item.stadiumId },
            });
            if (stand) {
                return item.name;
            }
        }
    }
    return false;
};

const createStandService = async (data) => {
    try {
        //check exits
        let stand = await handleCheckExits(data);
        if (stand) {
            return funcReturn(`stand ${stand} is exits !`, 1, []);
        }

        //check duplicate
        for (let i = 0; i < data.length - 1; i++) {
            for (let j = i + 1; j < data.length; j++) {
                if (data[i].name === data[j].name) {
                    return funcReturn(`stands mustn't duplicate `, 1, []);
                }
            }
        }

        //create
        for (const item of data) {
            await db.Stand.create({
                name: item.name,
                isReady: item.isReady,
                isVipDefault: item.isVipDefault,
                priceDefault: item.priceDefault,
                totalTicketDefault: item.totalTicketDefault,
                stadiumId: item.stadiumId,
            });
        }

        return funcReturn("create successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const deleteStandService = async (data) => {
    try {
        // console.log("data>>>>>>", data);
        data.forEach(async (item) => {
            await db.Stand.destroy({
                where: { id: item.id },
            });
        });

        return funcReturn("delete successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getStandService = async (stadiumId) => {
    try {
        let stands = await db.Stand.findAll({
            where: {
                stadiumId: stadiumId,
            },
        });

        return funcReturn("stands", 0, stands);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateStandService = async (data) => {
    try {
        data.forEach(async (item) => {
            await db.Stand.update(
                {
                    name: item.name,
                    isReady: item.isReady,
                    isVipDefault: item.isVipDefault,
                    priceDefault: item.priceDefault,
                    totalTicketDefault: item.totalTicketDefault,
                    stadiumId: item.stadiumId,
                },
                {
                    where: { id: item.id },
                }
            );
        });

        return funcReturn("update stand successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

exports = {
    createStandService,
    deleteStandService,
    getStandService,
    updateStandService,
};
