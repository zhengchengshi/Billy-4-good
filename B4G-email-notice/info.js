/**
 * 用户信息
 */
const userEmail = "" || "xxx@qq.com"; // （必填）发送方的邮箱 (自己的邮箱)
const code = "xxx" || ""; // smtp 的授权码 ，qq邮箱授权码获取途径：邮箱---设置--账户--POP3/SMTP服务---开启---获取stmp授权码
/**
 * 邮件内容
 */
const emailName = "" || "empty"; // 发送方的名称
const emailTarget = "" || "xxx@qq.com"; // 对方邮箱
const emailType = "" || "qq" || "gmail" || "others"; // （必填）类型xx邮箱 如qq
const emailText = "" || "Enjoy what you are doing !"; // 邮件文本内容
const emailSubject = "" || "૮ ・ﻌ・ა"; // 邮件主题

module.exports = {
  userEmail,
  code,
  emailName,
  emailTarget,
  emailType,
  emailText,
  emailSubject,
};
