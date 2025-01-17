module.exports = {
    apps: [
        {
            name: "be_deploy",
            script: "./src/server.mjs",
            env: {
                PORT: 8080,
                NEXT_URL: "https://fe-nha-production.vercel.app",
                JWT_SECRET: "ngongocvan",
                JWT_SERECT_REFRESH: "vanngo",
                JWT_EXPIRES_ACCESS: "3s",
                JWT_EXPIRES_REFRESH: "365d",
                MAX_SIZE: 1000 * 1000 * 1,
                MAX_SIZE_MATCH: 1000 * 1000 * 1,
                EMAIL_USENAME: "vanvanvan23062003@gmail.com",
                EMAIL_PASSWORD: "lcpw wjba lggo ybyq",
                REACT_URL: "https://fe-nha-admin.vercel.app",
            },
        },
    ],
};
