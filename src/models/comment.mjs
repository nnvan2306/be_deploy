"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Comment.belongsTo(models.Match);
            Comment.belongsTo(models.User);
            Comment.hasMany(models.Feedback);
            Comment.hasMany(models.LikeComment);
            Comment.hasMany(models.DislikeComment);
        }
    }

    Comment.init(
        {
            content: DataTypes.STRING,
            like: DataTypes.INTEGER,
            disLike: DataTypes.INTEGER,
            matchId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Comment",
        }
    );
    return Comment;
};
