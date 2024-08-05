import { Model, DataTypes } from "sequelize";

class Stadium extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // Define associations here
        Stadium.hasMany(models.Calendar);
        Stadium.hasMany(models.Stand);
    }
}

const initStadium = (sequelize) => {
    Stadium.init(
        {
            name: DataTypes.STRING,
            location: DataTypes.STRING,
            stadiumImage_url: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Stadium",
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
        }
    );

    return Stadium;
};

export default initStadium;
