require("dotenv").config();

const config = {

    app: {
        port: process.env.PORT,
        host: process.env.HOST,
    },

    db: {
        url: process.env.DB_URL,
    },
    img: {
        url: process.env.DEFAULT_IMAGE_PATH,
    },

};

module.exports = config;