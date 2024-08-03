const fs = require("fs");

export const handleRemoveLogo = (path) => {
    if (path) {
        fs.unlink(`./src/public/logoTeams/${path}`, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
        return true;
    } else {
        return false;
    }
};

export const handleRemoveAvatar = (path) => {
    if (path) {
        fs.unlink(`./src/public/avatarPlayers/${path}`, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
        return true;
    } else {
        return false;
    }
};

export const handleRemoveMatch = (path) => {
    if (path) {
        fs.unlink(`./src/public/matchs/${path}`, (err) => {
            if (err) {
                console.error(err);
                return false;
            }
        });
        return true;
    } else {
        return false;
    }
};

export const handleRemoveStadiumImage = (path) => {
    if (path) {
        fs.unlink(`./src/public/stadiums/${path}`, (err) => {
            if (err) {
                console.error(err);
                return false;
            }
        });
        return true;
    } else {
        return false;
    }
};

export const handleRemoveUserAvatar = (path) => {
    if (path) {
        fs.unlink(`./src/public/avatarUsers/${path}`, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
        return true;
    } else {
        return false;
    }
};
