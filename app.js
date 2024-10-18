const express = require("express");
const bodyparser = require("body-parser");
const session = require("express-session");
const authRoutes = require("./routes/ auth");
const path = require("path");

const app = express();

// set EJS sebagai template engine
app.set("view engine", "ejs");

// middleware
app.use(bodyparse.json());
app.use(bodyparse.urlencoded({ extended }));
app.use(
  session({
    secret: "secrer",
    resave: false,
    saveuninitialized: true,
  })
);

//set static folder
app.use(express.static(path.join(__dirname, "public")));
//middleware to check login status
app.use((req, res, next) => {
  if (
    !req.session.user &&
    req.path !== "/auth/login" &&
    req.path !== "/auth/register"
  ) {
    //if the user is not logged in and trying to access any other page except login/register
    return res.redirect("/auth/login");
  } else if (req.session.user && req.path === "/") {
    // if user is logged in and tries to access the root router, redirect to profile
    return res.redirect("/auth/profile");
  }
  next();
});

//routes
app.use("/auth", authRoutes);
// root router: redirect to /auth/login or/auth/profile based on session
app.get("/", (req, res) => {
  if (req.session.user) {
    return res.redirect("/auth/profile");
  } else {
    return res.redirect("/auth/login");
  }
});
// menjalankan server
app.listen(3000, () => {
  console.log("server running on port 3000");
});
