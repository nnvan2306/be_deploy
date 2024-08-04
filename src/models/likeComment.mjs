import { Model, DataTypes } from "sequelize";

class LikeComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
        LikeComment.belongsTo(models.Comment);
    }
}

const initLikeComment = (sequelize) => {
    LikeComment.init(
        {
            commentId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "LikeComment",
        }
    );

    return LikeComment;
};

export default initLikeComment;
