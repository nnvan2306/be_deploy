import { Model, DataTypes } from "sequelize";

class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // Define associations here
        Ticket.belongsTo(models.Calendar);
        Ticket.hasMany(models.Bill);
    }
}

const initTicket = (sequelize) => {
    Ticket.init(
        {
            name: DataTypes.STRING,
            isVip: DataTypes.BOOLEAN,
            price: DataTypes.INTEGER,
            totalTicket: DataTypes.INTEGER,
            calendarId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Ticket",
        }
    );

    return Ticket;
};

export default initTicket;
