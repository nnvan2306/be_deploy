import { Model, DataTypes } from "sequelize";

class Season extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
        Season.hasMany(models.Statistic);
        Season.hasMany(models.Rating);
        Season.hasMany(models.Match);
        Season.belongsToMany(models.Team, { through: "Team_Season" });
    }
}

const initSeason = (sequelize) => {
    Season.init(
        {
            index: DataTypes.INTEGER,
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            des_text: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Season",
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
        }
    );

    return Season;
};

export default initSeason;
