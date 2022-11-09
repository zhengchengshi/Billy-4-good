// 定时发送邮件
const schedule = require("node-schedule");
const request = require("request");

const url = "" || "http://localhost:8082/send"; // 可替换上线url

schedule.scheduleJob("30 1 1 1 2023 *", () => {
  /**
                      * * * * * *    *
                      ┬ ┬ ┬ ┬ ┬ ┬
                      │ │ │ │ │ │
                      │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
                      │ │ │ │ └───── month (1 - 12)
                      │ │ │ └────────── day of month (1 - 31)
                      │ │ └─────────────── hour (0 - 23)
                      │ └──────────────────── minute (0 - 59)
                      └───────────────────────── second (0 - 59, OPTIONAL)
   */
  // eg:2023年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'

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
