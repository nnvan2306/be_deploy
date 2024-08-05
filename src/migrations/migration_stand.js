"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "Stands",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                isReady: {
                    type: Sequelize.BOOLEAN,
                },
                name: {
                    type: Sequelize.STRING,
                },
                isVipDefault: {
                    type: Sequelize.BOOLEAN,
                },
                priceDefault: {
                    type: Sequelize.INTEGER,
                },
                totalTicketDefault: {
                    type: Sequelize.INTEGER,
                },
                stadiumId: {
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
        // await queryInterface.dropTable("Stadiums");
    },
};
