"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Calendar_Team extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Calendar_Team.init(
        {
            calendarId: DataTypes.INTEGER,
            teamId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Calendar_Team",
        }
    );
    return Calendar_Team;
};
