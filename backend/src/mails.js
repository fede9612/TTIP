const nodemailer = require("nodemailer");

module.exports = {
    
    main: async function() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();
      
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: "federicoferreyra2@gmail.com", // generated ethereal user
            pass: "fedekpo??9612", // generated ethereal password
          },
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Anydirec" <foo@example.com>', // sender address
          to: "federicoferreyra2@gmail.com", // list of receivers
          subject: "Correo de prueba", // Subject line
          text: "Hola este es un correo para probar los servicios SMTP", // plain text body
          html: "<b>Hola este es un correo para probar los servicios SMTP</b>", // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      }
      

};