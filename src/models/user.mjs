import { Model, DataTypes } from "sequelize";

class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // Define associations here
        User.hasMany(models.Comment);
        User.hasMany(models.Feedback);
    }
}

const initUser = (sequelize) => {
    User.init(
        {
            email: DataTypes.STRING,
            name: DataTypes.STRING,
            avatar_url: DataTypes.STRING,
            password: DataTypes.STRING,
            role: DataTypes.STRING,
            isAdmin: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "User",
        }
    );

    return User;
};

export default initUser;
