import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE, "root", "password", {
    host: "localhost",
    dialect: "mysql",
    dialectOptions: {
        charset: "utf8mb4",
    },
    define: {
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
    },
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

export default testConnection;
