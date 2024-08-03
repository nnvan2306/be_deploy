import funcReturn from "../helps/funcReturn.mjs";
import returnErrService from "../helps/returnErrService.mjs";
import returnInfoEmpty from "../helps/returnInfoEmpty.mjs";
import * as ratingService from "../service/ratingService.mjs";

class ratingController {
    async handleCreateRating(req, res) {
        try {
            let rating = req.body;
            if (!rating.seasonId || !rating.teamId) {
                return returnInfoEmpty();
            }

            let fetch = await ratingService.createRatingService(rating);
            return res
                .status(
                    fetch.errorCode === 0
                        ? 200
                        : fetch.errorCode === 1
                        ? 400
                        : 500
                )
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleGetRating(req, res) {
        try {
            let rating;
            if (req.query.seasonId) {
                rating = await ratingService.handleGetRatingSeasonService(
                    +req.query.seasonId
                );
            } else {
                rating = await ratingService.handleGetAllRatingService();
            }
            return res
                .status(
                    rating.errorCode === 0
                        ? 200
                        : rating.errorCode === 1
                        ? 404
                        : 500
                )
                .json(
                    funcReturn(rating.message, rating.errorCode, rating.data)
                );
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleDeleteRating(req, res) {
        try {
            if (!req.query.id) {
                return res
                    .status(404)
                    .json(funcReturn("id mustn't be empty", 1, []));
            }

            let fetch = await ratingService.handleDeleteRatingService(
                req.query.id
            );

            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleUpdateRating(req, res) {
        try {
            if (!req.body.seasonId || !req.body.teamId || !req.body.id) {
                return res.status(404).json(returnInfoEmpty());
            }

            let fetch = await ratingService.handleUpdateRatingService(req.body);

            return res
                .status(
                    fetch.errorCode === 0
                        ? 200
                        : fetch.errorCode === 1
                        ? 400
                        : 500
                )
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }
}

module.exports = new ratingController();
