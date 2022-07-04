const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("./lib/passport");
const guestWebRouter = require("./routes/web/guest.router");
const userWebRouter = require("./routes/web/user.router");
const guestApiRouter = require("./routes/api/guest.router");
const userApiRouter = require("./routes/api/user.router");
const adminApiRouter = require("./routes/api/admin.router");

const dotenv = require("dotenv");
dotenv.config();

const userMiddleware = require("./middlewares/web/user.middleware");
const userMiddlewareApi = require("./middlewares/api/user.middleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.use("/", guestWebRouter);
app.use("/web", userMiddleware.authenticatedOnly, userMiddleware.authorizedOnly("PlayerUser"), userWebRouter);

app.use("/api/v1", guestApiRouter);
app.use("/api/v1/auth", userMiddlewareApi.jwtAuthentication, userMiddlewareApi.authenticatedOnly, userMiddlewareApi.authorizedOnly("PlayerUser"), userApiRouter);

app.use("/api/v1/admin", userMiddlewareApi.jwtAuthentication, userMiddlewareApi.authenticatedOnly, userMiddlewareApi.authorizedOnly("SuperAdmin"), adminApiRouter);

app.listen(3000, () => {
  console.log("App is running.");
});
