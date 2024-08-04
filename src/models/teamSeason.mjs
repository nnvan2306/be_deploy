import { Model, DataTypes } from "sequelize";

class Team_Season extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // Define associations here if needed
    }
}

const initTeamSeason = (sequelize) => {
    Team_Season.init(
        {
            seasonId: DataTypes.INTEGER,
            teamId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Team_Season",
        }
    );

    return Team_Season;
};

export default initTeamSeason;
