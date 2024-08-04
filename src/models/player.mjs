import { Model, DataTypes } from "sequelize";

class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // Define associations here
        Player.hasMany(models.Statistic);
        Player.belongsTo(models.Team);
    }
}

const initPlayer = (sequelize) => {
    Player.init(
        {
            name: DataTypes.STRING,
            code: DataTypes.INTEGER,
            location: DataTypes.INTEGER,
            avatar_url: DataTypes.STRING,
            nationality: DataTypes.STRING,
            height: DataTypes.FLOAT,
            weight: DataTypes.FLOAT,
            birthday: DataTypes.DATE,
            isActive: DataTypes.BOOLEAN,
            teamId: DataTypes.INTEGER,
            description: DataTypes.STRING,
            des_text: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Player",
        }
    );

    return Player;
};

export default initPlayer;
