"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Rating extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Rating.belongsTo(models.Team);
            Rating.belongsTo(models.Season);
        }
    }

    Rating.init(
        {
            win: DataTypes.INTEGER,
            lose: DataTypes.INTEGER,
            draw: DataTypes.INTEGER,
            totalGoal: DataTypes.INTEGER,
            totalLostGoal: DataTypes.INTEGER,
            seasonId: DataTypes.INTEGER,
            teamId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Rating",
        }
    );
    return Rating;
};
