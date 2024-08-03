import db from "../models/index.mjs";
import returnErrService from "../helps/returnErrService.mjs";
import funcReturn from "../helps/funcReturn.mjs";

const handleGetLikeFeedbackService = async (feedbackId, userId) => {
    try {
        let like = await db.LikeFeedback.findOne({
            where: {
                feedbackId: feedbackId,
                userId: userId,
            },
        });

        if (like) {
            return funcReturn("exit", 1, []);
        }

        return funcReturn("not exit ", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const handleCreateLikeFeedback = async (feedbackId, userId) => {
    try {
        await db.LikeFeedback.create({
            feedbackId: feedbackId,
            userId: userId,
        });

        return funcReturn("create successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const handleDeleteLikeFeedback = async (feedbackId, userId) => {
    try {
        await db.LikeFeedback.destroy({
            where: { feedbackId: feedbackId, userId: userId },
        });

        return funcReturn("delete successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const handleDeleteLikeFeedbackById = async (feedbackId) => {
    try {
        await db.LikeFeedback.destroy({
            where: { feedbackId: feedbackId },
        });

        return funcReturn("delete successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

module.exports = {
    handleGetLikeFeedbackService,
    handleCreateLikeFeedback,
    handleDeleteLikeFeedback,
    handleDeleteLikeFeedbackById,
};
