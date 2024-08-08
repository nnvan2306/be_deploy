import funcReturn from "../helps/funcReturn.mjs";
import returnErrService from "../helps/returnErrService.mjs";
import returnInfoEmpty from "../helps/returnInfoEmpty.mjs";
import * as matchService from "../service/matchService.mjs";

class matchController {
    async handleCreateMatch(req, res) {
        try {
            let data = req.body;
            // let data = JSON.stringify(req.body);
            console.log("run");

            if (
                !data.title ||
                !data.meta ||
                !data.date ||
                !data.hour ||
                !data.hostId ||
                !data.guestId ||
                !data.seasonId ||
                data.hostId === data.guestId ||
                !req.file
            ) {
                return res.status(404).json(returnInfoEmpty());
            }

            let dataBuider = {
                ...req.body,
                match_url: req.file.filename,
            };

            console.log(dataBuider);

            let fetch = await matchService.createMatchService(dataBuider);

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

    async handleGetMatch(req, res) {
        try {
            let matchs;
            if (req.query.page && req.query.pageSize && req.query.q) {
                matchs = await matchService.getMatchDetailSeasonService(
                    +req.query.page,
                    +req.query.pageSize,
                    +req.query.q
                );
            } else {
                matchs = await matchService.getAllMatchService();
            }

            return res
                .status(
                    matchs.errorCode === 0
                        ? 200
                        : matchs.errorCode === 1
                        ? 400
                        : 500
                )
                .json(
                    funcReturn(matchs.message, matchs.errorCode, matchs.data)
                );
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleDeleteMatch(req, res) {
        try {
            if (!req.query.id) {
                return res
                    .status(404)
                    .json(funcReturn("id match musn't empty !", 1, []));
            }

            let fetch = await matchService.deleteMatchService(req.query.id);

            return res
                .status(200)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleUpdateMatch(req, res) {
        try {
            let match = req.body;

            if (
                !match.id ||
                !match.title ||
                !match.meta ||
                !match.date ||
                !match.hour ||
                !match.hostId ||
                !match.guestId ||
                !match.seasonId ||
                match.hostId === match.guestId
            ) {
                return res.status(404).json(returnInfoEmpty());
            }

            let dataBuider = {
                ...match,
            };

            if (match.isChangeFile) {
                dataBuider.match = req?.file?.filename;
            }
            let fetch = await matchService.updateMatchService(dataBuider);
            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleSearchMatch(req, res) {
        try {
            if (
                !+req.query.seasonId &&
                !+req.query.hostId &&
                !+req.query.guestId
            ) {
                return res.status(200).json(funcReturn("empty", 0, []));
            }

            let dataBuider = {
                seasonId: +req.query.seasonId,
                hostId: +req.query.hostId,
                guestId: +req.query.guestId,
            };

            let fetch = await matchService.searchMatchService(dataBuider);

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

    async handleGetMAtchById(req, res) {
        try {
            let fetch = await matchService.getMatchByIdService(req.query.id);
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

export default new matchController();
