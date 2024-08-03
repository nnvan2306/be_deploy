import funcReturn from "../helps/funcReturn.mjs";
import returnErrService from "../helps/returnErrService.mjs";
import returnInfoEmpty from "../helps/returnInfoEmpty.mjs";
import * as playerService from "../service/playerService.mjs";

class playerController {
    async handleCreatePlayer(req, res) {
        let player = JSON.parse(JSON.stringify(req.body));
        try {
            //validate
            if (
                !player?.code ||
                !player?.name ||
                !player?.nationality ||
                !player?.height ||
                !player?.weight ||
                !player?.birthday ||
                !player?.teamId ||
                !player?.description ||
                !player?.des_text ||
                !player?.location ||
                !req.file
            ) {
                return res.status(400).json(returnInfoEmpty());
            }

            let dataBuider = {
                ...player,
                code: +player?.code,
                height: +player?.height,
                weight: +player?.weight,
                location: +player?.location,
                teamId: +player?.teamId,
                avatar_url: req.file.filename,
            };

            let fetch = await playerService.createPlayerService(dataBuider);
            return res
                .status(
                    fetch.errorCode === 0
                        ? 200
                        : fetch.errorCode === 1
                        ? 400
                        : 500
                )
                .json({
                    message: fetch.message,
                    errorCode: fetch.errorCode,
                    data: fetch.data,
                });
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleGetPlayers(req, res) {
        let player = req.query;
        try {
            let players;
            if (player.page && player.pageSize) {
                let page = player.page;
                let pageSize = player.pageSize;

                players = await playerService.getLimitPlayerService(
                    +page,
                    +pageSize
                );
            } else {
                players = await playerService.getAllPlayerService();
            }

            return res.status(players.errorCode === 0 ? 200 : 500).json({
                message: players.message,
                errorCode: players.errorCode,
                data: players.data,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleDeletePlayer(req, res) {
        try {
            let player = req.query.code;
            if (player) {
                let fetch = await playerService.deletePlayerService(player);
                return res.status(200).json({
                    message: fetch.message,
                    errorCode: fetch.errorCode,
                    data: fetch.data,
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleUpdatePlayer(req, res) {
        let player = JSON.parse(JSON.stringify(req.body));
        try {
            if (
                !player.id ||
                !player.code ||
                !player.name ||
                !player.description ||
                !player.des_text ||
                !player.nationality ||
                !player.height ||
                !player.weight ||
                !player.birthday ||
                !player.teamId ||
                !player.location ||
                !player.avatar_url
            ) {
                console.log("err");
                return res.status(400).json(returnInfoEmpty());
            }

            let dataBuider = {
                ...player,
                player: +player.id,
                code: +player?.code,
                height: +player?.height,
                weight: +player?.weight,
                location: +player?.location,
                teamId: +player?.teamId,
                isChangeFile: JSON.parse(player.isChangeFile),
            };
            if (player.isChangeFile) {
                dataBuider.avatar = req?.file?.filename;
            }

            let fetch = await playerService.updatePlayerService(dataBuider);
            return res.status(fetch.errorCode === 0 ? 200 : 500).json({
                message: fetch.message,
                errorCode: fetch.errorCode,
                data: fetch.data,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleSearchPlayer(req, res) {
        try {
            let search = req.query;

            if (search.q) {
                let textSearch = search.q;

                let fetch = await playerService.searchPlayerService(textSearch);

                return res.status(fetch.errorCode === 0 ? 200 : 500).json({
                    message: fetch.message,
                    errorCode: fetch.errorCode,
                    data: fetch.data,
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleGetPlayerActive(req, res) {
        try {
            let players = await playerService.getPlayerActiveService();

            return res.status(players.errorCode === 0 ? 200 : 500).json({
                message: players.message,
                errorCode: players.errorCode,
                data: players.data,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleGetOnePlayer(req, res) {
        try {
            let fetch = await playerService.getOnePlayerService(
                req.query.playerId
            );
            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleGetPlayerDetailSeason(req, res) {
        try {
            let fetch = await playerService.getPlayerDetailSeason(
                +req.query.hostId,
                +req.query.guestId
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

module.exports = new playerController();
