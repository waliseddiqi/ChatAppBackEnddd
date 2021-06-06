const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
sendEmail=async (email)=>{
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();
  console.log("Email sender here brooo");
  // create reusable transporter object using the default SMTP transport
  const randomnumber=Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
  const htmltag="<b>"+" Your confirmation code is:"+randomnumber+"</b>";

  var mail = nodemailer.createTransport({

    service: 'Gmail',
    auth: {
      user: 'JohnNode3@gmail.com',
      pass: "12345JohnNode"
    }
  });

  // send mail with defined transport object
  let info = await mail.sendMail({
    from: 'JohnNode3@gmail.com', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Merhaba", // plain text body
    html: htmltag, // html body
  }
  )

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  console.log(info)
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  return {"respond":info,"code":randomnumber};
}

//main().catch(console.error);

module.exports=sendEmail;