import db from "../models/index";
import returnErrService from "../helps/returnErrService";
import funcReturn from "../helps/funcReturn";

const handleGetLikeCommentService = async (commentId, userId) => {
    try {
        let like = await db.LikeComment.findOne({
            where: {
                commentId: commentId,
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

const handleCreateLikeComment = async (commentId, userId) => {
    try {
        await db.LikeComment.create({
            commentId: commentId,
            userId: userId,
        });

        return funcReturn("create successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const handleDeleteLikeComment = async (commentId, userId) => {
    try {
        await db.LikeComment.destroy({
            where: { commentId: commentId, userId: userId },
        });

        return funcReturn("delete successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const handleDeleteLikeCommentByCommentId = async (commentId) => {
    try {
        await db.LikeComment.destroy({
            where: { commentId: commentId },
        });

        return funcReturn("delete successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

module.exports = {
    handleGetLikeCommentService,
    handleCreateLikeComment,
    handleDeleteLikeComment,
    handleDeleteLikeCommentByCommentId,
};
