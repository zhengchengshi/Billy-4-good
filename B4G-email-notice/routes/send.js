const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const {
  userEmail,
  code,
  emailName,
  emailTarget,
  emailType,
  emailText,
  emailSubject,
} = require("../info.js");

let transporter = nodemailer.createTransport({
  service: emailType,
  port: 465, // node_modules/nodemailer/lib/well-known/services.json  查看相关的配置，如果使用qq邮箱，就查看qq邮箱的相关配置
  secure: true, // true for 465, false for other ports
  auth: {
    user: userEmail,
    pass: code,
  },
});

router.post("/", async function (req, res, next) {
  const target = req.body.to;
  sendMail(target);

  function sendMail(mail) {
    // 发送的配置项
    let mailOptions = {
      from: `${emailName} <${userEmail}>`, // 发送方
      to: emailTarget, //接收者邮箱，多个邮箱用逗号间隔
      subject: emailSubject, // 标题
      text: emailText,
      // html: `<>welcome to use B4G-email-notice !</>`, //页面内容
      // attachments: [{//发送文件
      // 		filename: 'index.html', //文件名字
      // 		path: './index.html' //文件路径
      // 	},
      // 	{
      // 		filename: 'sendEmail.js', //文件名字
      // 		content: 'sendEmail.js' //文件路径
      // 	}
      // ]
    };
    //发送函数
    transporter.sendMail(mailOptions, (error, info) => {
      // console.log(info);
      if (error) {
        res.send(error);
      } else {
        res.send("success");
      }
    });
  }
  // sendMail("2650744390@qq.com", 200, res.send);
  //   res.send("respond with a resource");
});

module.exports = router;
