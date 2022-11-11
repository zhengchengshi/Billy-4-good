// 定时发送邮件
const schedule = require("node-schedule");
const request = require("request");
const { cycleTime, host } = require("./entry");
const url = host + "/send"; // 可替换上线url
schedule.scheduleJob(cycleTime, () => {
  request.post(
    { url, form: { to: "xxx@qq.com" } }, // 发送至xxx@qq.com
    (error, response, body) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(response);
    }
  );
});
