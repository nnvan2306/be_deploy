import returnErrService from "../helps/returnErrService.mjs";
import db from "../models/index.mjs";
import funcReturn from "../helps/funcReturn.mjs";
import * as ticketService from "./ticketService.mjs";

const handleCheckBillExits = async (uuid) => {
    let bill = await db.Bill.findOne({
        where: {
            uuid: uuid,
        },
    });

    return bill;
};

const createBillService = async (data) => {
    try {
        let ticket = await ticketService.getOneTicketService(data.ticketId);

        await db.Bill.create({
            price: ticket.data.dataValues.price * data.totalTicket,
            totalTicket: data.totalTicket,
            uuid: data.uuid,
            email: data.email,
            phoneNumber: data.phoneNumber,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            city: data.city,
            country: data.country,
            isDelivered: false,
            ticketId: data.ticketId,
            status: false,
        });

        return funcReturn("create bill success", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const deleteBillService = async (uuid) => {
    try {
        if (!handleCheckBillExits(uuid)) {
            return funcReturn("bill is not exits !", 1, []);
        }

        await db.Bill.destroy({
            where: { uuid: uuid },
        });

        return funcReturn("delete Bill successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getAllBillService = async () => {
    try {
        let bills = await db.Bill.findAll();
        return funcReturn("all bill", 0, bills);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getLimitBillService = async (page, pageSize) => {
    try {
        let offset = (page - 1) * pageSize;
        let { count, rows } = await db.Bill.findAndCountAll({
            offset: offset,
            limit: pageSize,
            include: [
                {
                    model: db.Ticket,
                    include: [
                        {
                            model: db.Calendar,
                            // include: [
                            //     {
                            //         model: db.Team,
                            //     },
                            // ],
                        },
                    ],
                },
            ],
        });
        let data = {
            items: rows,
            meta: {
                currentPage: page,
                totalIteams: count,
                totalPages: Math.ceil(count / pageSize),
            },
        };

        return funcReturn("bills", 0, data);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateIsDeliveredService = async (uuid) => {
    try {
        let bill = await handleCheckBillExits(uuid);
        if (!bill) {
            return funcReturn("bill is not exits !", 1, []);
        }

        await db.Bill.update(
            {
                // isDelivered: ! bill.isDelivered,
                isDelivered: bill.isDelivered ? false : true,
            },
            { where: { uuid: uuid } }
        );
        return funcReturn("update bill ", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

export {
    createBillService,
    deleteBillService,
    getAllBillService,
    getLimitBillService,
    updateIsDeliveredService,
};
