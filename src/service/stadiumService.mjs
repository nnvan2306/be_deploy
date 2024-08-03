import db from "../models/index.mjs";
import returnErrService from "../helps/returnErrService.mjs";
import funcReturn from "../helps/funcReturn.mjs";
import { handleRemoveStadiumImage } from "../middleware/removeImage.mjs";

const handleCheckStadium = async (name) => {
    let stadium = await db.Stadium.findOne({
        where: { name: name },
    });
    return stadium;
};

const handleCheckExits = async (id) => {
    let stadium = await db.Stadium.findOne({
        where: { id: id },
    });

    return stadium;
};

const createStadiumService = async (data) => {
    try {
        let checkExits = await handleCheckStadium(data.name);

        if (checkExits) {
            return funcReturn(`${data.name} is Exits !`, 1, []);
        }
        await db.Stadium.create({
            name: data.name,
            location: data.location,
            stadiumImage_url: `/images/${data.stadiumImage_url}`,
        });

        return funcReturn("create stadium successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getStadiumService = async () => {
    try {
        let stadiums = await db.Stadium.findAll();
        return funcReturn("stadiums ", 0, stadiums);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const deleteStadiumService = async (id) => {
    try {
        let check = await handleCheckExits(id);

        let path = check.stadiumImage_url.split("/images/")[1];

        if (!handleRemoveStadiumImage(path)) {
            return funcReturn("delete error", 1, []);
        }

        await db.Stadium.destroy({
            where: { id: id },
        });

        return funcReturn("delete stadium successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateStadiumService = async (data) => {
    try {
        console.log(data);
        if (!data.isChangeFile) {
            await db.Stadium.update(
                {
                    name: data.name,
                    location: data.location,
                },
                { where: { id: data.id } }
            );
        } else {
            let path = data.stadiumImage_url.split("/images/")[1];
            if (!handleRemoveStadiumImage(path)) {
                return funcReturn("updtae error", 1, []);
            }
            await db.Stadium.update(
                {
                    name: data.name,
                    location: data.location,
                    stadiumImage_url: `/images/${data.stadiumImage}`,
                },
                { where: { id: data.id } }
            );
        }

        return funcReturn("update successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

exports = {
    createStadiumService,
    getStadiumService,
    deleteStadiumService,
    updateStadiumService,
};
