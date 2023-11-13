const express = require("express");

const app = express();
const dotenv = require("dotenv");

dotenv.config();
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
    console.log(`${app.get("port")} port is running ..`);
})