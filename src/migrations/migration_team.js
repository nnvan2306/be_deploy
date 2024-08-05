"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "Teams",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                code: {
                    type: Sequelize.INTEGER,
                },
                name: {
                    type: Sequelize.STRING,
                },
                logo_url: {
                    type: Sequelize.STRING,
                },
                description: {
                    type: Sequelize.STRING,
                },
                des_text: {
                    type: Sequelize.STRING,
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
        // await queryInterface.dropTable("Teams");
    },
};
