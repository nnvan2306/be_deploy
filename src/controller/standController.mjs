import funcReturn from "../helps/funcReturn.mjs";
import returnErrService from "../helps/returnErrService.mjs";
import returnInfoEmpty from "../helps/returnInfoEmpty.mjs";
import * as standService from "../service/standService.mjs";

class standController {
    async handleCreateStand(req, res) {
        try {
            let stand = req.body;

            stand.forEach((item) => {
                if (
                    !item.name ||
                    !item.priceDefault ||
                    !item.totalTicketDefault ||
                    !item.stadiumId
                ) {
                    return res.status(404).json(returnInfoEmpty());
                }
            });

            let fetch = await standService.createStandService(stand);
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

    async handleDeleteStand(req, res) {
        try {
            let stands = req.body;
            if (stands.length === 0) {
                return res.status(404).json(returnInfoEmpty());
            }

            let fetch = await standService.deleteStandService(stands);
            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleGetStand(req, res) {
        try {
            let fetch = await standService.getStandService(
                +req.query.stadiumId
            );

            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleUpdateStand(req, res) {
        try {
            let stands = req.body;
            stands.forEach((item) => {
                if (
                    !item.id ||
                    !item.name ||
                    !item.priceDefault ||
                    !item.totalTicketDefault
                ) {
                    return res.status(404).json(returnInfoEmpty());
                }
            });

            let fetch = await standService.updateStandService(stands);

            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }
}

module.exports = new standController();
