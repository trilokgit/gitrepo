const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
require("./db/conn");
const Register = require("./models/userreg");
const bcrypt = require("bcryptjs");
const hbs = require("hbs");
const Registr = require("./models/userreg");


const templatespath = path.join(__dirname, "../templets/views");
const partialpath = path.join(__dirname, "../templets/partials");

app.set("view engine", "hbs");
app.set("views", templatespath);
hbs.registerPartials(partialpath);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/",  (req, res) => {
    res.render("index");
});
app.get("/login",  (req, res) => {
    res.render("login");
});
app.get("/reg",  (req, res) => {
    res.render("register");
});
app.post("/reg",  async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        if (password === cpassword) {
            
            const registeremployee = new Registr({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender,
                phone: req.body.phonenumber,
                age: req.body.age,
                password: req.body.password,
                cpassword: req.body.cpassword
            });

            const registered = await registeremployee.save();
            res.status(201).render("index");

        } else {
            res.send("Password is not matching...");
        }

    } catch (e) {
        res.status(400).send(e);
   }
});

app.post("/login", async (req, res) => {
   
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Registr.findOne({ email: email });
          
        const isMatch = await bcrypt.compare(password, useremail.password);

        if (isMatch) {
           
            res.status(201).render("index");
        } else {
            res.send("password is not matching");
        }
        
    } catch (e) {
        res.status(400).send("invalid email or password");
    }

});



app.listen(port, () => {
    console.log(`server is running on PORT ${port}....`);
});
