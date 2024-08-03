"use strict";
import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
    class Calendar extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Calendar.hasMany(models.Ticket);
            Calendar.belongsTo(models.Stadium);
            Calendar.belongsToMany(models.Team, {
                through: "Calendar_Team",
                foreignKey: "calendarId",
            });
        }
    }

    Calendar.init(
        {
            hostId: DataTypes.INTEGER,
            guestId: DataTypes.INTEGER,
            date: DataTypes.STRING,
            hour: DataTypes.STRING,
            stadiumId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Calendar",
        }
    );
    return Calendar;
};
