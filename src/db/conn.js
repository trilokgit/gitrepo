const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/NewDb", {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`connection successful...`);
}).catch((e) => {
    console.log(`no connection.....`);
})