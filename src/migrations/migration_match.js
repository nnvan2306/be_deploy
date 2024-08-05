"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "Matches",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                title: {
                    type: Sequelize.STRING,
                },

                meta: {
                    type: Sequelize.STRING,
                },
                date: {
                    type: Sequelize.STRING,
                },
                hour: {
                    type: Sequelize.STRING,
                },
                match_url: {
                    type: Sequelize.STRING,
                },
                hostGoal: {
                    type: Sequelize.INTEGER,
                },
                guestGoal: {
                    type: Sequelize.INTEGER,
                },
                isPlayed: { type: Sequelize.BOOLEAN },
                hostShoot: { type: Sequelize.INTEGER },
                guestShoot: { type: Sequelize.INTEGER },
                hostTarget: { type: Sequelize.INTEGER },
                guestTarget: { type: Sequelize.INTEGER },
                hostBallControl: { type: Sequelize.INTEGER },
                hostConnerKick: { type: Sequelize.INTEGER },
                guestConnerKick: { type: Sequelize.INTEGER },
                hostRedCard: { type: Sequelize.INTEGER },
                guestRedCard: { type: Sequelize.INTEGER },
                hostYellowCard: { type: Sequelize.INTEGER },
                guestYellowCard: { type: Sequelize.INTEGER },
                hostId: {
                    type: Sequelize.INTEGER,
                },
                guestId: {
                    type: Sequelize.INTEGER,
                },
                seasonId: {
                    type: Sequelize.INTEGER,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
            },
            {
                charset: "utf8mb4",
                collate: "utf8mb4_unicode_ci",
            }
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Matches");
    },
};
