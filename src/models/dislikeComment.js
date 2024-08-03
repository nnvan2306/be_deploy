"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class DislikeComment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            DislikeComment.belongsTo(models.Comment);
        }
    }

    DislikeComment.init(
        {
            commentId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "DislikeComment",
        }
    );
    return DislikeComment;
};
