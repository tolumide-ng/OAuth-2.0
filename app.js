const express = require("express");
const authRoutes = require("./routes/auth-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");

const app = express();

// set up view engine
app.set("view engine", "ejs");

app.use(
  cookieSession({
    // value in milliseconds
    maxAge: 24 * 60 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

// connect to mongodb
mongoose.connect(keys.google.mongodb.dbURI, { useNewUrlParser: true }, () => {
  process.stdout.write("\nconnected to mongodb");
});

// intialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up route
app.use("/auth", authRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => process.stdout.write("app now listening on port 3000"));
