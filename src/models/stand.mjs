"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Stand extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Stand.belongsTo(models.Stadium);
        }
    }

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
