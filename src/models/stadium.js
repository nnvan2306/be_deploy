"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Stadium extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Stadium.hasMany(models.Calendar);
            Stadium.hasMany(models.Stand);
        }
    }

    Stadium.init(
        {
            name: DataTypes.STRING,
            location: DataTypes.STRING,
            stadiumImage_url: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Stadium",
        }
    );
    return Stadium;
};
