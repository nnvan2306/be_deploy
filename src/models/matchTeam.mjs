import { Model, DataTypes } from "sequelize";

class Match_Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // Define associations here if needed
    }
}

const initMatchTeam = (sequelize) => {
    Match_Team.init(
        {
            matchId: DataTypes.INTEGER,
            teamId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Match_Team",
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
        }
    );

    return Match_Team;
};

export default initMatchTeam;
