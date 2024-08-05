import { Model, DataTypes } from "sequelize";

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

const initDislikeFeedback = (sequelize) => {
    DislikeFeedback.init(
        {
            feedbackId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "DislikeFeedback",
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
        }
    );

    return DislikeFeedback;
};

export default initDislikeFeedback;
