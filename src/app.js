const express = require("express")
const app = express()
const cors = require("cors")
const transport = require("./helper/smtpServer");
const dotenv = require("dotenv")
const {checkEmailIsValid} = require("./middlewares/datavalidator")
const sanitizer = require("perfect-express-sanitizer");

dotenv.config()

const corsOption = {
    
    origin: "http://localhost:3001",
    optionsSuccessStatus: 200,
};

//global middleware config for cors
app.use(cors(corsOption));


//global middleware configuration for json data
app.use(express.json())

app.get("/", (req, res) => {
res.json({message: "Hello World!"});
});

app.post("/send-email", checkEmailIsValid, async(req, res) => {
    const {email} = req.body;

    const mailOption = {
        to: email,
        from: process.env.USER_EMAIL,
        subject: "Testing Email Service",
        html: `<h1>Sorry for bothering you,  we are actually testing or email server </h1>`
    }

    transport.sendMail(mailOption, (error) => {
        if (error) {
            return console.log(error);
        }else{
            res.json({message: "Email sent successfully"})
        }
    });

});

module.exports = app;