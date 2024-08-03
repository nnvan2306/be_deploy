"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Team extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Team.hasMany(models.Player);
            Team.hasMany(models.Rating);
            Team.belongsToMany(models.Season, { through: "Team_Season" });
            Team.belongsToMany(models.Match, {
                through: "Match_Team",
                foreignKey: "teamId",
            });
            Team.belongsToMany(models.Calendar, {
                through: "Calendar_Team",
                foreignKey: "teamId",
            });
        }
    }

    Team.init(
        {
            code: DataTypes.INTEGER,
            name: DataTypes.STRING,
            logo_url: DataTypes.STRING,
            description: DataTypes.STRING,
            des_text: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Team",
        }
    );
    return Team;
};
