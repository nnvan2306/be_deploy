"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Players", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            code: {
                type: Sequelize.INTEGER,
            },
            location: { type: Sequelize.INTEGER },
            avatar_url: {
                type: Sequelize.STRING,
            },
            nationality: {
                type: Sequelize.STRING,
            },
            height: {
                type: Sequelize.FLOAT,
            },
            weight: {
                type: Sequelize.FLOAT,
            },
            birthday: {
                type: Sequelize.DATE,
            },
            isActive: {
                type: Sequelize.BOOLEAN,
            },
            teamId: {
                type: Sequelize.INTEGER,
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
        });
    },
    async down(queryInterface, Sequelize) {
        // await queryInterface.dropTable("Players");
    },
};
