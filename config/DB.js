const mongoose = require('mongoose');

const dbConnection = () => {
    mongoose.connect("mongodb+srv://root:root@cluster0.5cczn.mongodb.net/project0?retryWrites=true&w=majority",
        (err) => {
            if (!err) {
                console.log("mongodb connected")
            } else {
                console.error("Getting error while connecting mongodb")
                console.error(err)
            }
        }
    )
};

module.exports = dbConnection;