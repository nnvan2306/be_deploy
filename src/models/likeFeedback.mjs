"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class LikeFeedback extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            LikeFeedback.belongsTo(models.Feedback);
        }
    }

    LikeFeedback.init(
        {
            feedbackId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "LikeFeedback",
        }
    );
    return LikeFeedback;
};
