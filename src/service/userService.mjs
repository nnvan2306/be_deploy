import db from "../models/index.mjs";
import bcrypt from "bcryptjs";
import {
    createJwtAccess,
    createJwtRefresh,
    verifyRefreshToken,
} from "../middleware/jwtAction.mjs";
import returnErrService from "../helps/returnErrService.mjs";
import funcReturn from "../helps/funcReturn.mjs";
import { handleRemoveUserAvatar } from "../middleware/removeImage.mjs";
import dotenv from "dotenv";
dotenv.config();

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

const handleCheckPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash); // true or false
};

const checkEmailIsExits = async (email) => {
    let check = await db.User.findOne({
        where: { email: email },
    });
    return check;
};

const registerService = async (data) => {
    try {
        //check email is exits
        let checkExits = await checkEmailIsExits(data.email);
        if (checkExits) {
            return funcReturn("email is exits", 1, []);
        }

        let hashPassword = hashUserPassword(data.password);
        await db.User.create({
            email: data.email,
            name: data.name,
            avatar_url: "",
            password: hashPassword,
            role: "user",
            isAdmin: 0,
        });
        return funcReturn("create successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const loginService = async (data) => {
    try {
        //check email is exits
        let user = await checkEmailIsExits(data.email);
        if (!user) {
            return funcReturn("email is don't exits", 1, []);
        }

        //check password
        let checkPassword = handleCheckPassword(data.password, user.password);

        if (!checkPassword) {
            return funcReturn("wrong password", 1, []);
        }

        let payloadAccess = {
            email: user.email,
            name: user.name,
            role: user.isAdmin ? "admin" : "user",
            expiresIn: process.env.JWT_EXPIRES_ACCESS,
        };

        let playloadRefresh = {
            email: user.email,
            name: user.name,
            role: user.isAdmin ? "admin" : "user",
            expiresIn: process.env.JWT_EXPIRES_REFRESH,
        };

        let access_token = await createJwtAccess(payloadAccess);
        let refresh_token = await createJwtRefresh(playloadRefresh);

        return funcReturn("login successfully", 0, {
            access_token: access_token,
            refresh_token: refresh_token,
            avatar: user.avatar_url,
            name: user.name,
            id: user.id,
        });
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const refreshTokenService = async (token) => {
    try {
        let decode = await verifyRefreshToken(token);
        if (decode.role !== "admin") {
            return funcReturn("account is not admin !", 1, []);
        }
        let user = await checkEmailIsExits(decode.email);
        if (!user) {
            return funcReturn("account not exits !", 1, []);
        }

        let payloadAccess = {
            email: user.email,
            name: user.name,
            role: user.isAdmin ? "admin" : "user",
            expiresIn: process.env.JWT_EXPIRES_ACCESS,
        };

        let access_token = await createJwtAccess(payloadAccess);

        return funcReturn("token", 0, {
            access_token: access_token,
        });
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateUserService = async (data) => {
    try {
        const check = await db.User.findOne({
            where: { id: data.id },
        });

        if (!check) {
            return funcReturn("user is not exits", 1, []);
        }

        await db.User.update(
            {
                name: data.name,
            },
            {
                where: { id: data.id },
            }
        );

        return funcReturn("update success", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateAvatarService = async (data) => {
    try {
        let check = await db.User.findOne({
            where: { id: data.id },
        });

        if (!check) {
            return funcReturn("user is not exits !", 1, []);
        }

        if (!data.avatar) {
            await db.User.update(
                {
                    avatar_url: `/images/${data.avatarNew}`,
                },
                {
                    where: { id: data.id },
                }
            );

            let user = await db.User.findOne({
                where: { id: data.id },
            });

            return funcReturn("update success", 0, user.avatar_url);
        }

        let path = data.avatar.split("/images/")[1];
        if (!handleRemoveUserAvatar(path)) {
            return funcReturn("can not remove avatar old", 1, []);
        }

        await db.User.update(
            {
                avatar_url: `/images/${data.avatarNew}`,
            },
            {
                where: { id: data.id },
            }
        );

        let user = await db.User.findOne({
            where: { id: data.id },
        });

        return funcReturn("update success", 0, user.avatar_url);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const removeAvatarService = async (data) => {
    try {
        let check = await db.User.findOne({
            where: { id: data.id },
        });

        if (!check) {
            return funcReturn("user is not exits !", 1, []);
        }

        let path = data.avatar.split("/images/")[1];
        if (!handleRemoveUserAvatar(path)) {
            return funcReturn("can not remove avatar !", 1, []);
        }

        await db.User.update(
            {
                avatar_url: "",
            },
            {
                where: { id: data.id },
            }
        );

        return funcReturn("update successful", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

// module.exports = {
//     registerService,
//     loginService,
//     refreshTokenService,
//     updateUserService,
//     updateAvatarService,
//     removeAvatarService,
// };

export {
    registerService,
    loginService,
    refreshTokenService,
    updateUserService,
    updateAvatarService,
    removeAvatarService,
};
