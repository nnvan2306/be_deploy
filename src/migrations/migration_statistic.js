"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "Statistics",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                goal: {
                    type: Sequelize.INTEGER,
                },
                assist: {
                    type: Sequelize.INTEGER,
                },
                yellowCard: {
                    type: Sequelize.INTEGER,
                },
                redCard: {
                    type: Sequelize.INTEGER,
                },
                pA: {
                    type: Sequelize.INTEGER,
                },
                seasonName: {
                    type: Sequelize.STRING,
                },
                seasonId: {
                    type: Sequelize.INTEGER,
                },
                playerId: {
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
        await queryInterface.dropTable("Statistics");
        // await queryInterface.removeColumn("Statistics", "");
    },
};
