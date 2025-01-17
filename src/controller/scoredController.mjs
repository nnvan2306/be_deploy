import funcReturn from "../helps/funcReturn.mjs";
import returnErrService from "../helps/returnErrService.mjs";
import * as scoredService from "../service/scoredService.mjs";
import returnInfoEmpty from "../helps/returnInfoEmpty.mjs";

class scoredController {
    async handleGetScored(req, res) {
        try {
            const fetch = await scoredService.getScoredService(
                req.query.matchId
            );
            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleDeleteScored(req, res) {
        try {
            const fetch = await scoredService.deleteScoredService(req.query.id);
            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleCreateScored(req, res) {
        try {
            let data = req.body;
            if (
                !data.teamId ||
                !data.matchId ||
                !data.minuteGoal ||
                !data.namePlayer
            ) {
                return res.status(400).json(returnInfoEmpty());
            }

            let fetch = await scoredService.createScoredService(data);

            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleUpdateScored(req, res) {
        try {
            let data = req.body;
            if (
                !data.teamId ||
                !data.matchId ||
                !data.minuteGoal ||
                !data.namePlayer
            ) {
                return res.status(400).json(returnInfoEmpty());
            }

            let fetch = await scoredService.updateScoredService(data);
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
}

export default new scoredController();
