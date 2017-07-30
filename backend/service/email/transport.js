const config=require("../../config").getConfig();
const nodemailer = require('nodemailer');



const transport = nodemailer.createTransport({
    host: "smtp.163.com",
    secureConnection: config.email.secureConnection,
    port: config.email.port,
    auth: {
        user: config.email.username,
        pass: config.email.password,
    }
});



module.exports=transport;