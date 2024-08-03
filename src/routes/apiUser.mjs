import userController from "../controller/userController.mjs";
import * as jwtAction from "../middleware/jwtAction.mjs";
import { uploadAvatarUser } from "../middleware/multer.mjs";
import express from "express";

const router = express.Router();

const initApiUser = (app) => {
    router.get("/refresh-token", userController.handleRefreshToken);
    router.post("/register", userController.handleRegister);
    router.post("/login", userController.handleLogin);
    router.post("/logout", userController.handleLogout);
    router.post("/check-role-admin", jwtAction.handleCheckRoleAdmin);
    router.patch("/update-name-user", userController.handleUpdateUser);
    router.patch(
        "/update-avatar-user",
        uploadAvatarUser.single("file"),
        userController.handleUpdateAvatarUSer
    );
    router.patch("/remove-avatar", userController.handleRemoveAvatar);

    return app.use("/v1", router);
};
export default initApiUser;
