import jwt from "jsonwebtoken";
import funcReturn from "../helps/funcReturn.mjs";
import returnErrService from "../helps/returnErrService.mjs";
import { arrPath } from "../helps/listPathNotCheck.mjs";
import dotenv from "dotenv";
dotenv.config();

export const createJwtAccess = async (payload) => {
    let key = process.env.JWT_SECRET;
    let token = jwt.sign(payload, key);
    return token;
};

export const createJwtRefresh = async (payload) => {
    let key = process.env.JWT_SERECT_REFRESH;
    let token = jwt.sign(payload, key);
    return token;
};

export const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decode;
    try {
        decode = jwt.verify(token, key);
    } catch (err) {
        console.log(err);
    }
    return decode;
};

export const verifyRefreshToken = (token) => {
    let key = process.env.JWT_SERECT_REFRESH;
    let decode;
    try {
        decode = jwt.verify(token, key);
    } catch (err) {
        console.log(err);
    }
    return decode;
};

export const handleCheckToken = (req, res, next) => {
    if (arrPath.includes(req.path)) return next();

    try {
        let token = req.headers.cookie;

        if (!token) {
            return res.status(404).json(funcReturn("token is empty !", 1, []));
        }

        if (!token.includes("access_token")) {
            return res
                .status(401)
                .json(funcReturn("access token expired !", 1, []));
        }

        let access_token = token.split("access_token=")[1].split(";")[0];
        let info = verifyToken(access_token);

        if (info.role !== "admin") {
            return res
                .status(404)
                .json(funcReturn("account is not admin !", 1, []));
        }

        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json(returnErrService);
    }
    // console.log(req.headers);
    // next();
};

export const handleCheckRoleAdmin = (req, res) => {
    try {
        const path = req.headers.cookie;

        console.log("token >>>", req.headers);
        if (!path) {
            return res.status(400).json(funcReturn("token empty ", 1, []));
        }
        if (!path.includes("access_token")) {
            return res
                .status(401)
                .json(funcReturn("access_token is expired !", 1, []));
        }

        const access_token = path.split("access_token=")[1].split(";")[0];

        let info = verifyToken(access_token);

        return res
            .status(info.role === "admin" ? 200 : 404)
            .json(
                funcReturn(
                    info.role === "admin" ? "admin" : "account isn't admin",
                    0,
                    []
                )
            );
    } catch (err) {
        console.log(err);
    }
};
