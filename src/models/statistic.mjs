import { Model, DataTypes } from "sequelize";

class Statistic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // Define associations here
        Statistic.belongsTo(models.Player);
        Statistic.belongsTo(models.Season);
    }
}

const initStatistic = (sequelize) => {
    Statistic.init(
        {
            goal: DataTypes.INTEGER,
            assist: DataTypes.INTEGER,
            yellowCard: DataTypes.INTEGER,
            redCard: DataTypes.INTEGER,
            pA: DataTypes.INTEGER,
            seasonName: DataTypes.STRING,
            seasonId: DataTypes.INTEGER,
            playerId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Statistic",
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
        }
    );

    return Statistic;
};

export default initStatistic;
