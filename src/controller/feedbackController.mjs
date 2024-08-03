import funcReturn from "../helps/funcReturn.mjs";
import returnErrService from "../helps/returnErrService.mjs";
import returnInfoEmpty from "../helps/returnInfoEmpty.mjs";
import * as feedbackService from "../service/feedbackService.mjs";

class feedbackController {
    async handleCreateFeedback(req, res) {
        try {
            let data = req.body;
            if (!data.content || !data.commentId || !data.userId) {
                return res.status(404).json(returnInfoEmpty());
            }

            let dataBuider = {
                content: data.content,
                commentId: +data.commentId,
                userId: +data.userId,
                matchId: +data.matchId,
            };

            let fetch = await feedbackService.createFeedbackService(dataBuider);
            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleGetFeedback(req, res) {
        try {
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleDeleteFeedback(req, res) {
        try {
            if (!req.query.feedbackId) {
                return res.status(404).json(returnInfoEmpty());
            }

            let dataBuider = {
                feedbackId: +req.query.feedbackId,
                matchId: +req.query.matchId,
            };

            let fetch = await feedbackService.deleteFeedbackService(dataBuider);

            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleLikeFeedback(req, res) {
        try {
            if (!req.body.feedbackId || !req.body.userId) {
                return res.status(404).json(returnInfoEmpty());
            }

            let dataBuider = {
                feedbackId: +req.body.feedbackId,
                userId: +req.body.userId,
                matchId: +req.body.matchId,
            };

            let fetch = await feedbackService.updateLikeFeedbackService(
                dataBuider
            );

            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleDislikeFeedback(req, res) {
        try {
            if (!req.body.feedbackId || !req.body.userId) {
                return res.status(404).json(returnInfoEmpty());
            }

            let dataBuider = {
                feedbackId: +req.body.feedbackId,
                userId: +req.body.userId,
                matchId: +req.body.matchId,
            };

            let fetch = await feedbackService.updateDisLikeFeedbackService(
                dataBuider
            );

            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }
}

module.exports = new feedbackController();
