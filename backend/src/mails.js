const nodemailer = require("nodemailer");
var fs = require('fs');

module.exports = {
    
    nuevoPedido: async function(mail) {        
         // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.MAIL, // generated ethereal user
            pass: process.env.PASSMAIL, // generated ethereal password
          },
        });

        let _text = "<h2>Tiene un nuevo pedido<h2>"
                    + "<span>Usted tiene un nuevo pedido en su local</span>"
        // send mail with defined transport object
        var htmlStream = fs.createReadStream("/home/federico/Escritorio/Desarrollo/Trabajo Final UNQUI/backend/src/Nuevo pedido.html");
        let info = await transporter.sendMail({
          from: '"Anydirec" <foo@example.com>', // sender address
          to: mail, // list of receivers
          subject: "Nuevo pedido",
          text: _text,
          html: htmlStream
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      },

      pedidoListo: async function(mail) {        
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
       
       let _text = "Su pedido está listo";
       // send mail with defined transport object
       var htmlStream = fs.createReadStream("/home/federico/Escritorio/Desarrollo/Trabajo Final UNQUI/backend/src/Pedido listo.html");
       let info = await transporter.sendMail({
        from: '"Anydirec" <foo@example.com>', // sender address
        to: mail, // list of receivers
        subject: "Su pedido está listo",
        text: _text,
        html: htmlStream
       });

       console.log("Message sent: %s", info.messageId);
       // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
     
       // Preview only available when sending through an Ethereal account
       console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
       // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
     }
      

};