import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

// Cấu hình Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./src/public/logoTeams");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`);
    },
});

export const upload = multer({
    storage: storage,
    limits: { fileSize: process.env.MAX_SIZE },
});

//
//
// upload avatar

const storageAvatar = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./src/public/avatarPlayers");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`);
    },
});

export const uploadAvatar = multer({
    storage: storageAvatar,
    limits: { fileSize: process.env.MAX_SIZE },
});

//
//
// upload match

const storageMatch = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./src/public/matchs");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`);
    },
});

export const uploadMatch = multer({
    storage: storageMatch,
    limits: { fileSize: process.env.MAX_SIZE_MATCH },
});

//
//
//upload stadium

const storageStadium = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./src/public/stadiums");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`);
    },
});

export const uploadStadium = multer({
    storage: storageStadium,
    limits: { fileSize: process.env.MAX_SIZE_MATCH },
});

//
//
//upload avatar user

const storageAvatarUser = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./src/public/avatarUsers");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`);
    },
});

export const uploadAvatarUser = multer({
    storage: storageAvatarUser,
    limits: { fileSize: process.env.MAX_SIZE_MATCH },
});
