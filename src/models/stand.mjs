import { Model, DataTypes } from "sequelize";

class Stand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // Define associations here
        Stand.belongsTo(models.Stadium);
    }
}

const initStand = (sequelize) => {
    Stand.init(
        {
            name: DataTypes.STRING,
            isReady: DataTypes.BOOLEAN,
            isVipDefault: DataTypes.BOOLEAN,
            priceDefault: DataTypes.INTEGER,
            totalTicketDefault: DataTypes.INTEGER,
            stadiumId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Stand",
        }
    );

    return Stand;
};

export default initStand;
