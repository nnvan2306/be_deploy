import db from "../models/index.mjs";
import returnErrService from "../helps/returnErrService.mjs";
import funcReturn from "../helps/funcReturn.mjs";
import likeFeedbackService from "./likeFeedbackservice.mjs";
import dislikeFeedbackService from "./dislikeFeedbackService.mjs";

const handleGetOneFeedback = async (id) => {
    let feedback = await db.Feedback.findOne({
        where: { id: id },
    });

    return feedback;
};

const createFeedbackService = async (
    data,
    type = "ref",
    getLimitCommentService
) => {
    try {
        await db.Feedback.create({
            like: 0,
            disLike: 0,
            content: data.content,
            commentId: data.commentId,
            userId: data.userId,
        });

        if (type !== "ref") {
            return getLimitCommentService(1, 10, +data.matchId);
        }

        return funcReturn("create success", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getAllFeedbackService = async () => {
    try {
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getLimitFeedbackService = async (page, pageSize) => {
    try {
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const deleteFeedbackService = async (
    data,
    type = "ref",
    getLimitCommentService
) => {
    try {
        await db.Feedback.destroy({
            where: { id: +data.feedbackId },
        });

        await likeFeedbackService.handleDeleteLikeFeedbackById(
            +data.feedbackId
        );
        await dislikeFeedbackService.handleDeleteDislikeFeedbackById(
            +data.feedbackId
        );

        if (type !== "ref") {
            return getLimitCommentService(1, 10, +data.matchId);
        }

        return funcReturn("delete successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateLikeFeedbackService = async (
    data,
    type = "ref",
    getLimitCommentService
) => {
    try {
        let feedback = await handleGetOneFeedback(+data.feedbackId);

        if (!feedback) {
            return funcReturn("comment is not exits ", 1, []);
        }

        let countLikeNew = feedback.like;
        let countDislikeNew = feedback.disLike;

        let likeFeedback =
            await likeFeedbackService.handleGetLikeFeedbackService(
                +data.feedbackId,
                +data.userId
            );

        if (likeFeedback.errorCode) {
            let deleteLikeFeedback =
                await likeFeedbackService.handleDeleteLikeFeedback(
                    +data.feedbackId,
                    +data.userId
                );
            if (deleteLikeFeedback.errorCode) {
                return funcReturn("delete like feedback err", 1, []);
            }

            countLikeNew = countLikeNew - 1;
        } else {
            let checkDislikeExit =
                await dislikeFeedbackService.handleGetDisLikeFeedbackService(
                    +data.feedbackId,
                    +data.userId
                );

            if (checkDislikeExit.errorCode) {
                let deleteDislikeFeedback =
                    await dislikeFeedbackService.handleDeleteDislikeFeedback(
                        +data.feedbackId,
                        +data.userId
                    );

                if (deleteDislikeFeedback.errorCode) {
                    return funcReturn("delete dislike feedback err", 1, []);
                }
                countDislikeNew = countDislikeNew - 1;
            }

            countLikeNew = countLikeNew + 1;

            let createLikeFeedback =
                await likeFeedbackService.handleCreateLikeFeedback(
                    +data.feedbackId,
                    +data.userId
                );
            if (createLikeFeedback.errorCode) {
                return funcReturn("create like feedback err", 1, []);
            }
        }

        await db.Feedback.update(
            {
                like: countLikeNew,
                disLike: countDislikeNew,
            },
            { where: { id: +data.feedbackId } }
        );

        if (type !== "ref") {
            return getLimitCommentService(1, 10, +data.matchId);
        }

        return funcReturn("update success", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateDisLikeFeedbackService = async (
    data,
    type = "ref",
    getLimitCommentService
) => {
    try {
        let feedback = await handleGetOneFeedback(+data.feedbackId);

        if (!feedback) {
            return funcReturn("feedback is not exits ", 1, []);
        }

        let countLikeNew = feedback.like;
        let countDislikeNew = feedback.disLike;

        let dislikeFeedback =
            await dislikeFeedbackService.handleGetDisLikeFeedbackService(
                +data.feedbackId,
                +data.userId
            );

        if (dislikeFeedback.errorCode) {
            let deleteDisLikeFeedback =
                await dislikeFeedbackService.handleDeleteDislikeFeedback(
                    +data.feedbackId,
                    +data.userId
                );
            if (deleteDisLikeFeedback.errorCode) {
                return funcReturn("delete dislike feedback err", 1, []);
            }

            countDislikeNew = countDislikeNew - 1;
        } else {
            let checkLikeExit =
                await likeFeedbackService.handleGetLikeFeedbackService(
                    +data.feedbackId,
                    +data.userId
                );

            if (checkLikeExit.errorCode) {
                let deleteLikeFeedback =
                    await likeFeedbackService.handleDeleteLikeFeedback(
                        +data.feedbackId,
                        +data.userId
                    );

                if (deleteLikeFeedback.errorCode) {
                    return funcReturn("delete like feedback err", 1, []);
                }
                countLikeNew = countLikeNew - 1;
            }

            countDislikeNew = countDislikeNew + 1;

            let createDislikeFeedback =
                await dislikeFeedbackService.handleCreateDislikeFeedback(
                    +data.feedbackId,
                    +data.userId
                );
            if (createDislikeFeedback.errorCode) {
                return funcReturn("create dislike feedback err", 1, []);
            }
        }

        await db.Feedback.update(
            {
                like: countLikeNew,
                disLike: countDislikeNew,
            },
            { where: { id: +data.feedbackId } }
        );

        if (type !== "ref") {
            return getLimitCommentService(1, 10, +data.matchId);
        }

        return funcReturn("update success", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

export const deleteFeedbackByCommentId = async (commentId) => {
    try {
        await db.Feedback.destroy({
            where: {
                commentId: commentId,
            },
        });

        return funcReturn("delete success", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

export {
    createFeedbackService,
    getAllFeedbackService,
    getLimitFeedbackService,
    deleteFeedbackService,
    updateLikeFeedbackService,
    updateDisLikeFeedbackService,
    deleteFeedbackByCommentId,
};
