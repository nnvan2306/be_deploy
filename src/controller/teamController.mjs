import returnErrService from "../helps/returnErrService.mjs";
import returnInfoEmpty from "../helps/returnInfoEmpty.mjs";
import teamService from "../service/teamService";

class teamController {
    async handleCreateTeam(req, res) {
        const team = JSON.parse(JSON.stringify(req.body));
        try {
            //validate
            if (
                !team.code ||
                !team.name ||
                !team.description ||
                !team.des_text ||
                !req.file
            ) {
                return res.status(400).json(returnInfoEmpty());
            }

            let dataBuider = {
                code: team.code,
                name: team.name,
                logo_url: req.file.filename,
                description: team.description,
                des_text: team.des_text,
            };

            //create
            let createTeam = await teamService.createTeamService(dataBuider);

            return res
                .status(
                    createTeam?.errorCode === 0
                        ? 200
                        : createTeam?.errorCode === 1
                        ? 400
                        : 500
                )
                .json({
                    message: createTeam?.message,
                    errorCode: createTeam?.errorCode,
                    data: createTeam?.data,
                });
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleGetTeam(req, res) {
        try {
            let team = req.query;
            let fetch;
            if (team.page && team.pageSize) {
                let page = team.page;
                let pageSize = team.pageSize;

                fetch = await teamService.getTeamLimitService(+page, +pageSize);
            } else {
                fetch = await teamService.getAllTeamService();
            }
            return res.status(fetch.errorCode === 0 ? 200 : 400).json({
                message: fetch.message,
                errorCode: fetch.errorCode,
                data: fetch.data,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleDeleteTeam(req, res) {
        try {
            let code = req.query.code;
            if (code) {
                let fetch = await teamService.deleteTeamService(code);
                return res.status(fetch.errorCode === 0 ? 200 : 500).json({
                    message: fetch.message,
                    errorCode: fetch.errorCode,
                    data: fetch.data,
                });
            }
        } catch (err) {
            return res.status(500).json(returnErrService());
        }
    }

    async handleUpdateTeam(req, res) {
        const team = JSON.parse(JSON.stringify(req.body));
        try {
            //validate
            if (
                !team.id ||
                !team.code ||
                !team.name ||
                !team.description ||
                !team.des_text
            ) {
                return res.status(400).json(returnInfoEmpty());
            }
            let dataBuider = {
                id: team.id,
                code: team.code,
                name: team.name,
                logo_url: team.logo_url,
                description: team.description,
                des_text: team.des_text,
                isChangeFile: JSON.parse(team.isChangeFile),
            };
            if (team.isChangeFile) {
                dataBuider.logo = req?.file?.filename;
            }
            let fetch = await teamService.updateTeamService(dataBuider);

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

    async handleSearchTeam(req, res) {}
}

module.exports = new teamController();
