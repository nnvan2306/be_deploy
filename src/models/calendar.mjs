import { Model, DataTypes } from "sequelize";

class Calendar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
        Calendar.hasMany(models.Ticket);
        Calendar.belongsTo(models.Stadium);
        Calendar.belongsToMany(models.Team, {
            through: "Calendar_Team",
            foreignKey: "calendarId",
        });
    }
}

const initCalendar = (sequelize) => {
    Calendar.init(
        {
            hostId: DataTypes.INTEGER,
            guestId: DataTypes.INTEGER,
            date: DataTypes.STRING,
            hour: DataTypes.STRING,
            stadiumId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Calendar",
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
        }
    );

    return Calendar;
};

export default initCalendar;
