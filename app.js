const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const cookieParser = require('cookie-parser');


const { sequelize } = require("./models");
const userRoute = require("./routes/users.routes");
const authRoute = require("./routes/auth.routes");
const indexRoute = require("./routes/index.routes");
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
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use('/', indexRoute);

app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
  });
app.use((err, req, res, next) => {
    res.render("not_found_page");
})
app.listen(app.get("port"), () => {
    console.log(`${app.get("port")} port is running ..`);
})
