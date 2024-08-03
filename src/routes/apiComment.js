import commentController from "../controller/CommentController";
import express from "express";

const router = express.Router();

const initApiComment = (app) => {
    router.post("/create-comment", commentController.handleCreateComment);
    router.get("/get-comment", commentController.handleGetComment);
    router.delete("/delete-comment", commentController.handleDeleteComment);
    router.patch("/like-comment", commentController.handleLikeComment);
    router.patch("/dislike-comment", commentController.handleDislikeComment);

    return app.use("/v1", router);
};

export default initApiComment;
