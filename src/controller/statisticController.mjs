import funcReturn from "../helps/funcReturn.mjs";
import returnErrService from "../helps/returnErrService.mjs";
import returnInfoEmpty from "../helps/returnInfoEmpty.mjs";
import statisticService from "../service/statisticService";

class statisticController {
    async handleGetStatisticPlayer(req, res) {
        try {
            if (req.query.id) {
                let fetch = await statisticService.getStatisticPlayerService(
                    req.query.id
                );

                return res
                    .status(fetch.errorCode === 0 ? 200 : 500)
                    .json(
                        funcReturn(fetch.message, fetch.errorCode, fetch.data)
                    );
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleCreateStatistic(req, res) {
        try {
            if (
                !req.body.seasonId ||
                !req.body.playerId ||
                !req.body.seasonName
            ) {
                return res.status(400).json(returnInfoEmpty());
            }

            let dataBuider = { ...req.body, seasonId: +req.body.seasonId };
            let fetch = await statisticService.createStatisticService(
                dataBuider
            );
            return res
                .status(
                    fetch.errorCode === 0
                        ? 200
                        : fetch.errorCode === 1
                        ? 404
                        : 500
                )
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleUpdateStatistic(req, res) {
        try {
            if (
                !req.body.seasonId ||
                !req.body.playerId ||
                !req.body.id ||
                !req.body.seasonName
            ) {
                return res.status(400).json(returnInfoEmpty());
            }

            let fetch = await statisticService.updateStatisticService(req.body);

            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async deleteStatistic(req, res) {
        try {
            if (!req.query.id) {
                return res.status(400).json(returnInfoEmpty());
            }

            let fetch = await statisticService.deleteStatisticService(
                req.query.id
            );

            return res
                .status(
                    fetch.errorCode === 0
                        ? 200
                        : fetch.errorCode === 1
                        ? 404
                        : 500
                )
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleGetStatisticSeason(req, res) {
        try {
            let fetch = await statisticService.getStatisticSeasonService(
                req.query.seasonId
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

module.exports = new statisticController();
