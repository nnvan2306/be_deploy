import db from "../models/index";
import returnErrService from "../helps/returnErrService.mjs";
import funcReturn from "../helps/funcReturn.mjs";

const handleGetDisLikeFeedbackService = async (feedbackId, userId) => {
    try {
        let dislike = await db.DislikeFeedback.findOne({
            where: {
                feedbackId: feedbackId,
                userId: userId,
            },
        });

        if (dislike) {
            return funcReturn("exit", 1, []);
        }

        return funcReturn("not exit ", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const handleCreateDislikeFeedback = async (feedbackId, userId) => {
    try {
        await db.DislikeFeedback.create({
            feedbackId: feedbackId,
            userId: userId,
        });

        return funcReturn("create successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const handleDeleteDislikeFeedback = async (feedbackId, userId) => {
    try {
        await db.DislikeFeedback.destroy({
            where: { feedbackId: feedbackId, userId: userId },
        });

        return funcReturn("delete successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const handleDeleteDislikeFeedbackById = async (feedbackId) => {
    try {
        await db.DislikeFeedback.destroy({
            where: { feedbackId: feedbackId },
        });

        return funcReturn("delete successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

module.exports = {
    handleGetDisLikeFeedbackService,
    handleCreateDislikeFeedback,
    handleDeleteDislikeFeedback,
    handleDeleteDislikeFeedbackById,
};
