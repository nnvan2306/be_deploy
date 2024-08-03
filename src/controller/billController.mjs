import funcReturn from "../helps/funcReturn.mjs";
import returnErrService from "../helps/returnErrService.mjs";
import returnInfoEmpty from "../helps/returnInfoEmpty.mjs";
import * as billService from "../service/billService.mjs";

class billController {
    async handleCreateBill(req, res) {
        try {
            if (
                !req.body.ticketId ||
                !req.body.totalTicket ||
                !req.body.uuid ||
                !req.body.email ||
                !req.body.phoneNumber ||
                !req.body.firstName ||
                !req.body.lastName ||
                !req.body.address ||
                !req.body.city ||
                !req.body.country
            ) {
                return res.status(404).json(returnInfoEmpty());
            }

            let dataBuider = {
                ...req.body,
                ticketId: +req.body.ticketId,
                totalTicket: +req.body.totalTicket,
            };

            let fetch = await billService.createBillService(dataBuider);

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

    async handleDeleteBill(req, res) {
        try {
            if (!req.query.uuid) {
                return res.status(404).json(returnInfoEmpty());
            }

            let fetch = await billService.deleteBillService(req.query.uuid);

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

    async handleGetBill(req, res) {
        try {
            let fetch;

            if (!req.query.page || !req.query.pageSize) {
                fetch = await billService.getAllBillService();
            } else {
                fetch = await billService.getLimitBillService(
                    +req.query.page,
                    +req.query.pageSize
                );
            }

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

    async handleUpdateActiveBill(req, res) {
        try {
            if (!req.body.uuid) {
                return res.status(404).json(returnInfoEmpty());
            }

            let fetch = await billService.updateIsDeliveredService(
                req.body.uuid
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
}

export default new billController();
