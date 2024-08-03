import funcReturn from "../helps/funcReturn";
import returnErrService from "../helps/returnErrService";
import returnInfoEmpty from "../helps/returnInfoEmpty";
import stadiumService from "../service/stadiumService";

class stadiumController {
    async handleCreateStadium(req, res) {
        const stadium = JSON.parse(JSON.stringify(req.body));

        try {
            if (!stadium.name || !stadium.location) {
                return res.status(404).json(returnInfoEmpty());
            }

            let dataBuider = {
                name: stadium.name,
                location: stadium.location,
                stadiumImage_url: req.file.filename,
            };

            let fetch = await stadiumService.createStadiumService(dataBuider);
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

    async handleGetStadium(req, res) {
        try {
            let fetch = await stadiumService.getStadiumService();
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

    async handleDeleteStadium(req, res) {
        try {
            let fetch = await stadiumService.deleteStadiumService(
                +req.query.id
            );
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

    async handleUpdateStadium(req, res) {
        try {
            let stadium = JSON.parse(JSON.stringify(req.body));

            if (!stadium.name || !stadium.id || !stadium.location) {
                return res.status(404).json(returnInfoEmpty());
            }

            let dataBuider = {
                ...stadium,
                id: +stadium.id,
            };

            if (stadium.isChangeFile) {
                dataBuider.stadiumImage = req?.file?.filename;
            }

            let fetch = await stadiumService.updateStadiumService(dataBuider);
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

module.exports = new stadiumController();
