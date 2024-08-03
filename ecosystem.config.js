module.exports = {
    apps: [
        {
            name: "app1",
            script: "./server.js",
            env: {
                PORT: 8080,
                REACT_URL: "http://localhost:5173",
                NEXT_URL: " http://localhost:3000",
                JWT_SECRET: "ngongocvan",
                JWT_SERECT_REFRESH: "vanngo",
                JWT_EXPIRES_ACCESS: "3s",
                JWT_EXPIRES_REFRESH: "365d",
                MAX_SIZE: 1000 * 1000 * 1,
                MAX_SIZE_MATCH: 1000 * 1000 * 1,
                EMAIL_USENAME: "vanvanvan23062003@gmail.com",
                EMAIL_PASSWORD: "lcpw wjba lggo ybyq",
            },
        },
    ],
};
