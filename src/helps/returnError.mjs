const returnError = (status) => {
    switch (status) {
        case 400:
            return {
                message: "bed request",
                errorCode: -1,
                data: [],
            };
        case 400:
            return {
                message: "Invalid email",
                errorCode: -1,
                data: [],
            };
        case 500:
            return {
                message: "something wrongs in service...",
                errorCode: -1,
                data: [],
            };
    }
};

export default returnError;
