"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "Users",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                email: {
                    type: Sequelize.STRING,
                },
                name: {
                    type: Sequelize.STRING,
                },
                avatar_url: {
                    type: Sequelize.STRING,
                },
                password: {
                    type: Sequelize.STRING,
                },
                role: {
                    type: Sequelize.STRING,
                },
                isAdmin: {
                    type: Sequelize.BOOLEAN,
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
        // await queryInterface.dropTable("Users");
    },
};
