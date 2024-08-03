const funcReturn = (message, errorCode, data) => {
    return {
        message: message,
        errorCode: errorCode,
        data: data,
    };
};

export default funcReturn;
