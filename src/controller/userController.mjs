import funcReturn from "../helps/funcReturn.mjs";
import returnErrService from "../helps/returnErrService.mjs";
import returnInfoEmpty from "../helps/returnInfoEmpty.mjs";
import * as userService from "../service/userService.mjs";

const handleValidateEmail = (email) => {
    var validate =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return validate.test(email);
};

class UserController {
    async handleRegister(req, res) {
        const user = req.body;
        try {
            if (
                !user.email ||
                !user.name ||
                !user.password ||
                !user.rePassword
            ) {
                return res.status(400).json(returnInfoEmpty());
            }

            //validate email
            const validateEmail = handleValidateEmail(user.email);
            if (!validateEmail) {
                return res.status(404).json({
                    message: "Invalid email",
                    errorCode: 1,
                    data: [],
                });
            }

            let register = await userService.registerService(user);

            return res
                .status(
                    register.errorCode === 0
                        ? 200
                        : register.errorCode === 1
                        ? 400
                        : 500
                )
                .json({
                    message: register.message,
                    errorCode: register.errorCode,
                    data: register.data,
                });
        } catch (err) {
            return res.status(500).json(returnErrService());
        }
    }

    async handleLogin(req, res) {
        const user = req.body;
        try {
            //validate
            if (!user.email || !user.password) {
                return res.status(400).json(returnInfoEmpty());
            }
            //validate email
            const validateEmail = handleValidateEmail(user.email);
            if (!validateEmail) {
                return res.status(404).json({
                    message: "Invalid email",
                    errorCode: 1,
                    data: [],
                });
            }
            let login = await userService.loginService(user);

            if (login.errorCode === 0) {
                console.log("login>>>>", login);
                await res.cookie("access_token", login.data.access_token, {
                    maxAge: 3 * 1000,
                    httpOnly: true,
                    sameSite: "None",
                });
                await res.cookie("refresh_token", login.data.refresh_token, {
                    maxAge: 365 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    sameSite: "None",
                });
            }
            return res
                .status(
                    login.errorCode === 0
                        ? 200
                        : login.errorCode === 1
                        ? 400
                        : 500
                )
                .json({
                    message: login.message,
                    errorCode: login.errorCode,
                    data: login.data,
                });
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleLogout(req, res) {
        try {
            await res.clearCookie("access_token");
            await res.clearCookie("refresh_token");

            return res.status(200).json(funcReturn("logout success", 0, []));
        } catch (err) {
            console.log(err);
        }
    }

    async handleRefreshToken(req, res) {
        try {
            let token = req.headers.cookie;
            if (!token.includes("refresh_token")) {
                return res
                    .status(404)
                    .json(funcReturn("token expired !", 1, []));
            }

            let refresh_token = token.split("refresh_token=")[1];
            let fetch = await userService.refreshTokenService(refresh_token);

            if (fetch.errorCode === 0) {
                res.cookie("access_token", fetch.data.access_token, {
                    maxAge: 3 * 1000,
                    httpOnly: true,
                });
            }
            return res
                .status(
                    fetch.errorCode === 0
                        ? 200
                        : fetch.errorCode === 1
                        ? 404
                        : 500
                )
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleUpdateUser(req, res) {
        try {
            if (!req.body.id || !req.body.name) {
                return res.status(400).json(returnInfoEmpty());
            }

            let dataBuider = {
                ...req.body,
                id: +req.body.id,
            };

            const fetch = await userService.updateUserService(dataBuider);

            return res
                .status(
                    fetch.errorCode === 0
                        ? 200
                        : fetch.errorCode === 1
                        ? 404
                        : 500
                )
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleUpdateAvatarUSer(req, res) {
        try {
            let dataBuider = {
                ...req.body,
                id: +req.body.id,
            };

            dataBuider.avatarNew = req?.file?.filename;

            let fetch = await userService.updateAvatarService(dataBuider);

            return res
                .status(
                    fetch.errorCode === 0
                        ? 200
                        : fetch.errorCode === 1
                        ? 404
                        : 500
                )
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleRemoveAvatar(req, res) {
        try {
            if (!req.body.id) {
                return res.status(400).json(returnInfoEmpty());
            }

            let dataBuider = {
                ...req.body,
                id: +req.body.id,
            };

            let fetch = await userService.removeAvatarService(dataBuider);

            return res
                .status(
                    fetch.errorCode === 0
                        ? 200
                        : fetch.errorCode === 1
                        ? 404
                        : 500
                )
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }
}

export default new UserController();
