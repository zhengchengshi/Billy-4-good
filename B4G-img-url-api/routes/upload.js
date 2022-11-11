var express = require("express");
var router = express.Router();
const crypto = require("crypto");
const path = require("path");

/* GET users listing. */
router.post("/", async function (req, res, next) {
  // const filePath = req.body.filePath || "";
  const filePath = req.headers.filepath || "";

  try {
    // 如果没有文件被上传，则返回以下 JSON 数据
    if (!req.files) {
      res.send({
        status: "No file uploaded",
        link: "undefined",
      });
    } else {
      let data = req.files.file; // 声明字段名为 data 的图片数据为 data 变量
      if (!Array.isArray(data)) data = [data];
      data.forEach((item) => {
        let md5 = crypto.createHash("md5").update(item.name).digest("hex"); // 取 data 文件名的 MD5 值
        console.log(md5);
        item.md5 = md5;
        item.mv(`.${filePath}/` + md5 + path.extname(item.name)); // 存储(移动)图片到 uploads 文件夹，文件名为 data 文件名 MD5 + 文件拓展名
      });
      // console.log(data);
      // 发送以下 JSON 数据
      res.send({
        status: "ok",
        link: data.map(
          (item) =>
            `localhost:3000${filePath}/${item.md5}${path.extname(item.name)}` // 部署时仅需将localhost:3000 替换为自己的服务器即可，filePath为对应的服务器路径，如不需要此功能忽略即可
        ),
      });
    }
  } catch (err) {
    // 如果上传出现错误，则返回 HTTP 500.
    res.sendStatus(500).send(err);
  }
  // res.send("respond with a resource");
});

module.exports = router;
