const nodemailer = require("nodemailer");
var fs = require('fs');

module.exports = {
    
    nuevoPedido: async function(mail) {        
         // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.weblocales.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: process.env.MAIL, // generated ethereal user
            pass: process.env.PASSMAIL, // generated ethereal password
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        let _text = "<h2>Tiene un nuevo pedido<h2>"
                    + "<span>Usted tiene un nuevo pedido en su local</span>"
        // send mail with defined transport object
        var messageHtml = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><div><div style="width:100%;background-color:#00BFA6;padding:2%" align="center"><span style="color:black;font-size:2rem">Tiene un nuevo pedido</span></div><div style="width:100%;padding-top:6%;padding-bottom:6%" align="center"><span style="font-size:1rem">Por favor revise sus pedidos en nuestra página web <a href="http://localhost:3000/">Anydirec</a></span></div><div style="width:100%;background-color:#00BFA6;padding:4%" align="center"><span style="color:black;font-size:1rem">Copyright© 2020 Anydirec</span></div></div>'
        let info = await transporter.sendMail({
          from: '"WebLocales" <notificaciones@weblocales.com>', // sender address
          to: mail, // list of receivers
          subject: "Nuevo pedido",
          text: _text,
          html: messageHtml
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      },

      pedidoListo: async function(mail, menssageHtml) {        
        // create reusable transporter object using the default SMTP transport
       let transporter = nodemailer.createTransport({
          host: "smtp.weblocales.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: process.env.MAIL, // generated ethereal user
            pass: process.env.PASSMAIL, // generated ethereal password
          },
          tls: {
            rejectUnauthorized: false
          }
       });
       
       let _text = "Su pedido está listo";
       // send mail with defined transport object
       let info = await transporter.sendMail({
        from: '"WebLocales" <notificaciones@weblocales.com>', // sender address
        to: mail, // list of receivers
        subject: "Su pedido está listo",
        text: _text,
        html: menssageHtml
       });

       console.log("Message sent: %s", info.messageId);
       // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
     
       // Preview only available when sending through an Ethereal account
       console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
       // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
     }
      

};