import returnErrService from "../helps/returnErrService.mjs";
import db from "../models/index.mjs";
import funcReturn from "../helps/funcReturn.mjs";

const handleCheckExits = async (data) => {
    for (const item of data) {
        {
            let ticket = await db.Ticket.findOne({
                where: { name: item.name, calendarId: item.calendarId },
            });
            if (ticket) {
                return item.name;
            }
        }
    }
    return false;
};

const createTicketService = async (data) => {
    try {
        let check = await handleCheckExits(data);
        if (check) {
            return funcReturn(`${check} is exits`, 1, []);
        }

        //check duplicate
        for (let i = 0; i < data.length - 1; i++) {
            for (let j = i + 1; j < data.length; j++) {
                if (data[i].name === data[j].name) {
                    return funcReturn(`ticket mustn't duplicate `, 1, []);
                }
            }
        }

        await data.forEach(async (item) => {
            await db.Ticket.create({
                name: item.name,
                price: item.price,
                isVip: item.isVip,
                totalTicket: item.totalTicket,
                calendarId: item.calendarId,
            });
        });

        return funcReturn("create tickets successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateTicketService = async (data) => {
    try {
        await db.Ticket.update(
            {
                name: data.name,
                isVip: data.isVip,
                price: data.price,
                totalTicket: data.totalTicket,
                calendarId: data.calendarId,
            },
            {
                where: { id: data.id },
            }
        );

        return funcReturn("update tickets successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateBookingTicketService = async (data) => {
    try {
        let ticket = await db.Ticket.findOne({
            where: { id: data.id },
        });
        if (!ticket) {
            return funcReturn("ticket don't exits", 1, []);
        }

        await db.Ticket.update(
            {
                totalTicket: ticket.totalTicket - data.totalTicketBooking,
            },
            {
                where: { id: data.id },
            }
        );

        return funcReturn("booking successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const deleteTicketService = async (data) => {
    //data is array
    try {
        await data.forEach(async (item) => {
            await db.Ticket.destroy({
                where: { id: item.id },
            });
        });

        return funcReturn("delete ticket successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const deleteAllTicketService = async (calendarId) => {
    try {
        await db.Ticket.destroy({
            where: {
                calendarId: calendarId,
            },
        });
        return funcReturn("delete successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getTicketService = async (calendarId) => {
    try {
        let tickets = await db.Ticket.findAll({
            where: { calendarId: calendarId },
            include: {
                model: db.Calendar,
                include: [
                    {
                        model: db.Stadium,
                        include: {
                            model: db.Stand,
                        },
                    },
                    {
                        model: db.Team,
                    },
                ],
            },
        });

        return funcReturn("tickets", 0, tickets);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getOneTicketService = async (id) => {
    try {
        let ticket = await db.Ticket.findOne({
            where: { id: id },
            include: {
                model: db.Calendar,
                include: [
                    {
                        model: db.Stadium,
                        include: {
                            model: db.Stand,
                        },
                    },
                    {
                        model: db.Team,
                    },
                ],
            },
        });

        return funcReturn("ticket", 0, ticket);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

export {
    createTicketService,
    updateBookingTicketService,
    deleteTicketService,
    deleteAllTicketService,
    getTicketService,
    updateTicketService,
    getOneTicketService,
};
