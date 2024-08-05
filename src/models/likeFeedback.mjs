import { Model, DataTypes } from "sequelize";

class LikeFeedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // Define association here
        LikeFeedback.belongsTo(models.Feedback);
    }
}

const initLikeFeedback = (sequelize) => {
    LikeFeedback.init(
        {
            feedbackId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "LikeFeedback",
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
        }
    );

    return LikeFeedback;
};

export default initLikeFeedback;
