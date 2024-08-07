import { Model, DataTypes } from "sequelize";

class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // Define associations here
        Rating.belongsTo(models.Team);
        // Rating.belongsTo(models.Season);
    }
}

const initRating = (sequelize) => {
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
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
        }
    );

    return Rating;
};

export default initRating;
