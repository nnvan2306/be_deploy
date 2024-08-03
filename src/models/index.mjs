import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import Sequelize from "sequelize";
import process from "process";
import config from "../config/config.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const basename = path.basename(__filename);
const env = "production";
const dbConfig = config[env];
const db = {};

let sequelize;
if (dbConfig.use_env_variable) {
    sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
} else {
    sequelize = new Sequelize(
        dbConfig.database,
        dbConfig.username,
        dbConfig.password,
        dbConfig
    );
}

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js" &&
            file.indexOf(".test.js") === -1
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
