"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Scoreds", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            namePlayer: { type: Sequelize.STRING },
            minuteGoal: { type: Sequelize.INTEGER },
            isPenalty: { type: Sequelize.BOOLEAN },
            matchId: { type: Sequelize.INTEGER },
            teamId: { type: Sequelize.INTEGER },
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
        // await queryInterface.dropTable("Scoreds");
    },
};
