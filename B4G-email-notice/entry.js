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
/**
 * 重复周期
 */
const cycleTime = "30 1 1 1 2023 *"; // eg: 2023年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'
/**
                   *  * * *  *   *    *
                   ┬  ┬ ┬ ┬  ┬   ┬
                   │  │ │ │  │   │
                   │  │ │ │  │   └ day of week (0 - 7) (0 or 7 is Sun)
                   │  │ │ │  └───── month (1 - 12)
                   │  │ │ └────────── day of month (1 - 31)
                   │  │ └─────────────── hour (0 - 23)
                   │  └──────────────────── minute (0 - 59)
                   └───────────────────────── second (0 - 59, OPTIONAL)
   */
/**
 * 服务器ip或域名，部署时使用
 */
const host = "" || "http://localhost:8082";
module.exports = {
  userEmail,
  code,
  emailName,
  emailTarget,
  emailType,
  emailText,
  emailSubject,
  cycleTime,
  host,
};
