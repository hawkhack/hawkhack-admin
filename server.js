const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

function startServer(server) {
    const { PORT } = process.env;

    server.listen(PORT || 3001, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

async function init() {
    const { BaseURL } = process.env;
    const app = express();
    app.use(cors());

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", BaseURL);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use(express.static(path.join(__dirname, "/admin-client/build")));

    app.get('*', (req, res) => res.sendFile(path.join(__dirname + './admin-client/build', 'index.html')));

    startServer(app);
}

init();