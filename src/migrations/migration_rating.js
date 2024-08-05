"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "Ratings",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                win: {
                    type: Sequelize.INTEGER,
                },
                lose: {
                    type: Sequelize.INTEGER,
                },
                draw: {
                    type: Sequelize.INTEGER,
                },
                totalGoal: {
                    type: Sequelize.INTEGER,
                },
                totalLostGoal: {
                    type: Sequelize.INTEGER,
                },
                seasonId: {
                    type: Sequelize.INTEGER,
                },
                teamId: {
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
        // await queryInterface.dropTable("Ratings");
    },
};
