import {
    createCommentService,
    updateLikeCommentService,
    updateDisLikeCommentService,
    deleteCommentService,
    getLimitCommentService,
} from "./commentService.mjs";

import {
    createFeedbackService,
    deleteFeedbackService,
    updateLikeFeedbackService,
    updateDisLikeFeedbackService,
} from "./feedbackService.mjs";

export const createCommentSocket = async (socket) => {
    socket.on("connected", (value) => {
        if (!value) return;

        socket.on("createComment", async (data) => {
            const comments = await createCommentService(data, "socket");
            socket.emit("reply_suc", comments);
        });

        socket.on("deleteComment", async (data) => {
            const comments = await deleteCommentService(data, "socket");
            socket.emit("deleteCommentSuccess", comments);
        });

        socket.on("likeComment", async (data) => {
            const comments = await updateLikeCommentService(data, "socket");
            socket.emit("likeCommentSuccess", comments);
        });

        socket.on("dislikeComment", async (data) => {
            const comments = await updateDisLikeCommentService(data, "socket");
            socket.emit("dislikeCommentSuccess", comments);
        });

        socket.on("createFeedback", async (data) => {
            const comments = await createFeedbackService(
                data,
                "socket",
                getLimitCommentService
            );
            socket.emit("createFeedbackSuccess", comments);
        });

        socket.on("deleteFeedback", async (data) => {
            const comments = await deleteFeedbackService(
                data,
                "socket",
                getLimitCommentService
            );
            socket.emit("deleteFeedbackSuccess", comments);
        });

        socket.on("likeFeedback", async (data) => {
            const comments = await updateLikeFeedbackService(
                data,
                "socket",
                getLimitCommentService
            );
            socket.emit("likeFeedbackSuccess", comments);
        });

        // dislike feedback

        socket.on("dislikeFeedback", async (data) => {
            const comments = await updateDisLikeFeedbackService(
                data,
                "socket",
                getLimitCommentService
            );
            socket.emit("dislikeFeedbackSuccess", comments);
        });
    });
};
