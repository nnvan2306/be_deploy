import { Model, DataTypes } from "sequelize";

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

const initDislikeComment = (sequelize) => {
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

export default initDislikeComment;
