import { Model, DataTypes } from "sequelize";

class Scored extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // Define associations here
        Scored.belongsTo(models.Match);
    }
}

const initScored = (sequelize) => {
    Scored.init(
        {
            namePlayer: DataTypes.STRING,
            minuteGoal: DataTypes.INTEGER,
            isPenalty: DataTypes.BOOLEAN,
            matchId: DataTypes.INTEGER,
            teamId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Scored",
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
        }
    );

    return Scored;
};

export default initScored;
