const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const nunjucks = require("nunjucks");

const { sequelize } = require("./models");
const userRoute = require("./routes/users.routes");
const authRoute = require("./routes/auth.routes")
const app = express();

dotenv.config();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "html");
nunjucks.configure("views", {
    express: app,
    watch: true,
});

sequelize.sync({ force: false})
    .then(() => {
        console.log("DB connect success");
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRoute);
app.use("/auth", authRoute);

app.listen(app.get("port"), () => {
    console.log(`${app.get("port")} port is running ..`);
})
