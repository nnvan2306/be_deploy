import { Model, DataTypes } from "sequelize";

class Calendar_Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
}

const initCalendarTeam = (sequelize) => {
    Calendar_Team.init(
        {
            calendarId: DataTypes.INTEGER,
            teamId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Calendar_Team",
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
        }
    );

    return Calendar_Team;
};

export default initCalendarTeam;
