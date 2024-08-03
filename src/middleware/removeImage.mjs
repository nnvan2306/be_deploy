import { promises as fs } from "fs";

export const handleRemoveLogo = async (path) => {
    if (path) {
        try {
            await fs.unlink(`./src/public/logoTeams/${path}`);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    } else {
        return false;
    }
};

export const handleRemoveAvatar = async (path) => {
    if (path) {
        try {
            await fs.unlink(`./src/public/avatarPlayers/${path}`);

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    } else {
        return false;
    }
};

export const handleRemoveMatch = async (path) => {
    if (path) {
        try {
            await fs.unlink(`./src/public/matchs/${path}`);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    } else {
        return false;
    }
};

export const handleRemoveStadiumImage = async (path) => {
    if (path) {
        try {
            await fs.unlink(`./src/public/stadiums/${path}`);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    } else {
        return false;
    }
};

export const handleRemoveUserAvatar = async (path) => {
    if (path) {
        try {
            await fs.unlink(`./src/public/avatarUsers/${path}`);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    } else {
        return false;
    }
};
