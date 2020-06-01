const nodemailer = require("nodemailer");

module.exports = {
    
    main: async function(mail, destinatario) {
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
        
        let _subject;
        let _text;
        let _html;
        if(destinatario == "local"){
            _subject = "Nuevo pedido";
            _text = "Tiene un nuevo pedido en su local";
            _html = "<b>" + _text + "</b>";
        }
        if(destinatario == "comprador"){
            _subject = "Su pedido está listo";
            _text = "Su pedido está listo";
            _html = "<b>" + _text + "</b>";
        }

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Anydirec" <foo@example.com>', // sender address
          to: mail, // list of receivers
          subject: _subject, // Subject line
          text: _text , // plain text body
          html: _html, // html body
        });

        
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      }
      

};