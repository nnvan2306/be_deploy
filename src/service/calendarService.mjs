import returnErrService from "../helps/returnErrService.mjs";
import db from "../models/index.mjs";
import funcReturn from "../helps/funcReturn.mjs";
import * as calendarTeamService from "./calendarTeamService.mjs";
const { Op } = require("sequelize");

const handleGetOneCalendar = async (data) => {
    let calendar = await db.Calendar.findOne({
        where: { hostId: data.hostId, guestId: data.guestId },
    });

    return calendar;
};

const handleGetCalendarById = async (id) => {
    let calendar = await db.Calendar.findOne({
        where: { id: id },
    });
    return calendar;
};

const crateCalendarService = async (data) => {
    try {
        const checkExits = await handleGetOneCalendar(data);
        if (checkExits) {
            return funcReturn("calendar is exits !", 1, []);
        }

        await db.Calendar.create({
            hostId: data.hostId,
            guestId: data.guestId,
            date: data.date,
            hour: data.hour,
            stadiumId: data.stadiumId,
        });

        const getCalendar = await handleGetOneCalendar(data);

        let createCalendarTeam =
            await calendarTeamService.createCalendarTeamService(
                getCalendar.hostId,
                getCalendar.guestId,
                getCalendar.id
            );

        if (createCalendarTeam.errorCode !== 0) {
            await deleteCalendarService(getCalendar.id);
            return funcReturn("create calendar error", 1, []);
        }

        return funcReturn("create calendar successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getCalendarService = async (data) => {
    try {
        let calendars;

        if (!data.hostId && !data.guestId) {
            calendars = [];
        } else if (!data.hostId) {
            calendars = await db.Calendar.findAll({
                where: {
                    [Op.or]: [
                        { hostId: data.guestId },
                        { guestId: data.guestId },
                    ],
                },
                include: [
                    {
                        model: db.Team,
                    },
                    { model: db.Stadium },
                ],
            });
        } else if (!data.guestId) {
            calendars = await db.Calendar.findAll({
                where: {
                    [Op.or]: [
                        { hostId: data.hostId },
                        { guestId: data.hostId },
                    ],
                },
                include: [
                    {
                        model: db.Team,
                    },
                    { model: db.Stadium },
                ],
            });
        } else {
            if (data.hostId === data.guestId) {
                calendars = await db.Calendar.findAll({
                    where: {
                        [Op.or]: [
                            { hostId: data.hostId },
                            { guestId: data.hostId },
                        ],
                    },
                    include: [
                        {
                            model: db.Team,
                        },
                        { model: db.Stadium },
                    ],
                });
            } else {
                calendars = await db.Calendar.findAll({
                    where: {
                        [Op.or]: [
                            { hostId: data.hostId, guestId: data.guestId },
                            { hostId: data.guestId, guestId: data.hostId },
                        ],
                    },
                    include: [
                        {
                            model: db.Team,
                        },
                        { model: db.Stadium },
                    ],
                });
            }
        }

        let calendarSortTime = calendars.sort((calFirst, calLast) => {
            let distanceFirst = Math.abs(
                new Date(calFirst.date).getTime() - new Date().getTime()
            );
            let distanceLast = Math.abs(
                new Date(calLast.date).getTime() - new Date().getTime()
            );
            return distanceFirst - distanceLast;
        });

        return funcReturn("calendars", 0, calendarSortTime);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const deleteCalendarService = async (id) => {
    try {
        if (!id) {
            return funcReturn("id mustn't empty !", 1, []);
        }
        await db.Calendar.destroy({
            where: { id: id },
        });

        await calendarTeamService.deleteCalendarTeamService(id);
        return funcReturn("delete calendar successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateCalendarService = async (data) => {
    try {
        const calendarOld = await handleGetCalendarById(data.id);

        if (
            data.hostId !== calendarOld.hostId ||
            data.guestId !== calendarOld.guestId
        ) {
            const updateCalendarTeam =
                await calendarTeamService.updateCalendarTeamService(
                    calendarOld.hostId,
                    calendarOld.guestId,
                    data.hostId,
                    data.guestId,
                    data.id
                );
            if (updateCalendarTeam.errorCode !== 0) {
                return funcReturn("update error", 1, []);
            }
        }

        await db.Calendar.update(
            {
                hostId: data.hostId,
                guestId: data.guestId,
                date: data.date,
                hour: data.hour,
                stadiumId: data.stadiumId,
            },
            {
                where: { id: data.id },
            }
        );

        return funcReturn("update calendar successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getNearestCalendarService = async () => {
    try {
        let calendars = await db.Calendar.findAll({
            include: [
                {
                    model: db.Team,
                },
                { model: db.Stadium },
            ],
        });

        let listCalendarSort = calendars.sort((calFirst, calLast) => {
            let distanceFirst = Math.abs(
                new Date(calFirst.date).getTime() - new Date().getTime()
            );
            let distanceLast = Math.abs(
                new Date(calLast.date).getTime() - new Date().getTime()
            );
            return distanceFirst - distanceLast;
        });

        let listCalendarReturn = listCalendarSort.filter(
            (item, index) => index < 10
        );

        return funcReturn("list Calendar", 0, listCalendarReturn);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

export {
    crateCalendarService,
    getCalendarService,
    deleteCalendarService,
    updateCalendarService,
    getNearestCalendarService,
};
