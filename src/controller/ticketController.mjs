import funcReturn from "../helps/funcReturn.mjs";
import returnErrService from "../helps/returnErrService.mjs";
import returnInfoEmpty from "../helps/returnInfoEmpty.mjs";
import ticketService from "../service/ticketService";

class TicketController {
    async handleCreateTicket(req, res) {
        try {
            let tickets = req.body;

            tickets.forEach((item) => {
                if (
                    !item.name ||
                    !item.price ||
                    !item.totalTicket ||
                    !item.calendarId
                ) {
                    return res.status(404).json(returnInfoEmpty());
                }
            });

            let fetch = await ticketService.createTicketService(tickets);
            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleUpdateTicket(req, res) {
        try {
            let data = req.body;
            if (
                !data.id ||
                !data.name ||
                !data.price ||
                !data.totalTicket ||
                !data.calendarId
            ) {
                return res.status(404).json(returnInfoEmpty());
            }

            let dataBuider = {
                ...data,
                id: +data.id,
                price: +data.price,
                totalTicket: +data.totalTicket,
                calendarId: +data.calendarId,
            };

            let fetch = await ticketService.updateTicketService(dataBuider);

            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleUpdateBookingTicket(req, res) {
        try {
            let dataBuider = {
                id: +req.body.id,
                totalTicketBooking: +req.body.totalTicketBooking,
            };

            let fetch = await ticketService.updateBookingTicketService(
                dataBuider
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

    async handleDeleteTicket(req, res) {
        try {
            let data = req.body;

            if (data.length === 0) {
                return res.status(404).json(returnInfoEmpty());
            }

            let fetch = await ticketService.deleteTicketService(data);
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

    async handleDeleteAllTicket(req, res) {
        try {
            let fetch = await ticketService.deleteAllTicketService(
                +req.query.calendarId
            );
            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleGetTicket(req, res) {
        try {
            let fetch = await ticketService.getTicketService(
                +req.query.calendarId
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

    async handleGetOneTicket(req, res) {
        try {
            let fetch = await ticketService.getOneTicketService(+req.query.id);

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

module.exports = new TicketController();
