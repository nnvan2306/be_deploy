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
        }
    );

    return DislikeFeedback;
};

export default initDislikeFeedback;
