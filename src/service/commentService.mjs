import db from "../models/index.mjs";
import returnErrService from "../helps/returnErrService.mjs";
import funcReturn from "../helps/funcReturn.mjs";
import likeCommentService from "./likeCommentService.mjs";
import dislikeCommentService from "./dislikeCommentService.mjs";
import feedbackService from "./feedbackService.mjs";

const handleGetOneComment = async (id) => {
    let comment = await db.Comment.findOne({
        where: { id: id },
    });

    return comment;
};

const createCommentService = async (data, type = "ref") => {
    try {
        await db.Comment.create({
            content: data.content,
            like: 0,
            disLike: 0,
            matchId: data.matchId,
            userId: data.userId,
        });

        if (type !== "ref") {
            return getLimitCommentService(1, 10, data.matchId);
        }
        return funcReturn("create comment successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getAllCommentService = async () => {
    try {
        let comments = await db.Comment.findAll({
            include: [{ model: db.User }, { model: db.Feedback }],
        });

        return funcReturn("all comment", 0, comments);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getLimitCommentService = async (page, pageSize, matchId) => {
    try {
        // let offset = (page - 1) * pageSize;

        // let { count, rows } = await db.Comment.findAndCountAll({
        //     where: { matchId: matchId },
        //     include: [{ model: db.User }, { model: db.Feedback }],
        //     offset: offset,
        //     limit: pageSize,
        // });

        // let data = {
        //     items: rows,
        //     meta: {
        //         currentPage: page,
        //         totalIteams: count,
        //         totalPages: Math.ceil(count / pageSize),
        //     },
        // };

        let start = (page - 1) * pageSize;
        let comments = await db.Comment.findAll({
            where: { matchId: matchId },
            include: [
                { model: db.User },
                {
                    model: db.Feedback,
                    include: [
                        { model: db.User },
                        { model: db.LikeFeedback },
                        { model: db.DislikeFeedback },
                    ],
                },
                { model: db.LikeComment },
                { model: db.DislikeComment },
            ],
        });

        let data = {
            items: comments.filter(
                (item, index) => index >= start && index < start + pageSize
            ),
            meta: {
                currentPage: page,
                totalIteams: comments.length,
                totalPages: Math.ceil(comments.length / pageSize),
            },
        };

        return funcReturn("comments", 0, data);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateLikeCommentService = async (data, type = "ref") => {
    try {
        let comment = await handleGetOneComment(data.commentId);

        if (!comment) {
            return funcReturn("comment is not exits ", 1, []);
        }

        let countLikeNew = comment.like;
        let countDislikeNew = comment.disLike;

        let likeComment = await likeCommentService.handleGetLikeCommentService(
            data.commentId,
            data.userId
        );

        if (likeComment.errorCode) {
            let deleteLikeComment =
                await likeCommentService.handleDeleteLikeComment(
                    data.commentId,
                    data.userId
                );
            if (deleteLikeComment.errorCode) {
                return funcReturn("delete likeComment err", 1, []);
            }

            countLikeNew = countLikeNew - 1;
        } else {
            let checkDislikeExit =
                await dislikeCommentService.handleGetDisLikeCommentService(
                    data.commentId,
                    data.userId
                );

            if (checkDislikeExit.errorCode) {
                let deleteDislikeComment =
                    await dislikeCommentService.handleDeleteDislikeComment(
                        data.commentId,
                        data.userId
                    );

                if (deleteDislikeComment.errorCode) {
                    return funcReturn("delete dislike comment err", 1, []);
                }
                countDislikeNew = countDislikeNew - 1;
            }

            countLikeNew = countLikeNew + 1;

            let createLikeComment =
                await likeCommentService.handleCreateLikeComment(
                    data.commentId,
                    data.userId
                );
            if (createLikeComment.errorCode) {
                return funcReturn("create like comment err", 1, []);
            }
        }

        await db.Comment.update(
            {
                like: countLikeNew,
                disLike: countDislikeNew,
            },
            { where: { id: data.commentId } }
        );

        if (type !== "ref") {
            return getLimitCommentService(1, 10, data.matchId);
        }

        return funcReturn("update success", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateDisLikeCommentService = async (data, type = "ref") => {
    try {
        let comment = await handleGetOneComment(data.commentId);

        if (!comment) {
            return funcReturn("comment is not exits ", 1, []);
        }

        let countLikeNew = comment.like;
        let countDislikeNew = comment.disLike;

        let dislikeComment =
            await dislikeCommentService.handleGetDisLikeCommentService(
                data.commentId,
                data.userId
            );

        if (dislikeComment.errorCode) {
            let deleteDisLikeComment =
                await dislikeCommentService.handleDeleteDislikeComment(
                    data.commentId,
                    data.userId
                );
            if (deleteDisLikeComment.errorCode) {
                return funcReturn("delete dislike Comment err", 1, []);
            }

            countDislikeNew = countDislikeNew - 1;
        } else {
            let checkLikeExit =
                await likeCommentService.handleGetLikeCommentService(
                    data.commentId,
                    data.userId
                );

            if (checkLikeExit.errorCode) {
                let deleteLikeComment =
                    await likeCommentService.handleDeleteLikeComment(
                        data.commentId,
                        data.userId
                    );

                if (deleteLikeComment.errorCode) {
                    return funcReturn("delete like comment err", 1, []);
                }
                countLikeNew = countLikeNew - 1;
            }

            countDislikeNew = countDislikeNew + 1;

            let createDislikeComment =
                await dislikeCommentService.handleCreateDislikeComment(
                    data.commentId,
                    data.userId
                );
            if (createDislikeComment.errorCode) {
                return funcReturn("create dislike comment err", 1, []);
            }
        }

        await db.Comment.update(
            {
                like: countLikeNew,
                disLike: countDislikeNew,
            },
            { where: { id: data.commentId } }
        );

        if (type !== "ref") {
            return getLimitCommentService(1, 10, data.matchId);
        }

        return funcReturn("update success", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const deleteCommentService = async (data, type = "ref") => {
    try {
        await db.Comment.destroy({
            where: { id: data.commentId },
        });

        await likeCommentService.handleDeleteLikeCommentByCommentId(
            data.commentId
        );
        await dislikeCommentService.handleDeleteDislikeCommentByCommentId(
            data.commentId
        );

        await feedbackService.deleteFeedbackByCommentId(data.commentId);

        if (type !== "ref") {
            return getLimitCommentService(1, 10, data.matchId);
        }

        return funcReturn("delete successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

module.exports = {
    createCommentService,
    getAllCommentService,
    getLimitCommentService,
    deleteCommentService,
    updateLikeCommentService,
    updateDisLikeCommentService,
};
