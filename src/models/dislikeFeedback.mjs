"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class DislikeFeedback extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            DislikeFeedback.belongsTo(models.Feedback);
        }
    }

    DislikeFeedback.init(
        {
            feedbackId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "DislikeFeedback",
        }
    );
    return DislikeFeedback;
};
