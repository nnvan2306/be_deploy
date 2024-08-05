import { Model, DataTypes } from "sequelize";

class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // Define associations here
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

const initTeam = (sequelize) => {
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
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
        }
    );

    return Team;
};

export default initTeam;
