import { Model, DataTypes } from "sequelize";

class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // Define associations here
        Match.belongsToMany(models.Team, {
            through: "Match_Team",
            foreignKey: "matchId",
        });
        Match.hasMany(models.Scored);
        Match.belongsTo(models.Season);
        Match.hasMany(models.Comment);
    }
}

const initMatch = (sequelize) => {
    Match.init(
        {
            title: DataTypes.STRING,
            meta: DataTypes.STRING,
            isPlayed: DataTypes.BOOLEAN,
            match_url: DataTypes.STRING,
            date: DataTypes.STRING,
            hour: DataTypes.STRING,
            hostGoal: DataTypes.INTEGER,
            guestGoal: DataTypes.INTEGER,
            hostShoot: DataTypes.INTEGER,
            guestShoot: DataTypes.INTEGER,
            hostTarget: DataTypes.INTEGER,
            guestTarget: DataTypes.INTEGER,
            hostBallControl: DataTypes.INTEGER,
            hostConnerKick: DataTypes.INTEGER,
            guestConnerKick: DataTypes.INTEGER,
            hostRedCard: DataTypes.INTEGER,
            guestRedCard: DataTypes.INTEGER,
            hostYellowCard: DataTypes.INTEGER,
            guestYellowCard: DataTypes.INTEGER,
            hostId: DataTypes.INTEGER,
            guestId: DataTypes.INTEGER,
            seasonId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Match",
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
        }
    );

    return Match;
};

export default initMatch;
