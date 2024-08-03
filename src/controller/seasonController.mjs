import funcReturn from "../helps/funcReturn.mjs";
import returnErrService from "../helps/returnErrService.mjs";
import returnInfoEmpty from "../helps/returnInfoEmpty.mjs";
import seasonService from "../service/seasonService";

class seasonController {
    async handleCreateSeason(req, res) {
        const season = req.body;
        try {
            //validate

            if (
                !season.index ||
                !season.name ||
                !season.description ||
                !season.des_text
            ) {
                return res.status(400).json(returnInfoEmpty());
            }

            //create season

            let fetch = await seasonService.createSeasonService(season);

            return res
                .status(
                    fetch?.errorCode === 0
                        ? 200
                        : fetch?.errorCode === 1
                        ? 400
                        : 500
                )
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleGetLimitSeasons(req, res) {
        try {
            let fetch;
            if (req.query.page && req.query.pageSize) {
                let page = req.query.page;
                let pageSize = req.query.pageSize;

                fetch = await seasonService.getSeasonLimitService(
                    +page,
                    +pageSize
                );
            } else {
                fetch = await seasonService.getAllSeasonsService();
            }
            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleDeleteSeason(req, res) {
        try {
            let fetch = await seasonService.deleteSeasonService(
                req.query.index
            );
            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleUpdateSeason(req, res) {
        try {
            let fetch = await seasonService.updateSeasonService(req.body);
            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }
}

module.exports = new seasonController();
